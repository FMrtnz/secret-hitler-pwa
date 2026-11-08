import { POWER_LABELS, POWER_TRACKS, RULES } from '../../model/constants.js';

const trackFor = (count) => (count <= 6 ? POWER_TRACKS.small : count <= 8 ? POWER_TRACKS.medium : POWER_TRACKS.large);

export default function Board({ state, onReset, onMenu }) {
  const { players } = state;
  const aliveCount = players.filter((p) => p.alive).length;
  const powers = trackFor(players.length);
  const last = state.lastGovernment;
  return (
    <main className="screen board">
      <h1>Board</h1>

      <h2>Liberal policies</h2>
      <div className="track">
        {Array.from({ length: RULES.LIBERAL_WIN }, (_, i) => (
          <div key={i} className={`slot liberal${i < state.liberalPolicies ? ' filled' : ''}`}>{i < state.liberalPolicies ? 'L' : ''}</div>
        ))}
      </div>

      <h2>Fascist policies</h2>
      <div className="track">
        {powers.map((power, i) => (
          <div key={i} className={`slot fascist${i < state.fascistPolicies ? ' filled' : ''}`}>
            {i < state.fascistPolicies ? 'F' : ''}
            <small>{i === 5 ? 'Fascists win' : power ? POWER_LABELS[power] : ''}</small>
          </div>
        ))}
      </div>
      {state.fascistPolicies >= RULES.HITLER_ZONE && (
        <p className="warning">Danger zone: electing Hitler as Chancellor makes the fascists win.</p>
      )}

      {state.fascistPolicies >= RULES.VETO_UNLOCK && (
        <p className="warning">Veto power is active: the Chancellor may propose to discard both policies.</p>
      )}

      <h2>Election tracker</h2>
      <div className="dots">
        {Array.from({ length: RULES.CHAOS_LIMIT }, (_, i) => (
          <span key={i} className={`dot${i < state.electionTracker ? ' on' : ''}`} />
        ))}
        <span className="muted">{state.electionTracker} of {RULES.CHAOS_LIMIT} failed elections</span>
      </div>

      <h2>Players</h2>
      <ul className="players">
        {players.map((p, i) => (
          <li key={i} className={p.alive ? '' : 'dead'}>
            <span>{p.name}</span>
            <span className="tags">
              {!p.alive && <em>Executed</em>}
              {p.alive && i === state.presidentIndex && <em>President</em>}
              {p.alive && i === state.chancellorIndex && <em>Chancellor nominee</em>}
              {p.alive && last && (i === last.chancellor || (i === last.president && aliveCount > 5)) && <em>Term-limited</em>}
            </span>
          </li>
        ))}
      </ul>
      <p className="muted">Draw pile: {state.drawPile.length} cards</p>
      <button className="ghost" onClick={onMenu}>Principal menu</button>
      <button className="danger" onClick={onReset}>Abandon game</button>
    </main>
  );
}
