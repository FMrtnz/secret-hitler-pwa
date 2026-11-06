# Secret Hitler - Pass & Play (PWA)

A **single-phone, pass-and-play companion app** for the social deduction board game *Secret Hitler*.
Everyone sits around the table, the phone circulates from hand to hand, and the app takes the place
of the cards, the role envelopes and the policy deck. It is built with **React + Vite** as a
**Progressive Web App**, so it can be installed on a home screen and works offline.

> **Important - non-commercial fan project.**
> This application is made **for fun, for experimentation and for educational purposes only**.
> It is **not for sale**, must **not be monetised** (no ads, no paywall, no in-app purchases) and is
> **not affiliated with, endorsed by or sponsored by** the creators or publishers of Secret Hitler.
> You need no physical copy of the game to run it, but if you enjoy it, please support the authors
> by buying the real game.

## Credits

*Secret Hitler* was designed by:

- **Max Temkin**
- **Mike Boxleiter**
- **Tommy Maranges**
- **Mac Schubert** (art and design)

Useful links:

- Secret Hitler (official site, rules and the original game): <https://www.secrethitler.com>
- Licence text (CC BY-NC-SA 4.0): <https://creativecommons.org/licenses/by-nc-sa/4.0/>

*Secret Hitler* is released under the
[**Creative Commons BY-NC-SA 4.0**](https://creativecommons.org/licenses/by-nc-sa/4.0/) licence
(Attribution - NonCommercial - ShareAlike). As a derivative work, this project:

1. **credits the original authors** (above);
2. is **strictly non-commercial**;
3. is shared under the **same licence (CC BY-NC-SA 4.0)**. Any adaptation of this code must keep these terms.

This app re-implements the game rules only. It ships none of the original artwork, text or card designs.

## How the app works

1. **Setup** - Enter 5 to 10 player names, in seating order. The app deals secret roles at random
   (Liberals, Fascists and one Hitler) and builds the shuffled 17-card policy deck (6 Liberal, 11 Fascist).
2. **Secret roles** - The phone asks for each player in turn. Tap *I am <name>* to reveal your role,
   then *Hide and pass on*. Fascists see their allies, as in the real game (Hitler only knows the
   fascists with 5 to 6 players).
3. **Nomination** - The President nominates an eligible Chancellor (term limits are enforced).
4. **Voting** - Each living player votes *Ja!* or *Nein!* in secret, one by one. Votes are then shown to everyone.
   If the vote fails, the election tracker advances; after three failures the top policy is enacted
   automatically.
5. **Legislative session** - The President privately discards one of three policies, then the Chancellor
   privately enacts one of the remaining two. Only the enacted policy is shown.
   **Veto:** once five fascist policies are enacted, the Chancellor may propose a veto. If the President
   accepts, both policies are discarded and the election tracker advances; if the President refuses, the
   Chancellor must enact one of the two policies.
6. **Presidential powers** - After certain fascist policies the President uses a power: investigate
   loyalty, policy peek, special election or execution (depending on the number of players).
7. **End of game** - The app detects every win condition and then reveals all roles:
   - Liberals: 5 liberal policies, or Hitler executed.
   - Fascists: 6 fascist policies, or Hitler elected Chancellor after 3 fascist policies.

At any moment the **Board** button (top right) shows the policy tracks, the election tracker, the players,
who is President or term-limited, and the size of the draw pile, so the table can pause and discuss.
Closing the board returns to the current step with any secret information hidden again.
The game is saved in `localStorage`, so a page reload or an app restart will not lose the game.

## Architecture (MVC)

```
src/
  model/                  # Pure game logic, no React, no browser APIs
    constants.js          #   phases, roles, powers, rule numbers, action names
    rules.js              #   deck, roles, term limits, power tracks, helpers
    gameReducer.js        #   the game state machine (including the veto): (state, action) -> state
  controller/             # Glue between model and views
    useGameController.js  #   React hook: state, intent-based actions, derived data
    storage.js            #   localStorage persistence
  view/                   # React components, presentation only
    App.jsx               #   picks the screen for the current phase, board toggle
    components/           #   Screen, PrivateGate (anti-peek), PolicyCard, Board
    screens/              #   one screen per game phase
    styles.css
tests/simulate.mjs        # Plays thousands of random games on the model
```

- **Model**: the only place where rules live. It is a pure reducer, so it is easy to test.
- **Controller**: translates user intents (`nominate`, `castVote`...) into model actions, persists the state,
  and exposes derived read-only data to the views.
- **View**: renders what the controller gives it and never touches game rules directly.

## Getting started

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev        # development server
npm run build      # production build (generates the service worker and manifest)
npm run preview    # serve the production build, test installation and offline mode
npm run simulate   # run 3000 random games against the model
```

To play, host the built `dist/` folder on any static HTTPS host, open it on the phone and use
*Add to Home Screen*.

## Disclaimer

Provided as is, without any warranty. Educational and recreational use only; no commercial use.
