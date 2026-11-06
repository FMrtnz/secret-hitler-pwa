import { useEffect, useMemo, useReducer } from 'react';
import { ACTIONS, PHASES, POWERS, RULES } from '../model/constants.js';
import { createGame, gameReducer } from '../model/gameReducer.js';
import { aliveIndexes, eligibleChancellors, partyOf, visibleAllies, votePassed } from '../model/rules.js';
import { loadState, saveState } from './storage.js';

/**
 * Controller: owns the game state, exposes intent-based actions to the views
 * and read-only derived data so that views never import model internals.
 */
export function useGameController() {
  const [state, dispatch] = useReducer(gameReducer, undefined, () => loadState() ?? { phase: PHASES.SETUP });

  useEffect(() => saveState(state), [state]);

  const actions = useMemo(() => {
    const send = (type, payload = {}) => dispatch({ type, ...payload });
    return {
      startGame: (names) => send(ACTIONS.START_GAME, { state: createGame(names) }),
      nextReveal: () => send(ACTIONS.NEXT_REVEAL),
      nominate: (index) => send(ACTIONS.NOMINATE, { index }),
      castVote: (vote) => send(ACTIONS.CAST_VOTE, { vote }),
      ackVote: () => send(ACTIONS.ACK_VOTE),
      presidentDiscard: (cardIndex) => send(ACTIONS.PRESIDENT_DISCARD, { cardIndex }),
      chancellorEnact: (cardIndex) => send(ACTIONS.CHANCELLOR_ENACT, { cardIndex }),
      proposeVeto: () => send(ACTIONS.PROPOSE_VETO),
      respondToVeto: (accept) => send(ACTIONS.VETO_RESPONSE, { accept }),
      ackPolicy: () => send(ACTIONS.ACK_POLICY),
      resolvePower: (target) => send(ACTIONS.RESOLVE_POWER, { target }),
      reset: () => send(ACTIONS.RESET)
    };
  }, []);

  const derived = useMemo(() => {
    if (!state.players) return {};
    const { players } = state;
    return {
      president: players[state.presidentIndex],
      chancellor: players[state.chancellorIndex],
      currentVoterIndex: state.voters[state.voteIndex],
      eligibleChancellors: state.phase === PHASES.NOMINATION ? eligibleChancellors(state) : [],
      votePassed: votePassed(state),
      canVeto: state.fascistPolicies >= RULES.VETO_UNLOCK && !state.vetoRefused,
      powerTargets: aliveIndexes(players).filter(
        (i) => i !== state.presidentIndex && !(state.power === POWERS.INVESTIGATE && state.investigated.includes(i))
      ),
      alliesOf: (index) => visibleAllies(players, index),
      partyOf: (index) => partyOf(players[index].role)
    };
  }, [state]);

  return { state, derived, actions };
}
