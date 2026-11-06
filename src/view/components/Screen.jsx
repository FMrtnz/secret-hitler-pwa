import Emblem from './Emblem.jsx';

export default function Screen({ title, subtitle, children }) {
  return (
    <main className="screen">
      <Emblem />
      <h1>{title}</h1>
      {subtitle && <p className="subtitle">{subtitle}</p>}
      {children}
    </main>
  );
}
