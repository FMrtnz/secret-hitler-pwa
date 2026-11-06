import { POLICIES, ROLES, RULES, POWER_TRACKS } from './constants.js';

export function shuffle(items) {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const buildDeck = () =>
  shuffle([
    ...Array(RULES.LIBERAL_CARDS).fill(POLICIES.LIBERAL),
    ...Array(RULES.FASCIST_CARDS).fill(POLICIES.FASCIST)
  ]);

export function assignRoles(count) {
  const liberals = Math.floor(count / 2) + 1;
  const fascists = count - liberals - 1; // Hitler is counted separately
  return shuffle([
    ...Array(liberals).fill(ROLES.LIBERAL),
    ...Array(fascists).fill(ROLES.FASCIST),
    ROLES.HITLER
  ]);
}

export const powerTrack = (count) =>
  count <= 6 ? POWER_TRACKS.small : count <= 8 ? POWER_TRACKS.medium : POWER_TRACKS.large;

export const partyOf = (role) => (role === ROLES.LIBERAL ? POLICIES.LIBERAL : POLICIES.FASCIST);

export const aliveIndexes = (players) => players.map((p, i) => (p.alive ? i : -1)).filter((i) => i >= 0);

export function nextAliveIndex(players, from) {
  let i = from;
  do {
    i = (i + 1) % players.length;
  } while (!players[i].alive);
  return i;
}

// Term limits: the last elected Chancellor can't be nominated; the last President
// can't either, unless only 5 players are still alive.
export function eligibleChancellors(state) {
  const { players, presidentIndex, lastGovernment } = state;
  const aliveCount = aliveIndexes(players).length;
  return aliveIndexes(players).filter(
    (i) =>
      i !== presidentIndex &&
      !(lastGovernment && (i === lastGovernment.chancellor || (aliveCount > 5 && i === lastGovernment.president)))
  );
}

// What a player is allowed to know about the others at the start of the game.
export function visibleAllies(players, index) {
  const me = players[index];
  if (me.role === ROLES.LIBERAL) return [];
  if (me.role === ROLES.HITLER) {
    return players.length <= 6 ? players.filter((p, i) => i !== index && p.role === ROLES.FASCIST) : [];
  }
  return players.filter((p, i) => i !== index && p.role !== ROLES.LIBERAL);
}

export function votePassed(state) {
  const values = Object.values(state.votes);
  return values.filter(Boolean).length > values.filter((v) => !v).length;
}
