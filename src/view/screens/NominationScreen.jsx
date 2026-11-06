import { useState } from 'react';
import Screen from '../components/Screen.jsx';

export default function NominationScreen({ state, derived, actions }) {
  const [selected, setSelected] = useState(null);
  return (
    <Screen title={`${derived.president.name} is President`} subtitle="Discuss out loud, then nominate a Chancellor.">
      <div className="list">
        {derived.eligibleChancellors.map((i) => (
          <button key={i} className={`choice${selected === i ? ' on' : ''}`} onClick={() => setSelected(i)}>
            {state.players[i].name}
          </button>
        ))}
      </div>
      <button className="primary" disabled={selected === null} onClick={() => actions.nominate(selected)}>Nominate</button>
    </Screen>
  );
}
