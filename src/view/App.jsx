import { useState } from 'react';
import { useGameController } from '../controller/useGameController.js';
import { PHASES } from '../model/constants.js';
import Board from './components/Board.jsx';
import MenuScreen from './screens/MenuScreen.jsx';
import InstructionsScreen from './screens/InstructionsScreen.jsx';
import CreditsScreen from './screens/CreditsScreen.jsx';
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

// Top-level views, outside of the game state machine (which lives in the model).
const VIEWS = Object.freeze({ MENU: 'menu', GAME: 'game', INSTRUCTIONS: 'instructions', CREDITS: 'credits' });

export default function App() {
  const game = useGameController();
  const [view, setView] = useState(VIEWS.MENU);
  const [showBoard, setShowBoard] = useState(false);
  const inGame = game.state.phase !== PHASES.SETUP;
  // A finished game is not worth resuming: the menu only offers to resume a game still being played.
  const hasGame = inGame && game.state.phase !== PHASES.GAME_OVER;
  const Screen = SCREENS[game.state.phase];

  const goTo = (next) => {
    setShowBoard(false);
    setView(next);
  };

  // A saved game survives in localStorage: leaving for the menu never loses it.
  const handlePlay = () => {
    if (inGame) {
      if (hasGame && !window.confirm('A session is in progress. Abandon it and start a new one?')) return;
      game.actions.reset();
    }
    goTo(VIEWS.GAME);
  };

  const handleReset = () => {
    if (window.confirm('Abandon the current game and start a new one?')) {
      setShowBoard(false);
      game.actions.reset();
    }
  };

  if (view === VIEWS.MENU) {
    return (
      <div className="app">
        <MenuScreen
          hasGame={hasGame}
          onPlay={handlePlay}
          onResume={() => goTo(VIEWS.GAME)}
          onInstructions={() => goTo(VIEWS.INSTRUCTIONS)}
          onCredits={() => goTo(VIEWS.CREDITS)}
        />
      </div>
    );
  }

  if (view === VIEWS.INSTRUCTIONS) {
    return (
      <div className="app">
        <InstructionsScreen onBack={() => goTo(VIEWS.MENU)} />
      </div>
    );
  }

  if (view === VIEWS.CREDITS) {
    return (
      <div className="app">
        <CreditsScreen onBack={() => goTo(VIEWS.MENU)} />
      </div>
    );
  }

  return (
    <div className="app">
      {inGame && (
        <button className="board-btn" onClick={() => setShowBoard((v) => !v)}>
          {showBoard ? 'Back to game' : 'Board'}
        </button>
      )}
      {/* Closing the board remounts the screen, so any secret info is hidden again. */}
      {showBoard && inGame ? (
        <Board {...game} onReset={handleReset} onMenu={() => goTo(VIEWS.MENU)} />
      ) : (
        <Screen key={game.state.phase} {...game} onMenu={() => goTo(VIEWS.MENU)} />
      )}
    </div>
  );
}
