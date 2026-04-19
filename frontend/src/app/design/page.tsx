export default function DesignDocsPage() {
  return (
    <main className="cw-container surface-section">
      <div className="card surface-section">
        <p className="section-title">Pont avec design/</p>
        <ul style={{ lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
          <li>
            Tokens importés depuis <code>design/tokens/index.css</code>
          </li>
          <li>
            Thèmes light/dark synchronisés avec{" "}
            <code>design/themes/light.css</code> et <code>dark.css</code>
          </li>
          <li>
            Composants inspirés par <code>design/components/primitives</code>
          </li>
          <li>
            Pages alignées avec les spécifications présentes dans{" "}
            <code>design/pages/</code>
          </li>
        </ul>
        <p>
          Consultez le dossier <code>design/</code> à la racine du monorepo
          pour l&apos;intégralité des specs UI/UX.
        </p>
      </div>
    </main>
  );
}
