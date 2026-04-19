# Composant — FileUploader

**Catégorie** : Composite  
**Fichier cible** : `src/components/composite/FileUploader.tsx`

---

## Description

Zone de dépôt et sélection de fichiers. Supporte le drag & drop et la sélection via explorateur de fichiers. Affiche les fichiers sélectionnés avec leur statut d'upload.

---

## Props

| Prop | Type | Défaut | Description |
|---|---|---|---|
| `accept` | `string` | `'*'` | Types MIME acceptés (ex: `'.pdf,.docx'`) |
| `maxSize` | `number` | Selon plan | Taille max en octets |
| `multiple` | `boolean` | `false` | Upload multiple |
| `onUpload` | `(files: File[]) => Promise<void>` | — | Handler upload |
| `label` | `string` | — | Label de la zone |
| `hint` | `string` | — | Texte d'aide (formats, taille max) |
| `disabled` | `boolean` | `false` | Zone désactivée |

---

## Limites par plan

| Plan | Taille max fichier |
|---|---|
| Free | 10 MB |
| Medium | 50 MB |
| Extra | 100 MB |
| Enterprise | À définir |

---

## Structure visuelle

### Zone de dépôt (état idle)

```
┌────────────────────────────────────────┐
│                                        │
│  [Icône Upload]                        │
│                                        │
│  Glissez un fichier ici                │
│  ou                                    │
│  [Parcourir les fichiers]              │
│                                        │
│  PDF, DOCX, XLSX, PNG — max 10 MB      │
└────────────────────────────────────────┘
```

### Zone de dépôt (dragover)

- Bordure : 2px dashed `--color-primary-500`
- Fond : `--color-primary-50`
- Ombre inner
- Texte : "Déposer ici"

### Liste des fichiers sélectionnés

```
┌────────────────────────────────────────┐
│ 📄 devis-2024.pdf           2.3 MB    │
│    ████████████████░░░░  Envoi...  ✕  │
├────────────────────────────────────────┤
│ 📊 planning.xlsx            450 KB    │
│    ✓ Envoyé                        ✕  │
├────────────────────────────────────────┤
│ 📄 rapport.pdf              15 MB     │
│    ✗ Fichier trop volumineux       ✕  │
└────────────────────────────────────────┘
```

---

## Statuts d'un fichier dans la liste

| Statut | Icône | Couleur | Description |
|---|---|---|---|
| `pending` | Horloge | `--color-neutral-500` | En attente d'envoi |
| `uploading` | ProgressBar | `--color-primary-600` | Upload en cours |
| `success` | CheckCircle | `--color-success-500` | Envoyé avec succès |
| `error` | XCircle | `--color-error-500` | Erreur (taille, format, réseau) |

---

## Messages d'erreur

| Cause | Message |
|---|---|
| Fichier trop volumineux | "Ce fichier dépasse la limite de 10 MB de votre plan." |
| Format non accepté | "Format non supporté. Formats acceptés : PDF, DOCX, XLSX." |
| Erreur réseau | "L'envoi a échoué. Vérifiez votre connexion et réessayez." |

---

## Responsive

- Sur mobile : la zone de dépôt simplifie son texte, le bouton "Parcourir" est le seul CTA visible (le drag & drop n'est pas naturel sur mobile)
- Liste de fichiers : full-width sur mobile

---

## Accessibilité

- `<input type="file">` masqué visuellement mais accessible
- Le bouton "Parcourir" est un `<label for="file-input">` ou un `<button>` qui déclenche le click sur l'input
- Zone dragover : `aria-live="polite"` annonce le dépôt
- Chaque fichier en liste : `role="listitem"` avec état annoncé
- Bouton supprimer : `aria-label="Supprimer devis-2024.pdf"`
