import { useState } from 'react';
import { useGameController } from '../controller/useGameController.js';
import { PHASES } from '../model/constants.js';
import Board from './components/Board.jsx';
import SetupScreen from './screens/SetupScreen.jsx';
import RoleRevealScreen from './screens/RoleRevealScreen.jsx';
import NominationScreen from './screens/NominationScreen.jsx';
import VotingScreen from './screens/VotingScreen.jsx';
import VoteResultScreen from './screens/VoteResultScreen.jsx';
import LegislativeScreen from './screens/LegislativeScreen.jsx';
import VetoScreen from './screens/VetoScreen.jsx';
import PolicyEnactedScreen from './screens/PolicyEnactedScreen.jsx';
import PowerScreen from './screens/PowerScreen.jsx';
import GameOverScreen from './screens/GameOverScreen.jsx';

const SCREENS = {
  [PHASES.SETUP]: SetupScreen,
  [PHASES.ROLE_REVEAL]: RoleRevealScreen,
  [PHASES.NOMINATION]: NominationScreen,
  [PHASES.VOTING]: VotingScreen,
  [PHASES.VOTE_RESULT]: VoteResultScreen,
  [PHASES.LEGISLATIVE_PRESIDENT]: LegislativeScreen,
  [PHASES.LEGISLATIVE_CHANCELLOR]: LegislativeScreen,
  [PHASES.VETO_RESPONSE]: VetoScreen,
  [PHASES.POLICY_ENACTED]: PolicyEnactedScreen,
  [PHASES.POWER]: PowerScreen,
  [PHASES.GAME_OVER]: GameOverScreen
};

export default function App() {
  const game = useGameController();
  const [showBoard, setShowBoard] = useState(false);
  const inGame = game.state.phase !== PHASES.SETUP;
  const Screen = SCREENS[game.state.phase];

  const handleReset = () => {
    if (window.confirm('Abandon the current game and start a new one?')) {
      setShowBoard(false);
      game.actions.reset();
    }
  };

  return (
    <div className="app">
      {inGame && (
        <button className="board-btn" onClick={() => setShowBoard((v) => !v)}>
          {showBoard ? 'Back to game' : 'Board'}
        </button>
      )}
      {/* Closing the board remounts the screen, so any secret info is hidden again. */}
       {showBoard && inGame ? <Board {...game} onReset={handleReset} /> : <Screen key={game.state.phase} {...game} />}
    </div>
  );
}
