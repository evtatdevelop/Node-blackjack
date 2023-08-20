const {getNewCard, getCardSum, bust} = require("./cardDeck");
const getWinner = require("./results")

let csinoInDeal = true;

const casinoStep = casino => {
  csinoInDeal = csinoInDeal ? 21 >= getCardSum(casino) + Math.floor(Math.random() * 7) : csinoInDeal;
  return csinoInDeal;
}

const casinoDeal = (casino, player) => {
  while ( casinoStep(casino) ) {
    casino.push( getNewCard() );
    getWinner('stop', casino, player);
  }
  return !bust(casino)
}

module.exports = {
  casinoStep,
  casinoDeal
}