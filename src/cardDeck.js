/** @module CardDeck */

const cc = require("node-console-colors");

/** set of taken cards */
const takenCards = new Set();

/**
 * getting new card
 * @returns {string} Code of card (Exapmple: 'SA' - ace of spades)
 */
const getNewCard = () => {
  const cards = [2,3,4,5,6,7,8,9,10,'J','Q','K',"A"];
  const cardSuits = ['S', 'C', 'D', 'H']; // ['spades', 'clubs', 'diamonds', 'hearts']
  let newCard = null;
  while ( !newCard || takenCards.has(newCard) ) newCard = `${cardSuits[Math.floor(Math.random() * 4)]}${cards[Math.floor(Math.random() * 13)]}`;
  takenCards.add(newCard);
  return newCard;
}

/**
 * Determination of card weight
 * @param {string} card - Code of card
 * @returns {number} - card weight
 */
const getCardWeight = card => {
  const jqka = {'J': 2, 'Q': 3, 'K': 4, 'A': 11};
  const cardWeight = card.slice(1);
  return !isNaN(cardWeight) ? +cardWeight : jqka[cardWeight];
}

/**
 * Getting sum of player cards
 * @param {Array} player - Array of player card
 * @returns {number} - sum of player cards
 */
const getCardSum = player => player.reduce((sum, cur) => sum = sum + getCardWeight(cur), 0)

/**
 * Detection that a player has too many cards
 * @param {Array} player - Array of player card
 * @returns {bulean} - ('true' - too much)
 */
const bust = player => getCardSum(player) > 21

/**
 * Show player cards
 * @param {Array} player - Array of player card 
 */
const showCards = player => { 
  const color = {'S': 'fg_black', 'C': 'fg_black', 'D': 'fg_red', 'H': 'fg_red'};
  const simbol = {'S': '♠', 'C': '♣', 'D': '♦', 'H': '♥'};
  const cardSet = player.reduce((res, item) => res = `${res} ${cc.set(color[item[0]], "bg_dark_cyan", ' '+simbol[item[0]]+item.slice(1)+' ')}`, '');
  const cardBody = player.reduce((res, item) => res = `${res} ${cc.set("fg_dark_cyan", "bg_dark_cyan", +item.slice(1)===10?'     ':'    ')}`, '');
  console.log(cardBody);
  console.log(cardSet);
  console.log(cardBody);
}

module.exports = {getNewCard, getCardSum, bust, showCards}