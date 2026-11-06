import { useState } from 'react';
import Screen from '../components/Screen.jsx';
import PrivateGate from '../components/PrivateGate.jsx';
import PolicyCard from '../components/PolicyCard.jsx';
import { POWERS, POWER_LABELS } from '../../model/constants.js';

function TargetPicker({ state, targets, label, onConfirm, children }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <div className="list">
        {targets.map((i) => (
          <button key={i} className={`choice${selected === i ? ' on' : ''}`} onClick={() => setSelected(i)}>{state.players[i].name}</button>
        ))}
      </div>
      {children?.(selected)}
      <button className="primary" disabled={selected === null} onClick={() => onConfirm(selected)}>{label}</button>
    </>
  );
}

export default function PowerScreen({ state, derived, actions }) {
  const [investigated, setInvestigated] = useState(null);
  const president = derived.president;
  const title = `${POWER_LABELS[state.power]}`;
  const subtitle = `President ${president.name} uses this power.`;

  if (state.power === POWERS.INVESTIGATE) {
    return (
      <Screen title={title} subtitle={subtitle}>
        <PrivateGate name={president.name}>
          {investigated === null ? (
            <>
              <p>Choose a player to investigate. You will see their party, not their exact role.</p>
              <TargetPicker state={state} targets={derived.powerTargets} label="Investigate" onConfirm={setInvestigated} />
            </>
          ) : (
            <>
              <div className={`role ${derived.partyOf(investigated)}`}>
                <p>{state.players[investigated].name} belongs to the</p>
                <strong>{derived.partyOf(investigated)} party</strong>
              </div>
              <p>You may share this, or lie about it.</p>
              <button className="primary" onClick={() => actions.resolvePower(investigated)}>Hide and continue</button>
            </>
          )}
        </PrivateGate>
      </Screen>
    );
  }

  if (state.power === POWERS.PEEK) {
    return (
      <Screen title={title} subtitle={subtitle}>
        <PrivateGate name={president.name}>
          <p>These are the next three policies, from the top of the deck.</p>
          <div className="cards">{state.peek.map((t, i) => <PolicyCard key={i} type={t} />)}</div>
          <button className="primary" onClick={() => actions.resolvePower()}>Hide and continue</button>
        </PrivateGate>
      </Screen>
    );
  }

  const isExecution = state.power === POWERS.EXECUTION;
  return (
    <Screen title={title} subtitle={subtitle}>
      <p>{isExecution ? 'Choose a player to execute.' : 'Choose the next presidential candidate.'}</p>
      <TargetPicker
        state={state}
        targets={derived.powerTargets}
        label={isExecution ? 'Execute' : 'Appoint as President'}
        onConfirm={actions.resolvePower}
      />
    </Screen>
  );
}
