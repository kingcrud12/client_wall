# Spécification des thèmes — Light & Dark

Client Wall supporte deux thèmes : **clair** (défaut) et **sombre**. Les thèmes sont implémentés via des classes CSS sur l'élément `<html>` (`class="light"` ou `class="dark"`).

---

## Principe de fonctionnement

Les tokens sémantiques (couleurs de surface, texte, bordures) sont redéfinis par chaque thème. Les tokens primitifs (palette complète) restent inchangés.

```html
<!-- Thème clair (défaut) -->
<html class="light">

<!-- Thème sombre -->
<html class="dark">
```

Le thème suit la préférence système par défaut (`prefers-color-scheme`) avec possibilité de toggle manuel.

---

## Mapping des couleurs sémantiques

### Surfaces et fonds

| Token sémantique | Light | Dark |
|---|---|---|
| `--color-bg-page` | `--color-neutral-50` (#F8FAFC) | `--color-neutral-950` (#020617) |
| `--color-bg-surface` | `--color-neutral-0` (#FFFFFF) | `--color-neutral-900` (#0F172A) |
| `--color-bg-subtle` | `--color-neutral-100` (#F1F5F9) | `--color-neutral-800` (#1E293B) |
| `--color-bg-muted` | `--color-neutral-200` (#E2E8F0) | `--color-neutral-700` (#334155) |

### Textes

| Token sémantique | Light | Dark |
|---|---|---|
| `--color-text-primary` | `--color-neutral-900` (#0F172A) | `--color-neutral-50` (#F8FAFC) |
| `--color-text-secondary` | `--color-neutral-600` (#475569) | `--color-neutral-400` (#94A3B8) |
| `--color-text-muted` | `--color-neutral-400` (#94A3B8) | `--color-neutral-500` (#64748B) |
| `--color-text-disabled` | `--color-neutral-300` (#CBD5E1) | `--color-neutral-600` (#475569) |
| `--color-text-inverse` | `--color-neutral-0` (#FFFFFF) | `--color-neutral-900` (#0F172A) |

### Bordures

| Token sémantique | Light | Dark |
|---|---|---|
| `--color-border-default` | `--color-neutral-200` (#E2E8F0) | `--color-neutral-700` (#334155) |
| `--color-border-strong` | `--color-neutral-300` (#CBD5E1) | `--color-neutral-600` (#475569) |
| `--color-border-focus` | `--color-primary-500` (#6366F1) | `--color-primary-400` (#818CF8) |
| `--color-border-error` | `--color-error-500` (#F43F5E) | `--color-error-400` |

---

## Comportement des ombres en mode dark

Les ombres box-shadow sont moins visibles sur fond sombre. En mode dark, les élévations sont suggérées par des fonds légèrement plus clairs plutôt que des ombres.

```css
/* Light */
.card { box-shadow: var(--shadow-sm); }

/* Dark */
.dark .card {
  box-shadow: none;
  background: var(--color-bg-surface);
  border: 1px solid var(--color-border-default);
}
```

---

## Zones et thème sombre

Les couleurs d'accentuation des zones restent identiques en mode dark (Slate, Sky, Emerald). Seules les déclinaisons de surface changent.

---

## Préférence de thème (persistance)

```javascript
// Lecture de la préférence
const savedTheme = localStorage.getItem('cw-theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = savedTheme || (systemDark ? 'dark' : 'light');

// Application
document.documentElement.className = theme;

// Sauvegarde lors du toggle
function toggleTheme() {
  const current = document.documentElement.className;
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.className = next;
  localStorage.setItem('cw-theme', next);
}
```

---

## Règles d'utilisation

1. **Toujours utiliser les tokens sémantiques** dans les composants, pas les primitifs.
2. Les tokens sémantiques seront automatiquement remplacés selon le thème actif.
3. Les illustrations et images doivent avoir des variantes light/dark si elles contiennent des couleurs claires/foncées.
4. Les screenshots et PDFs embarqués ne changent pas avec le thème.
