/** @module results */

const stat = require("./stat");
const { getCardSum, bust, showCards } = require("./cardDeck")

/**
 * Show results of game
 * @param {string} winer - geme result 
 * @param {Array} casino - casino card set
 * @param {Array} player - player card set
 */
const showResults = (winer, casino, player) => {
  console.log('\n');
  switch ( winer ) {
    case 'casino':  console.log(`Casino winner`);
      stat('casino'); break;
    case 'player': console.log(`You are a winner`);
      stat('player'); break;
    case 'bust player': console.log(`\nYou have too much. Casino winner`);
      stat('casino'); break;
    case 'bust casino': console.log(`\nOverkill at the casino. You are a winner`);
      stat('player'); break;
    case 'draw': console.log(`Draw`);                
  } 
  showEwsult = true;
  console.log(`You: ${getCardSum(player)}:`);
  showCards(player)
  console.log(`Casino: ${getCardSum(casino)}:`);
  showCards(casino)
}

/** flag of showing of result */
let showEwsult = false;

/**
 * Getting of game result
 * @param {string} action - stage of game (stop / more) 
 * @param {Array} casino - casino card set
 * @param {Array} player - player card set
 * @returns {null, string} - geme result
 */
const getWinner = (action, casino, player) => {
  let winer = null;
  let bst = false;

  if ( bust(player) ) { 
    winer = 'bust player';
    bst = true;
  }
  if ( bust(casino) ) {
    winer = 'bust casino';
    bst = true;
  }
  if ( !bst && action === 'stop' ) {
    const casinoRate = getCardSum(casino);
    const playerRate = getCardSum(player);
    if ( casinoRate > playerRate ) winer = 'casino'
    else if ( casinoRate < playerRate ) winer = 'player'  
    else winer = 'draw'    
  }
  if ( winer && !showEwsult ) showResults(winer, casino, player);
  return winer;
}

module.exports = getWinner