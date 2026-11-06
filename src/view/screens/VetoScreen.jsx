import Screen from '../components/Screen.jsx';
import PrivateGate from '../components/PrivateGate.jsx';

export default function VetoScreen({ derived, actions }) {
  return (
    <Screen title="Veto proposed" subtitle={`Chancellor ${derived.chancellor.name} wants to discard both policies.`}>
      <PrivateGate name={derived.president.name}>
        <p>Accepting discards both policies and moves the election tracker forward. Refusing forces the Chancellor to enact one.</p>
        <div className="row">
          <button className="vote ja" onClick={() => actions.respondToVeto(true)}>Accept</button>
          <button className="vote nein" onClick={() => actions.respondToVeto(false)}>Refuse</button>
        </div>
      </PrivateGate>
    </Screen>
  );
}
