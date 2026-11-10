import Emblem from '../components/Emblem.jsx';
import {BottomCredits} from '../Utils.jsx';
import {LogoSH} from '../components/Logo.jsx';

/**
 * Intro menu shown at every launch, before the game itself.
 * Purely presentational: navigation is handled by App.
 */
export default function MenuScreen({ hasGame, onPlay, onResume, onInstructions, onCredits }) {
  return (
    <main className="screen menu">
      <p className="menu-kicker">Social game</p>
      <h1 className="menu-title hide">Secret Hitler</h1>
      <LogoSH width={220}/>
      <p className="menu-sub">A pass-and-play companion.</p>
      <hr className="rule" />

      <nav className="menu-nav" aria-label="Main menu">
        {hasGame && (
          <button className="primary" onClick={onResume}>
            continue the game
          </button>
        )}
        <button className={hasGame ? 'menu-btn' : 'primary'} onClick={onPlay}>
          Start a game
        </button>
        <button className="menu-btn" onClick={onInstructions}>
          Instructions
        </button>
        <button className="menu-btn" onClick={onCredits}>
          Credits
        </button>
      </nav>

      {BottomCredits()}
    </main>
  );
}
