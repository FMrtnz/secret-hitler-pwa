export default function PolicyCard({ type, selected, onClick }) {
  const liberal = type === 'liberal';
  return (
    <button type="button" className={`card ${type}${selected ? ' selected' : ''}`} onClick={onClick} disabled={!onClick}>
      <svg width="44" height="44" viewBox="0 0 48 48" aria-hidden="true" fill="currentColor" stroke="currentColor">
        {liberal ? (
          <>
            <circle cx="24" cy="24" r="20" fill="none" strokeWidth="3" />
            <path strokeWidth="0" d="M24 9l4.4 9 9.8 1.4-7.1 6.9 1.7 9.8L24 31.5l-8.8 4.6 1.7-9.8-7.1-6.9 9.8-1.4z" />
          </>
        ) : (
          <>
            <path fill="none" strokeWidth="3" d="M24 5l16 5v12c0 10-7 17-16 21C15 39 8 32 8 22V10z" />
            <path fill="none" strokeWidth="3.5" d="M16 16l16 16M32 16L16 32" />
          </>
        )}
      </svg>
      <span>{liberal ? 'Liberal' : 'Fascist'}</span>
    </button>
  );
}
