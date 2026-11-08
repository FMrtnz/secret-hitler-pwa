import Screen from '../components/Screen.jsx';
import {BackButtonHeader,BackButtonGhost} from '../Utils.jsx';

const LINKS = {
  site: 'https://www.secrethitler.com',
  licence: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr'
};

function ExternalLink({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function CreditsScreen({ onBack }) {
  return (
    <Screen title="Credits" subtitle="About the game and its creators.">
      {BackButtonHeader(onBack)}

      <div className="doc">
        <h2>The Game</h2>
        <p>
          <strong>Secret Hitler</strong> is a social deduction and bluffing game for 5 to 10 players, set in 1930s Germany. 
          Players are secretly divided between Liberals and Fascists; one of the Fascists is Hitler. The Liberals, though 
          more numerous but poorly informed, must unmask their opponents before the republic falls.
        </p>

        <h2>The Creators</h2>
        <p>Secret Hitler was designed by:</p>
        <ul className="credits-list">
          <li>Max Temkin</li>
          <li>Mike Boxleiter</li>
          <li>Tommy Maranges</li>
          <li>Mac Schubert (illustrations and art direction)</li>
        </ul>
        <p>
          Official rules, original game, and shop: <ExternalLink href={LINKS.site}>secrethitler.com</ExternalLink>.
          If you enjoy this version, support the creators by purchasing the actual game.
        </p>

        <h2>This Application</h2>
        <p>
          A "pass-and-play" companion app: the phone replaces the cards, role envelopes, and deck, passing around the table. 
          No physical copy of the game is required to use it.
        </p>
        <p>
          This is a <strong>free, non-commercial fan project</strong>, created for fun, experimentation, and learning. 
          It is not affiliated with, approved by, or sponsored by the creators or publishers of Secret Hitler. 
          It does not reuse any illustrations, text, or cards from the original game: only the rules have been re-implemented.
        </p>
        <p>
          No data is sent to the Internet: the game session is saved only on your device.
        </p>

        <h2>License</h2>
        <p>
          Secret Hitler is published under the{' '}
          <ExternalLink href={LINKS.licence}>Creative Commons BY-NC-SA 4.0</ExternalLink> license 
          (Attribution – Non-Commercial – Share-Alike). This application, as a derivative work, credits the 
          original authors, remains strictly non-commercial, and is shared under the same license.
        </p>

        <h2>Typography</h2>
        <p>
          Headings use <em>Stardos Stencil</em> (by Vernon Adams) and body text uses <em>Courier Prime</em> (by Quote-Unquote Apps), 
          both free fonts licensed under SIL Open Font 1.1.
        </p>
      </div>

      {BackButtonGhost(onBack)}
    </Screen>

  );
}
