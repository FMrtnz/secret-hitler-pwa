import Screen from '../components/Screen.jsx';
import PolicyCard from '../components/PolicyCard.jsx';

export default function PolicyEnactedScreen({ state, actions }) {
  return (
    <Screen
      title={`A ${state.lastEnacted} policy was enacted`}
      subtitle={state.enactedByChaos ? 'Chaos: the top policy of the deck was enacted automatically.' : 'The government has spoken. Nobody has to say what they saw.'}
    >
      <div className="cards"><PolicyCard type={state.lastEnacted} selected /></div>
      <button className="primary" onClick={actions.ackPolicy}>Continue</button>
    </Screen>
  );
}
