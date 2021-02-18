const DataModule = require("./DataManage");

/**
 * Retrieves top economical bowler.
 * @method
 * @param {String} year - season
 * @param {Number} rank - number of top bowlers.
 * @returns {undefined} When parameters are not given.
 */

const getTopEconomy = function (year, rank = 10) {
  if (year === undefined) return undefined;
  else {
    DataModule.getDataObject("matches.csv").then((match) => {
      DataModule.getDataObject("deliveries.csv").then((deliveries) => {
        DataModule.writeJsontoFile(
          getTopEconomyCB(match, deliveries, year, rank),
          "TopEconomy.json"
        );
      });
    });
  }
};

const getTopEconomyCB = function (match, deliveries, year, rank) {
  let runsConcededByBowler = [];
  let matchID = match
    .filter((x) => x.season === "" + year)
    .reduce((a, e) => {
      a.push(e.id);
      return a;
    }, []);
  deliveries.map((data) => {
    if (matchID.includes(data.match_id)) {
      if (runsConcededByBowler[data.bowler]) {
        runsConcededByBowler[data.bowler].runs += +data.total_runs;
        runsConcededByBowler[data.bowler].over += +data.over;
      } else {
        runsConcededByBowler[data.bowler] = {};
        runsConcededByBowler[data.bowler].runs = +data.total_runs;
        runsConcededByBowler[data.bowler].over = +data.over;
      }
    }
  });
  const economicArray = [];
  for (key in runsConcededByBowler) {
    let economic =
      runsConcededByBowler[key].runs / runsConcededByBowler[key].over;
    economicArray.push({
      bowler: key,
      economic: economic,
    });
  }
  let result = economicArray
    .sort((a, b) => (a.economic > b.economic ? -1 : 1))
    .slice(0, rank);
  return result;
};

module.exports = getTopEconomy;
