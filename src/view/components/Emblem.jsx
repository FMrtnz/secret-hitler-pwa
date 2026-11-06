// Decorative badge, original artwork: a ringed star.
export default function Emblem({ size = 54 }) {
  return (
    <svg className="emblem" width={size} height={size} viewBox="0 0 48 48" aria-hidden="true" fill="currentColor">
      <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="24" r="17" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M24 10l3.8 8 8.7 1.2-6.3 6.1 1.5 8.7L24 29.7l-7.7 4.3 1.5-8.7-6.3-6.1 8.7-1.2z" />
    </svg>
  );
}
