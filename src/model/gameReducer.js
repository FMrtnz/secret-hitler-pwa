import { ACTIONS, PHASES, POLICIES, POWERS, ROLES, RULES } from './constants.js';
import { assignRoles, buildDeck, nextAliveIndex, aliveIndexes, powerTrack, shuffle, votePassed } from './rules.js';

export function createGame(names) {
  const roles = assignRoles(names.length);
  const first = Math.floor(Math.random() * names.length);
  return {
    phase: PHASES.ROLE_REVEAL,
    players: names.map((name, i) => ({ name: name.trim(), role: roles[i], alive: true })),
    revealIndex: 0,
    drawPile: buildDeck(),
    discardPile: [],
    liberalPolicies: 0,
    fascistPolicies: 0,
    electionTracker: 0,
    presidentIndex: first,
    regularPresidentIndex: first,
    chancellorIndex: null,
    lastGovernment: null,
    voters: [],
    votes: {},
    voteIndex: 0,
    hand: [],
    vetoRefused: false,
    lastEnacted: null,
    enactedByChaos: false,
    power: null,
    peek: [],
    investigated: [],
    winner: null,
    winReason: ''
  };
}

const win = (s, winner, winReason) => ({ ...s, phase: PHASES.GAME_OVER, winner, winReason });

// Reshuffle the discard pile under the draw pile when fewer than 3 cards remain.
function ensureDeck(s) {
  if (s.drawPile.length >= 3) return s;
  return { ...s, drawPile: [...s.drawPile, ...shuffle(s.discardPile)], discardPile: [] };
}

function draw(s, n) {
  const ready = ensureDeck(s);
  return { cards: ready.drawPile.slice(0, n), state: { ...ready, drawPile: ready.drawPile.slice(n) } };
}

function enact(s, policy, byChaos = false) {
  const next = {
    ...s,
    lastEnacted: policy,
    enactedByChaos: byChaos,
    liberalPolicies: s.liberalPolicies + (policy === POLICIES.LIBERAL ? 1 : 0),
    fascistPolicies: s.fascistPolicies + (policy === POLICIES.FASCIST ? 1 : 0),
    phase: PHASES.POLICY_ENACTED
  };
  if (next.liberalPolicies >= RULES.LIBERAL_WIN) return win(next, ROLES.LIBERAL, 'Five liberal policies were enacted.');
  if (next.fascistPolicies >= RULES.FASCIST_WIN) return win(next, ROLES.FASCIST, 'Six fascist policies were enacted.');
  return next;
}

const newRound = (s, presidentIndex) => ({
  ...s,
  phase: PHASES.NOMINATION,
  presidentIndex,
  chancellorIndex: null,
  voters: [],
  votes: {},
  voteIndex: 0,
  hand: [],
  vetoRefused: false,
  power: null,
  peek: []
});

function advance(s) {
  const next = nextAliveIndex(s.players, s.regularPresidentIndex);
  return newRound({ ...s, regularPresidentIndex: next }, next);
}

// A failed election (vote rejected or veto accepted) advances the tracker; at 3 the top policy is enacted.
function failElection(s) {
  const tracker = s.electionTracker + 1;
  if (tracker >= RULES.CHAOS_LIMIT) {
    const { cards, state } = draw(s, 1);
    return enact({ ...state, electionTracker: 0, lastGovernment: null }, cards[0], true);
  }
  return advance({ ...s, electionTracker: tracker });
}

export function gameReducer(s, action) {
  switch (action.type) {
    case ACTIONS.LOAD:
    case ACTIONS.START_GAME:
      return action.state;

    case ACTIONS.RESET:
      return { phase: PHASES.SETUP };

    case ACTIONS.NEXT_REVEAL: {
      const revealIndex = s.revealIndex + 1;
      return revealIndex >= s.players.length
        ? { ...s, revealIndex, phase: PHASES.NOMINATION }
        : { ...s, revealIndex };
    }

    case ACTIONS.NOMINATE:
      return { ...s, chancellorIndex: action.index, phase: PHASES.VOTING, voters: aliveIndexes(s.players), votes: {}, voteIndex: 0 };

    case ACTIONS.CAST_VOTE: {
      const votes = { ...s.votes, [s.voters[s.voteIndex]]: action.vote };
      const voteIndex = s.voteIndex + 1;
      return { ...s, votes, voteIndex, phase: voteIndex >= s.voters.length ? PHASES.VOTE_RESULT : PHASES.VOTING };
    }

    case ACTIONS.ACK_VOTE: {
      if (votePassed(s)) {
        const chancellor = s.players[s.chancellorIndex];
        const government = { president: s.presidentIndex, chancellor: s.chancellorIndex };
        if (s.fascistPolicies >= RULES.HITLER_ZONE && chancellor.role === ROLES.HITLER) {
          return win({ ...s, lastGovernment: government }, ROLES.FASCIST, `${chancellor.name} is Hitler and was elected Chancellor after three fascist policies.`);
        }
        const { cards, state } = draw({ ...s, lastGovernment: government }, 3);
        return { ...state, hand: cards, phase: PHASES.LEGISLATIVE_PRESIDENT };
      }
      return failElection(s);
    }

    case ACTIONS.PRESIDENT_DISCARD:
      return {
        ...s,
        discardPile: [...s.discardPile, s.hand[action.cardIndex]],
        hand: s.hand.filter((_, i) => i !== action.cardIndex),
        phase: PHASES.LEGISLATIVE_CHANCELLOR
      };

    case ACTIONS.CHANCELLOR_ENACT: {
      const discarded = s.hand.filter((_, i) => i !== action.cardIndex);
      return enact({ ...s, hand: [], discardPile: [...s.discardPile, ...discarded], electionTracker: 0 }, s.hand[action.cardIndex]);
    }

    case ACTIONS.PROPOSE_VETO:
      return { ...s, phase: PHASES.VETO_RESPONSE };

    case ACTIONS.VETO_RESPONSE:
      return action.accept
        ? failElection({ ...s, hand: [], discardPile: [...s.discardPile, ...s.hand] })
        : { ...s, phase: PHASES.LEGISLATIVE_CHANCELLOR, vetoRefused: true };

    case ACTIONS.ACK_POLICY: {
      if (s.enactedByChaos || s.lastEnacted !== POLICIES.FASCIST) return advance(s);
      const power = powerTrack(s.players.length)[s.fascistPolicies - 1];
      if (!power) return advance(s);
      if (power === POWERS.PEEK) {
        const ready = ensureDeck(s);
        return { ...ready, phase: PHASES.POWER, power, peek: ready.drawPile.slice(0, 3) };
      }
      return { ...s, phase: PHASES.POWER, power };
    }

    case ACTIONS.RESOLVE_POWER: {
      switch (s.power) {
        case POWERS.INVESTIGATE:
          return advance({ ...s, investigated: [...s.investigated, action.target] });
        case POWERS.SPECIAL_ELECTION:
          return newRound(s, action.target);
        case POWERS.EXECUTION: {
          const victim = s.players[action.target];
          if (victim.role === ROLES.HITLER) return win(s, ROLES.LIBERAL, `${victim.name} was Hitler and has been executed.`);
          const players = s.players.map((p, i) => (i === action.target ? { ...p, alive: false } : p));
          return advance({ ...s, players });
        }
        default:
          return advance(s);
      }
    }

    default:
      return s;
  }
}
