// Plays random games through the reducer to check the model never deadlocks.
import { gameReducer, createGame } from '../src/model/gameReducer.js';
import { ACTIONS, PHASES, POWERS } from '../src/model/constants.js';
import { eligibleChancellors, aliveIndexes } from '../src/model/rules.js';

const pick = (a) => a[Math.floor(Math.random() * a.length)];
const stats = {};

for (let game = 0; game < 3000; game++) {
  const n = 5 + (game % 6);
  let s = createGame(Array.from({ length: n }, (_, i) => `P${i}`));
  let steps = 0;
  while (s.phase !== PHASES.GAME_OVER) {
    if (++steps > 2000) throw new Error('Game did not finish');
    const act = (type, extra = {}) => (s = gameReducer(s, { type, ...extra }));
    switch (s.phase) {
      case PHASES.ROLE_REVEAL: act(ACTIONS.NEXT_REVEAL); break;
      case PHASES.NOMINATION: {
        const pool = eligibleChancellors(s);
        if (!pool.length) throw new Error('No eligible chancellor');
        act(ACTIONS.NOMINATE, { index: pick(pool) }); break;
      }
      case PHASES.VOTING: act(ACTIONS.CAST_VOTE, { vote: Math.random() < 0.7 }); break;
      case PHASES.VOTE_RESULT: act(ACTIONS.ACK_VOTE); break;
      case PHASES.LEGISLATIVE_PRESIDENT: act(ACTIONS.PRESIDENT_DISCARD, { cardIndex: pick([0, 1, 2]) }); break;
      case PHASES.LEGISLATIVE_CHANCELLOR:
        if (s.fascistPolicies >= 5 && !s.vetoRefused && Math.random() < 0.5) act(ACTIONS.PROPOSE_VETO);
        else act(ACTIONS.CHANCELLOR_ENACT, { cardIndex: pick([0, 1]) });
        break;
      case PHASES.VETO_RESPONSE: act(ACTIONS.VETO_RESPONSE, { accept: Math.random() < 0.5 }); break;
      case PHASES.POLICY_ENACTED: act(ACTIONS.ACK_POLICY); break;
      case PHASES.POWER: {
        const targets = aliveIndexes(s.players).filter((i) => i !== s.presidentIndex && !s.investigated.includes(i));
        const needsTarget = [POWERS.INVESTIGATE, POWERS.SPECIAL_ELECTION, POWERS.EXECUTION].includes(s.power);
        act(ACTIONS.RESOLVE_POWER, { target: needsTarget ? pick(targets) : undefined }); break;
      }
      default: throw new Error('Unknown phase ' + s.phase);
    }
  }
  stats[s.winReason] = (stats[s.winReason] || 0) + 1;
}
console.log('3000 random games finished without deadlock.');
console.table(stats);
