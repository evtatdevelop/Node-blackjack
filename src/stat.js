/** @module stat */

const fs = require('fs');

/**
 * Writing stat to file blackJack.json
 * @param {string} winer - game inwer (casino/player)
 * @returns 
 */
const stat = winer => fs.exists('./blackJack.json', exists => {
  if ( exists ) fs.readFile('./blackJack.json', (err, data) => {
    const stat = JSON.parse(data);
    stat[winer]++;  
    fs.writeFile('./blackJack.json', JSON.stringify(stat), (err) => {
      if ( err ) console.error(err);
    })
  })
})

module.exports = stat