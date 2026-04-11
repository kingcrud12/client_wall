# Composant — PermissionMatrix

**Catégorie** : Composite  
**Fichier cible** : `src/components/composite/PermissionMatrix.tsx`

---

## Description

Grille interactive de configuration des permissions pour un rôle. Permet aux managers de définir quelles actions (read, write, add, edit, delete, message_read, message_write, pay) sont autorisées, refusées ou bloquées pour chaque ressource (document, message, invoice, timesheet, progress_report, contract, other).

---

## Structure visuelle

```
Rôle : [Client Standard] [Renommer]

                  document  message  invoice  timesheet  progress_report  contract  other
  read            [Allow]   [Allow]  [Allow]  [Deny]     [Allow]          [Allow]   [Deny]
  write           [Deny]    [Allow]  [Deny]   [Deny]     [Deny]           [Deny]    [Deny]
  add             [Deny]    [Deny]   [Deny]   [Deny]     [Deny]           [Deny]    [Deny]
  edit            [Deny]    [Deny]   [Deny]   [Deny]     [Deny]           [Deny]    [Deny]
  delete          [Deny]    [Deny]   [Deny]   [Deny]     [Deny]           [Deny]    [Deny]
  message_read    —         [Allow]  —        —          —                —         —
  message_write   —         [Allow]  —        —          —                —         —
  pay             —         —        [Allow]  —          —                —         —
```

---

## Cellule de permission (PermissionCell)

Chaque cellule représente une combinaison action + ressource. Trois états possibles :

| Valeur | Icône | Couleur | Description |
|---|---|---|---|
| `allow` | CheckCircle | `--color-success-500` | Action autorisée |
| `deny` | MinusCircle | `--color-neutral-400` | Action refusée (défaut implicite) |
| `block` | XOctagon | `--color-error-500` | Action absolument bloquée |

Clic sur une cellule : cycle entre `deny → allow → block → deny`.

**Légende de priorité** :
```
block > allow > deny
Block écrase tout, même les allow d'autres rôles.
```

---

## Props

| Prop | Type | Description |
|---|---|---|
| `role` | `Role` | Rôle en cours d'édition |
| `permissions` | `Permission[]` | Permissions actuelles du rôle |
| `readOnly` | `boolean` | Mode lecture seule |
| `onChange` | `(permissions: Permission[]) => void` | Callback de modification |
| `onRoleRename` | `(name: string) => void` | Renommer le rôle |

```typescript
type Permission = {
  action: PermissionAction;
  resource: PermissionResource;
  value: 'allow' | 'deny' | 'block';
}
```

---

## Actions disponibles

`read`, `write`, `add`, `edit`, `delete`, `message_read`, `message_write`, `pay`

## Ressources disponibles

`document`, `message`, `invoice`, `timesheet`, `progress_report`, `contract`, `other`

---

## Cellules non applicables

Certaines combinaisons action/ressource n'ont pas de sens (ex: `pay` sur `document`). Ces cellules affichent un tiret (—) et sont non cliquables.

**Matrice applicabilité** :

| Action | Resources applicables |
|---|---|
| `read` | Toutes |
| `write` | document, message, other |
| `add` | document, other |
| `edit` | document, other |
| `delete` | document, message, other |
| `message_read` | message uniquement |
| `message_write` | message uniquement |
| `pay` | invoice uniquement |

---

## Responsive

- Desktop : grille complète lisible
- Tablet : grille scrollable horizontalement
- Mobile : vue card par ressource (chaque colonne devient une card avec ses actions)

---

## Accessibilité

- Tableau avec `<caption>` : "Matrice des permissions pour le rôle [nom]"
- En-têtes de colonnes et lignes avec `<th scope="col">` et `<th scope="row">`
- Chaque cellule : `<button>` avec `aria-label="Action read sur resource document : allow. Cliquer pour modifier."`
- Mode readOnly : `<span>` statiques avec `aria-label` descriptif
