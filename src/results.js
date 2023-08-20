const stat = require("./stat");
const { getCardSum, bust, showCards } = require("./cardDeck")

const showResults = (winer, casino, player) => {
  console.log('\n');
  switch ( winer ) {
    case 'casino': 
      console.log(`Casino winner`);
      stat('casino'); break;
    case 'player':
      console.log(`You are a winner`);
      stat('player'); break;
    case 'bust player':
      console.log(`\nYou have too much. Casino winner`);
      stat('player'); break;
    case 'bust casino':
      console.log(`\nOverkill at the casino. You are a winner`);
      stat('player'); break;
    case 'draw': console.log(`Draw`);                
  } 

  console.log(`You: ${getCardSum(player)}:`);
  showCards(player)
  console.log(`Casino: ${getCardSum(casino)}:`);
  showCards(casino)
}


const getWinner = (action, casino, player) => {
  let winer = null;
  let bst = false;
  const casinoRate = getCardSum(casino);
  const playerRate = getCardSum(player);
  
  if ( bust(player) ) { 
    winer = 'bust player';
    bst = true;
  }
  if ( bust(casino) ) {
    winer = 'bust casino';
    bst = true;
  }
  if ( !bst && action === 'stop' ) {
    if ( casinoRate > playerRate ) winer = 'casimo'
    if ( casinoRate < playerRate ) winer = 'player'  
    if ( casinoRate === playerRate ) winer = 'draw'    
  }
  if ( winer ) showResults(winer, casino, player);
  return winer;
}

module.exports = getWinner