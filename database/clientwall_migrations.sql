-- =============================================================================
-- ClientWall — Migrations Flyway complètes
-- Ordre topologique strict : chaque objet référencé existe avant d'être utilisé
-- =============================================================================

-- -----------------------------------------------------------------------------
-- V1__create_schemas.sql
-- -----------------------------------------------------------------------------

CREATE SCHEMA IF NOT EXISTS core;
CREATE SCHEMA IF NOT EXISTS iam;
CREATE SCHEMA IF NOT EXISTS documents;
CREATE SCHEMA IF NOT EXISTS billing;
CREATE SCHEMA IF NOT EXISTS messaging;
CREATE SCHEMA IF NOT EXISTS audit;


-- -----------------------------------------------------------------------------
-- V2__create_enums.sql
-- -----------------------------------------------------------------------------

-- IAM
CREATE TYPE iam.permission_value AS ENUM (
    'allow',
    'deny',
    'block'
);

CREATE TYPE iam.permission_action AS ENUM (
    'read',
    'write',
    'add',
    'edit',
    'delete',
    'message_read',
    'message_write',
    'pay'
);

CREATE TYPE iam.permission_resource AS ENUM (
    'document',
    'message',
    'invoice',
    'timesheet',
    'progress_report',
    'contract',
    'other'
);

-- Billing
CREATE TYPE billing.invoice_status AS ENUM (
    'draft',
    'issued',
    'paid',
    'overdue',
    'partially_paid',
    'refund'
);

-- Documents
CREATE TYPE documents.document_category AS ENUM (
    'uploaded_by_org',
    'generated_by_system',
    'managed_by_tool',
    'uploaded_by_client'
);

CREATE TYPE documents.document_type AS ENUM (
    'invoice',
    'progress_report',
    'timesheet',
    'contract',
    'file',
    'other'
);


-- -----------------------------------------------------------------------------
-- V3__create_domains.sql
-- -----------------------------------------------------------------------------

-- Pourcentage de progression (0–100)
CREATE DOMAIN core.progress_pct AS smallint
    CHECK (VALUE BETWEEN 0 AND 100);

-- Montant financier (jamais négatif)
CREATE DOMAIN billing.amount AS numeric(12, 2)
    CHECK (VALUE >= 0);

-- Taux de TVA (0–100)
CREATE DOMAIN billing.vat_rate AS numeric(5, 2)
    CHECK (VALUE BETWEEN 0 AND 100);


-- -----------------------------------------------------------------------------
-- V4__core_workspace_user.sql
-- Dépendances : aucune (tables racines)
-- -----------------------------------------------------------------------------

CREATE TABLE core.app_user (
    id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    email         text        NOT NULL UNIQUE,
    display_name  text        NOT NULL,
    password_hash text        NOT NULL,
    created_at    timestamptz NOT NULL DEFAULT now()
);

-- owner_id référencé après création de app_user
CREATE TABLE core.workspace (
    id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    name         text        NOT NULL,
    slug         text        NOT NULL UNIQUE,
    owner_id     uuid        NOT NULL REFERENCES core.app_user (id),
    -- Adresse à plat
    street       text,
    city         text,
    postal_code  text,
    country      text,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now()
);


-- -----------------------------------------------------------------------------
-- V5__core_membership.sql
-- Dépendances : core.workspace, core.app_user
-- -----------------------------------------------------------------------------

-- Membres du workspace (rôles organisationnels)
CREATE TABLE core.workspace_member (
    workspace_id uuid        NOT NULL REFERENCES core.workspace (id) ON DELETE CASCADE,
    user_id      uuid        NOT NULL REFERENCES core.app_user (id)  ON DELETE CASCADE,
    member_role  text        NOT NULL CHECK (member_role IN ('owner', 'manager', 'member')),
    joined_at    timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (workspace_id, user_id)
);

-- Garantit l'unicité du propriétaire par workspace
CREATE UNIQUE INDEX uq_workspace_owner
    ON core.workspace_member (workspace_id)
    WHERE member_role = 'owner';


-- -----------------------------------------------------------------------------
-- V6__core_project_zone.sql
-- Dépendances : core.workspace, core.app_user
-- -----------------------------------------------------------------------------

CREATE TABLE core.project (
    id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id uuid        NOT NULL REFERENCES core.workspace (id) ON DELETE CASCADE,
    name         text        NOT NULL,
    description  text,
    created_at   timestamptz NOT NULL DEFAULT now(),
    updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE core.zone (
    id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid        NOT NULL REFERENCES core.project (id) ON DELETE CASCADE,
    name       text        NOT NULL,
    zone_type  text        NOT NULL CHECK (zone_type IN ('client', 'collaborator')),
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Appartenance d'un utilisateur à une zone
CREATE TABLE core.zone_member (
    zone_id   uuid        NOT NULL REFERENCES core.zone (id)     ON DELETE CASCADE,
    user_id   uuid        NOT NULL REFERENCES core.app_user (id) ON DELETE CASCADE,
    joined_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (zone_id, user_id)
);


-- -----------------------------------------------------------------------------
-- V7__iam_roles_permissions.sql
-- Dépendances : core.project, core.zone, core.app_user
-- -----------------------------------------------------------------------------

CREATE TABLE iam.role (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id  uuid        NOT NULL REFERENCES core.project (id) ON DELETE CASCADE,
    name        text        NOT NULL,
    description text,
    created_at  timestamptz NOT NULL DEFAULT now()
);

-- Permissions définies sur un rôle
CREATE TABLE iam.role_permission (
    id       uuid                     PRIMARY KEY DEFAULT gen_random_uuid(),
    role_id  uuid                     NOT NULL REFERENCES iam.role (id) ON DELETE CASCADE,
    action   iam.permission_action    NOT NULL,
    resource iam.permission_resource  NOT NULL,
    value    iam.permission_value     NOT NULL,
    UNIQUE (role_id, action, resource)
);

-- Rôle hérité par tous les membres d'une zone
CREATE TABLE iam.zone_role (
    zone_id uuid NOT NULL REFERENCES core.zone (id) ON DELETE CASCADE,
    role_id uuid NOT NULL REFERENCES iam.role (id)  ON DELETE CASCADE,
    PRIMARY KEY (zone_id, role_id)
);

-- Rôle attribué directement à un utilisateur sur un projet
CREATE TABLE iam.user_role (
    user_id    uuid NOT NULL REFERENCES core.app_user (id) ON DELETE CASCADE,
    role_id    uuid NOT NULL REFERENCES iam.role (id)      ON DELETE CASCADE,
    project_id uuid NOT NULL REFERENCES core.project (id)  ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id, project_id)
);


-- -----------------------------------------------------------------------------
-- V8__documents_core.sql
-- Dépendances : core.project, core.app_user, core.zone
-- -----------------------------------------------------------------------------

CREATE TABLE documents.document (
    id          uuid                        PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id  uuid                        NOT NULL REFERENCES core.project (id) ON DELETE CASCADE,
    category    documents.document_category NOT NULL,
    doc_type    documents.document_type     NOT NULL,
    title       text                        NOT NULL,
    storage_key text,                        -- clé S3 pour les fichiers binaires
    uploaded_by uuid                        REFERENCES core.app_user (id),
    created_at  timestamptz                 NOT NULL DEFAULT now(),
    updated_at  timestamptz                 NOT NULL DEFAULT now()
);

-- Exposition d'un document dans une zone (référence unique, sans duplication)
CREATE TABLE documents.document_zone_visibility (
    document_id uuid NOT NULL REFERENCES documents.document (id) ON DELETE CASCADE,
    zone_id     uuid NOT NULL REFERENCES core.zone (id)          ON DELETE CASCADE,
    PRIMARY KEY (document_id, zone_id)
);

-- Versioning : états d'avancement publiés, feuilles de temps validées
CREATE TABLE documents.document_version (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id uuid        NOT NULL REFERENCES documents.document (id) ON DELETE CASCADE,
    version_num integer     NOT NULL CHECK (version_num > 0),
    snapshot    jsonb       NOT NULL,
    created_by  uuid        REFERENCES core.app_user (id),
    created_at  timestamptz NOT NULL DEFAULT now(),
    UNIQUE (document_id, version_num)
);


-- -----------------------------------------------------------------------------
-- V9__documents_timesheet.sql
-- Dépendances : documents.document, core.app_user
-- -----------------------------------------------------------------------------

CREATE TABLE documents.timesheet (
    document_id  uuid              PRIMARY KEY REFERENCES documents.document (id) ON DELETE CASCADE,
    user_id      uuid              NOT NULL REFERENCES core.app_user (id),
    period_start date              NOT NULL,
    period_end   date              NOT NULL,
    hourly_rate  billing.amount,              -- confidentiel, jamais exposé zone client
    status       text              NOT NULL DEFAULT 'in_progress'
                                   CHECK (status IN ('in_progress', 'submitted', 'validated')),
    submitted_at timestamptz,
    validated_at timestamptz,
    validated_by uuid              REFERENCES core.app_user (id),
    CONSTRAINT chk_period CHECK (period_end >= period_start)
);

CREATE TABLE documents.timesheet_line (
    id          uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id uuid           NOT NULL REFERENCES documents.timesheet (document_id) ON DELETE CASCADE,
    worked_date date           NOT NULL,
    task        text           NOT NULL,
    duration_h  numeric(5, 2) NOT NULL CHECK (duration_h > 0),
    comment     text
);


-- -----------------------------------------------------------------------------
-- V10__documents_progress_report.sql
-- Dépendances : documents.document
-- -----------------------------------------------------------------------------

CREATE TABLE documents.progress_report (
    document_id   uuid               PRIMARY KEY REFERENCES documents.document (id) ON DELETE CASCADE,
    period_label  text               NOT NULL,
    published_at  timestamptz,
    global_pct    core.progress_pct  NOT NULL DEFAULT 0,
    narrative     text,
    next_steps    text,
    status        text               NOT NULL DEFAULT 'draft'
                                     CHECK (status IN ('draft', 'published', 'archived'))
);

CREATE TABLE documents.progress_report_milestone (
    id          uuid     PRIMARY KEY DEFAULT gen_random_uuid(),
    document_id uuid     NOT NULL REFERENCES documents.progress_report (document_id) ON DELETE CASCADE,
    label       text     NOT NULL,
    status      text     NOT NULL CHECK (status IN ('todo', 'in_progress', 'done')),
    position    smallint NOT NULL DEFAULT 0
);


-- -----------------------------------------------------------------------------
-- V11__documents_contract.sql
-- Dépendances : documents.document, core.app_user
-- -----------------------------------------------------------------------------

CREATE TABLE documents.contract (
    document_id   uuid PRIMARY KEY REFERENCES documents.document (id) ON DELETE CASCADE,
    signed_by     uuid REFERENCES core.app_user (id),
    signed_at     timestamptz,
    signature_ref text,                 -- référence outil de signature externe
    status        text NOT NULL DEFAULT 'pending'
                       CHECK (status IN ('pending', 'signed', 'rejected'))
);


-- -----------------------------------------------------------------------------
-- V12__billing_invoice.sql
-- Dépendances : core.project
-- -----------------------------------------------------------------------------

CREATE TABLE billing.invoice (
    id             uuid                   PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id     uuid                   NOT NULL REFERENCES core.project (id),
    invoice_number text                   NOT NULL UNIQUE,
    issued_at      timestamptz,
    due_date       date                   NOT NULL,

    -- Émetteur (organisation) — colonnes à plat
    issuer_name         text NOT NULL,
    issuer_siret        text,
    issuer_vat_number   text,
    issuer_street       text,
    issuer_city         text,
    issuer_postal_code  text,
    issuer_country      text,

    -- Destinataire (client facturé) — colonnes à plat
    recipient_name         text NOT NULL,
    recipient_siret        text,
    recipient_street       text,
    recipient_city         text,
    recipient_postal_code  text,
    recipient_country      text,

    vat_rate        billing.vat_rate    NOT NULL,
    status          billing.invoice_status NOT NULL DEFAULT 'draft',
    stripe_link     text,
    stripe_event_id text,
    created_at      timestamptz         NOT NULL DEFAULT now(),
    updated_at      timestamptz         NOT NULL DEFAULT now()
);

-- Lignes de facturation avec colonnes générées
CREATE TABLE billing.invoice_line (
    id       uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id uuid         NOT NULL REFERENCES billing.invoice (id) ON DELETE CASCADE,
    label    text           NOT NULL,
    quantity numeric(10, 3) NOT NULL CHECK (quantity > 0),
    unit_price billing.amount NOT NULL,
    taxes    billing.amount NOT NULL DEFAULT 0,

    -- Colonnes calculées (STORED = matérialisées sur disque)
    total_ht         numeric(12, 2) GENERATED ALWAYS AS
                         (ROUND(quantity * unit_price, 2)) STORED,
    total_with_taxes numeric(12, 2) GENERATED ALWAYS AS
                         (ROUND(quantity * unit_price + taxes, 2)) STORED,

    position smallint NOT NULL DEFAULT 0  -- ordre d'affichage
);


-- -----------------------------------------------------------------------------
-- V13__messaging.sql
-- Dépendances : core.zone, core.app_user, core.project
-- -----------------------------------------------------------------------------

-- Thread rattaché à une zone
CREATE TABLE messaging.thread (
    id         uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    zone_id    uuid        NOT NULL REFERENCES core.zone (id) ON DELETE CASCADE,
    title      text,
    created_by uuid        NOT NULL REFERENCES core.app_user (id),
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Messages dans un thread de zone
CREATE TABLE messaging.message (
    id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    thread_id         uuid        NOT NULL REFERENCES messaging.thread (id) ON DELETE CASCADE,
    sender_id         uuid        NOT NULL REFERENCES core.app_user (id),
    content           text        NOT NULL,
    sent_at           timestamptz NOT NULL DEFAULT now(),
    deleted_by_sender boolean     NOT NULL DEFAULT false
);

-- Messagerie personnelle : une conversation entre deux utilisateurs fixes
-- Ordre canonique enforced : user_1_id < user_2_id (comparaison UUID)
CREATE TABLE messaging.direct_conversation (
    id        uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    user_1_id uuid        NOT NULL REFERENCES core.app_user (id),
    user_2_id uuid        NOT NULL REFERENCES core.app_user (id),
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT uq_conversation     UNIQUE (user_1_id, user_2_id),
    CONSTRAINT chk_distinct_users  CHECK  (user_1_id <> user_2_id),
    CONSTRAINT chk_canonical_order CHECK  (user_1_id < user_2_id)
);

-- Messages dans une conversation directe
-- sender_ref : 1 = user_1 a envoyé, 2 = user_2 a envoyé
CREATE TABLE messaging.direct_message (
    id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id uuid        NOT NULL REFERENCES messaging.direct_conversation (id) ON DELETE CASCADE,
    sender_ref      smallint    NOT NULL CHECK (sender_ref IN (1, 2)),
    content         text        NOT NULL,
    sent_at         timestamptz NOT NULL DEFAULT now(),
    deleted_by_1    boolean     NOT NULL DEFAULT false,
    deleted_by_2    boolean     NOT NULL DEFAULT false
);

-- Autorisation explicite client ↔ collaborateur (messaging cross-zone)
CREATE TABLE messaging.cross_zone_authorization (
    project_id     uuid        NOT NULL REFERENCES core.project (id) ON DELETE CASCADE,
    client_user_id uuid        NOT NULL REFERENCES core.app_user (id),
    collab_user_id uuid        NOT NULL REFERENCES core.app_user (id),
    granted_by     uuid        NOT NULL REFERENCES core.app_user (id),
    granted_at     timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (project_id, client_user_id, collab_user_id)
);


-- -----------------------------------------------------------------------------
-- V14__audit.sql
-- Dépendances : core.project, core.app_user
-- -----------------------------------------------------------------------------

CREATE TABLE audit.event (
    id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id  uuid        REFERENCES core.project (id),
    actor_id    uuid        REFERENCES core.app_user (id),
    event_type  text        NOT NULL,   -- ex: 'invoice.issued', 'document.published'
    payload     jsonb       NOT NULL DEFAULT '{}',
    occurred_at timestamptz NOT NULL DEFAULT now()
);


-- -----------------------------------------------------------------------------
-- V15__indexes.sql
-- Index sur les colonnes fréquemment filtrées / jointes
-- -----------------------------------------------------------------------------

-- core
CREATE INDEX idx_workspace_owner       ON core.workspace        (owner_id);
CREATE INDEX idx_project_workspace     ON core.project          (workspace_id);
CREATE INDEX idx_zone_project          ON core.zone             (project_id);
CREATE INDEX idx_zone_member_user      ON core.zone_member      (user_id);
CREATE INDEX idx_workspace_member_user ON core.workspace_member (user_id);

-- iam
CREATE INDEX idx_role_project          ON iam.role              (project_id);
CREATE INDEX idx_role_permission_role  ON iam.role_permission   (role_id);
CREATE INDEX idx_user_role_user        ON iam.user_role         (user_id);
CREATE INDEX idx_user_role_project     ON iam.user_role         (project_id);

-- documents
CREATE INDEX idx_document_project      ON documents.document              (project_id);
CREATE INDEX idx_document_type         ON documents.document              (doc_type);
CREATE INDEX idx_doc_zone_zone         ON documents.document_zone_visibility (zone_id);
CREATE INDEX idx_timesheet_user        ON documents.timesheet             (user_id);
CREATE INDEX idx_timesheet_line_doc    ON documents.timesheet_line        (document_id);
CREATE INDEX idx_milestone_doc         ON documents.progress_report_milestone (document_id);

-- billing
CREATE INDEX idx_invoice_project       ON billing.invoice      (project_id);
CREATE INDEX idx_invoice_status        ON billing.invoice      (status);
CREATE INDEX idx_invoice_line_invoice  ON billing.invoice_line (invoice_id);

-- messaging
CREATE INDEX idx_thread_zone           ON messaging.thread              (zone_id);
CREATE INDEX idx_message_thread        ON messaging.message             (thread_id);
CREATE INDEX idx_message_sender        ON messaging.message             (sender_id);
CREATE INDEX idx_dm_conversation       ON messaging.direct_message      (conversation_id);
CREATE INDEX idx_conv_user1            ON messaging.direct_conversation (user_1_id);
CREATE INDEX idx_conv_user2            ON messaging.direct_conversation (user_2_id);

-- audit
CREATE INDEX idx_audit_project         ON audit.event (project_id);
CREATE INDEX idx_audit_actor           ON audit.event (actor_id);
CREATE INDEX idx_audit_type            ON audit.event (event_type);
CREATE INDEX idx_audit_occurred        ON audit.event (occurred_at DESC);
