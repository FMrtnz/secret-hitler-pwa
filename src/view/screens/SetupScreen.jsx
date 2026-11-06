import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import { RULES } from '../../model/constants.js';

export default function SetupScreen({ actions }) {
  const [names, setNames] = useState(Array(RULES.MIN_PLAYERS).fill(''));
  const clean = names.map((n) => n.trim());
  const unique = new Set(clean.map((n) => n.toLowerCase())).size === clean.length;
  const valid = clean.every(Boolean) && unique;

  const setName = (i, value) => setNames(names.map((n, idx) => (idx === i ? value : n)));

  return (
    <Screen title="Secret Hitler" subtitle="Pass-and-play companion. Enter the players in seating order.">
      <div className="list">
        {names.map((name, i) => (
          <div className="row" key={i}>
            <input value={name} placeholder={`Player ${i + 1}`} maxLength={16} onChange={(e) => setName(i, e.target.value)} />
            {names.length > RULES.MIN_PLAYERS && (
              <button className="ghost" aria-label={`Remove player ${i + 1}`} onClick={() => setNames(names.filter((_, idx) => idx !== i))}>Remove</button>
            )}
          </div>
        ))}
      </div>
      {names.length < RULES.MAX_PLAYERS && <button className="ghost" onClick={() => setNames([...names, ''])}>Add a player</button>}
      {!unique && clean.every(Boolean) && <p className="warning">Each player needs a different name.</p>}
      <button className="primary" disabled={!valid} onClick={() => actions.startGame(clean)}>Start game</button>
      <p className="muted small">Non-commercial, educational fan project. Secret Hitler is by Max Temkin, Mike Boxleiter, Tommy Maranges and Mac Schubert (CC BY-NC-SA 4.0).</p>
    </Screen>
  );
}
