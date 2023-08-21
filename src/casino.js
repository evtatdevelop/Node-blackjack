/** @module casino */

const {getNewCard, getCardSum, bust} = require("./cardDeck");
const getWinner = require("./results");

/** flag of casino in game */
let csinoInDeal = true;

/**
 * Casino decides to play or not
 * @param {Array} casino - casino card set
 * @returns {bulean}
 */
const casinoStep = casino => {
  csinoInDeal = csinoInDeal ? 21 >= getCardSum(casino) + Math.floor(Math.random() * 7) : csinoInDeal;
  return csinoInDeal;
}

/**
 * Taking cards by casino when player pass
 * @param {Array} casino - casino card set 
 * @param {Array} player - player card set 
 * @returns {bulean} - the casino has no bust
 */
const casinoDeal = (casino, player) => {
  while ( casinoStep(casino) ) {
    casino.push( getNewCard() );
    getWinner('stop', casino, player);
  }
  return !bust(casino);
}

module.exports = {casinoStep, casinoDeal, }
