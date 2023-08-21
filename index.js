const readline = require('readline');
const { casinoStep, casinoDeal } = require("./src/casino");
const { getNewCard, showCards } = require("./src/cardDeck");
const getWinner = require("./src/results");

const rl = readline.Interface({
  input: process.stdin,
  output: process.stdout
});

/** casino card set */
const casino = [];
/** player card set */
const player = [];

console.log('let\'s play.. [y/n] ♣ ♠ ♥ ♦');

/** main logic of game */
rl.on('line', line => {
  switch ( line ) {
    case 'y': case 'Y':      
      player.push( getNewCard() );
      showCards(player);
      if ( player.length ) console.log('More..? [y/n]');
      if ( getWinner('more', casino, player) ) {
        rl.close();
        break;
      }
      if ( casinoStep(casino) ) {
        casino.push( getNewCard() );
        if ( getWinner('more', casino, player) ) rl.close();
      }
      break;

    case 'n': case 'N':
      if ( casinoDeal(casino, player) ) getWinner('stop', casino, player);
      rl.close();
      break;

    default: rl.close();
  }
});
