import Screen from '../components/Screen.jsx';

export default function VoteResultScreen({ state, derived, actions }) {
  const passed = derived.votePassed;
  const tracker = state.electionTracker + 1;
  return (
    <Screen title={passed ? 'The government is elected' : 'The vote failed'}>
      <ul className="players">
        {state.voters.map((i) => (
          <li key={i}>
            <span>{state.players[i].name}</span>
            <strong className={state.votes[i] ? 'ja-text' : 'nein-text'}>{state.votes[i] ? 'Ja!' : 'Nein!'}</strong>
          </li>
        ))}
      </ul>
      {!passed && <p className="warning">The election tracker moves to {tracker} of 3.{tracker >= 3 ? ' The country is in chaos: the top policy will be enacted.' : ''}</p>}
      {passed && <p>President {derived.president.name} will now receive three policies. Hand over the phone when ready.</p>}
      <button className="primary" onClick={actions.ackVote}>Continue</button>
    </Screen>
  );
}
