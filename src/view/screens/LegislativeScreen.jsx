import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import PrivateGate from '../components/PrivateGate.jsx';
import PolicyCard from '../components/PolicyCard.jsx';
import { PHASES } from '../../model/constants.js';

export default function LegislativeScreen({ state, derived, actions }) {
  const [selected, setSelected] = useState(null);
  const isPresident = state.phase === PHASES.LEGISLATIVE_PRESIDENT;
  const who = isPresident ? derived.president : derived.chancellor;

  return (
    <Screen title={isPresident ? 'President: discard one' : 'Chancellor: enact one'}>
      <PrivateGate name={who.name}>
        {!isPresident && state.vetoRefused && <p className="warning">The President refused your veto. You must enact a policy.</p>}
        <p>{isPresident ? 'Discard one policy. The other two go to the Chancellor.' : 'Enact one policy. The other is discarded.'}</p>
        <div className="cards">
          {state.hand.map((type, i) => (
            <PolicyCard key={i} type={type} selected={selected === i} onClick={() => setSelected(i)} />
          ))}
        </div>
        <button
          className="primary"
          disabled={selected === null}
          onClick={() => (isPresident ? actions.presidentDiscard(selected) : actions.chancellorEnact(selected))}
        >
          {isPresident ? 'Discard selected policy' : 'Enact selected policy'}
        </button>
        {!isPresident && derived.canVeto && (
          <button className="ghost" onClick={actions.proposeVeto}>Propose a veto to the President</button>
        )}
      </PrivateGate>
    </Screen>
  );
}
