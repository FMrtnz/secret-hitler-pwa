export default function Screen({ title, subtitle, children }) {
  return (
    <main className="screen">
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {children}
    </main>
  );
}
