import Screen from '../components/Screen.jsx';
import PrivateGate from '../components/PrivateGate.jsx';

export default function RoleRevealScreen({ state, derived, actions }) {
  const i = state.revealIndex;
  const player = state.players[i];
  const allies = derived.alliesOf(i);
  const isLast = i === state.players.length - 1;

  return (
    <Screen title="Secret roles" subtitle={`Player ${i + 1} of ${state.players.length}`}>
      <PrivateGate key={i} name={player.name}>
        <div className={`role ${player.role === 'liberal' ? 'liberal' : 'fascist'}`}>
          <p>You are</p>
          <strong>{player.role === 'hitler' ? 'Hitler' : player.role === 'fascist' ? 'a Fascist' : 'a Liberal'}</strong>
        </div>
        {player.role === 'fascist' && (
          <p>Your allies: {allies.map((a) => `${a.name}${a.role === 'hitler' ? ' (Hitler)' : ''}`).join(', ')}.</p>
        )}
        {player.role === 'hitler' && (
          <p>{allies.length ? `Your fascist ally: ${allies.map((a) => a.name).join(', ')}.` : 'You do not know who the fascists are.'}</p>
        )}
        {player.role === 'liberal' && <p>Find the fascists and protect the republic.</p>}
        <button className="primary" onClick={actions.nextReveal}>{isLast ? 'Hide and start the game' : 'Hide and pass on'}</button>
      </PrivateGate>
    </Screen>
  );
}
