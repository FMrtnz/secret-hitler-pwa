import { useState } from 'react';

// Hides private content until the right person confirms they are holding the phone.
export default function PrivateGate({ name, children }) {
  const [ready, setReady] = useState(false);
  if (ready) return children;
  return (
    <div className="gate">
      <p>Pass the phone to</p>
      <strong className="gate-name">{name}</strong>
      <button className="primary" onClick={() => setReady(true)}>I am {name}</button>
    </div>
  );
}
