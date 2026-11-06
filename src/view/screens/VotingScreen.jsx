import Screen from '../components/Screen.jsx';
import PrivateGate from '../components/PrivateGate.jsx';

export default function VotingScreen({ state, derived, actions }) {
  const voterIndex = derived.currentVoterIndex;
  return (
    <Screen title="Vote on the government" subtitle={`President ${derived.president.name} with Chancellor ${derived.chancellor.name}`}>
      <PrivateGate key={voterIndex} name={state.players[voterIndex].name}>
        <p>Do you approve this government?</p>
        <div className="row">
          <button className="vote ja" onClick={() => actions.castVote(true)}>Ja!</button>
          <button className="vote nein" onClick={() => actions.castVote(false)}>Nein!</button>
        </div>
      </PrivateGate>
    </Screen>
  );
}
