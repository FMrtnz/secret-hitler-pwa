export default function PolicyCard({ type, selected, onClick }) {
  const label = type === 'liberal' ? 'Liberal' : 'Fascist';
  return (
    <button type="button" className={`card ${type}${selected ? ' selected' : ''}`} onClick={onClick} disabled={!onClick}>
      {label}
    </button>
  );
}
