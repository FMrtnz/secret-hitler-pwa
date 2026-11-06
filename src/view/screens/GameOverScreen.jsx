import Screen from '../components/Screen.jsx';

const ROLE_LABEL = { liberal: 'Liberal', fascist: 'Fascist', hitler: 'Hitler' };

export default function GameOverScreen({ state, actions }) {
  return (
    <Screen title={state.winner === 'liberal' ? 'The Liberals win' : 'The Fascists win'} subtitle={state.winReason}>
      <span className={`stamp ${state.winner === 'liberal' ? 'lib' : 'fas'}`}>Victory</span>
      <ul className="players">
        {state.players.map((p, i) => (
          <li key={i} className={p.alive ? '' : 'dead'}>
            <span>{p.name}</span>
            <strong className={p.role === 'liberal' ? 'ja-text' : 'nein-text'}>{ROLE_LABEL[p.role]}</strong>
          </li>
        ))}
      </ul>
      <button className="primary" onClick={actions.reset}>New game</button>
    </Screen>
  );
}
