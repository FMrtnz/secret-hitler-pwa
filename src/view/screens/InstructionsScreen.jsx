import Screen from '../components/Screen.jsx';
import {BackButtonHeader,BackButtonGhost} from '../Utils.jsx';

// Roles dealt for each table size (Hitler is always one extra Fascist).
const ROLE_TABLE = [
  { players: 5, liberals: 3, fascists: 1 },
  { players: 6, liberals: 4, fascists: 1 },
  { players: 7, liberals: 4, fascists: 2 },
  { players: 8, liberals: 5, fascists: 2 },
  { players: 9, liberals: 5, fascists: 3 },
  { players: 10, liberals: 6, fascists: 3 }
];

export default function InstructionsScreen({ onBack }) {
  return (
    <Screen title="Instructions" subtitle="How to play with a single phone.">
  {BackButtonHeader(onBack)}

  <div className="doc">
    <h2>Objective of the Game</h2>
    <p>
      Two camps compete in secret: the <strong>Liberals</strong>, who are in the majority, and the{' '}
      <strong>Fascists</strong>, among whom <strong>Hitler</strong> is hiding.
    </p>
    <ul>
      <li>
        <strong>The Liberals win</strong> by passing 5 liberal laws or by executing Hitler.
      </li>
      <li>
        <strong>The Fascists win</strong> by passing 6 fascist laws or by electing Hitler Chancellor
        after the 3rd fascist law is passed.
      </li>
    </ul>

    <h2>Setup</h2>
    <p>
      For 5 to 10 players. Enter the first names in the order you are sitting around the table: the phone
      distributes roles at random and shuffles the deck of 17 laws (6 liberal, 11 fascist).
    </p>
    <table className="roles-table">
      <thead>
        <tr>
          <th>Players</th>
          <th>Liberals</th>
          <th>Fascists</th>
          <th>Hitler</th>
        </tr>
      </thead>
      <tbody>
        {ROLE_TABLE.map((r) => (
          <tr key={r.players}>
            <td>{r.players}</td>
            <td>{r.liberals}</td>
            <td>{r.fascists}</td>
            <td>1</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p>
      Each player takes the phone in turn, discovers their role in secret, then hides it before passing the phone.
      The Fascists know each other. Hitler knows his fascist ally only with 5 or 6 players; from 7 players onwards,
      he does not know who the Fascists are.
    </p>

    <h2>A Game Round</h2>
    <ol>
      <li>
        <strong>Nomination.</strong> The President proposes a Chancellor. The last elected Chancellor cannot be
        nominated; the last President cannot either, unless only 5 players remain alive.
      </li>
      <li>
        <strong>Voting.</strong> Each living player votes Yes or No in secret, one after the other, then the votes
        are revealed. There must be more Yes votes than No votes. Otherwise, the election tracker advances; after 3
        failures, the top law from the deck is automatically passed.
      </li>
      <li>
        <strong>Legislative Session.</strong> The President receives 3 laws in secret, discards one, and passes the
        other two to the Chancellor, who passes one and discards the other. Only the passed law is shown to the
        table: everyone is free to tell the truth… or to lie.
      </li>
      <li>
        <strong>Presidential Power.</strong> Certain fascist laws grant a power to the President (see below). The
        presidency then passes to the next player.
      </li>
    </ol>
    <p>
      <strong>Veto.</strong> Once 5 fascist laws have been passed, the Chancellor may propose discarding the two
      laws. If the President accepts, they are discarded and the election tracker advances; if he refuses, the
      Chancellor must pass one of them.
    </p>

    <h2>Presidential Powers</h2>
    <ul>
      <li>
        <strong>5 – 6 players:</strong> peek at laws (3rd), execution (4th and 5th).
      </li>
      <li>
        <strong>7 – 8 players:</strong> investigation (2nd), special election (3rd), execution
        (4th and 5th).
      </li>
      <li>
        <strong>9 – 10 players:</strong> investigation (1st and 2nd), special election (3rd), execution (4th and 5th).
      </li>
    </ul>
    <p>
      <strong>Investigation:</strong> the President discovers in secret the camp (liberal or fascist) of a player, not their
      exact role. <strong>Peek:</strong> he secretly sees the next 3 laws from the deck.{' '}
      <strong>Special Election:</strong> he chooses the next President. <strong>Execution:</strong> he eliminates
      a player; if it was Hitler, the Liberals win immediately.
    </p>

    <h2>Tips for the Phone</h2>
    <ul>
      <li>Only pass the phone once the secret screen is hidden: each player confirms they are holding it before seeing anything.</li>
      <li>
        The <strong>Board</strong> button, in the top right corner, displays the state of the game: laws passed, election
        tracker, players, deck size. Closing the board returns the secret information to safety.
      </li>
      <li>The game is saved on the device: you can leave and resume it from the menu.</li>
    </ul>
  </div>

  {BackButtonGhost(onBack)}
</Screen>

  );
}
