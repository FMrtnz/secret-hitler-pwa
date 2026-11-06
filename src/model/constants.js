export const PHASES = Object.freeze({
  SETUP: 'SETUP',
  ROLE_REVEAL: 'ROLE_REVEAL',
  NOMINATION: 'NOMINATION',
  VOTING: 'VOTING',
  VOTE_RESULT: 'VOTE_RESULT',
  LEGISLATIVE_PRESIDENT: 'LEGISLATIVE_PRESIDENT',
  LEGISLATIVE_CHANCELLOR: 'LEGISLATIVE_CHANCELLOR',
  VETO_RESPONSE: 'VETO_RESPONSE',
  POLICY_ENACTED: 'POLICY_ENACTED',
  POWER: 'POWER',
  GAME_OVER: 'GAME_OVER'
});

export const ROLES = Object.freeze({ LIBERAL: 'liberal', FASCIST: 'fascist', HITLER: 'hitler' });
export const POLICIES = Object.freeze({ LIBERAL: 'liberal', FASCIST: 'fascist' });

export const POWERS = Object.freeze({
  INVESTIGATE: 'investigate',
  PEEK: 'peek',
  SPECIAL_ELECTION: 'special_election',
  EXECUTION: 'execution'
});

export const POWER_LABELS = Object.freeze({
  investigate: 'Investigate loyalty',
  peek: 'Policy peek',
  special_election: 'Special election',
  execution: 'Execution'
});

export const RULES = Object.freeze({
  MIN_PLAYERS: 5,
  MAX_PLAYERS: 10,
  LIBERAL_CARDS: 6,
  FASCIST_CARDS: 11,
  LIBERAL_WIN: 5,
  FASCIST_WIN: 6,
  HITLER_ZONE: 3,
  CHAOS_LIMIT: 3,
  VETO_UNLOCK: 5
});

// Presidential powers unlocked by the Nth fascist policy (index 0 = 1st policy).
export const POWER_TRACKS = Object.freeze({
  small: [null, null, POWERS.PEEK, POWERS.EXECUTION, POWERS.EXECUTION, null], // 5-6 players
  medium: [null, POWERS.INVESTIGATE, POWERS.SPECIAL_ELECTION, POWERS.EXECUTION, POWERS.EXECUTION, null], // 7-8
  large: [POWERS.INVESTIGATE, POWERS.INVESTIGATE, POWERS.SPECIAL_ELECTION, POWERS.EXECUTION, POWERS.EXECUTION, null] // 9-10
});

export const ACTIONS = Object.freeze({
  LOAD: 'LOAD',
  START_GAME: 'START_GAME',
  NEXT_REVEAL: 'NEXT_REVEAL',
  NOMINATE: 'NOMINATE',
  CAST_VOTE: 'CAST_VOTE',
  ACK_VOTE: 'ACK_VOTE',
  PRESIDENT_DISCARD: 'PRESIDENT_DISCARD',
  CHANCELLOR_ENACT: 'CHANCELLOR_ENACT',
  PROPOSE_VETO: 'PROPOSE_VETO',
  VETO_RESPONSE: 'VETO_RESPONSE',
  ACK_POLICY: 'ACK_POLICY',
  RESOLVE_POWER: 'RESOLVE_POWER',
  RESET: 'RESET'
});
