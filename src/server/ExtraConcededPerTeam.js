const DataModule = require("./DataManage");

/**
 * Retrieves extra runs conceded by teams.
 * @async
 * @method
 * @param {String} year - season
 */
const getExtraRunsConceded = function (year) {
  if (year === undefined) return undefined;
  else {
    DataModule.getDataObject("matches.csv").then((match) => {
      DataModule.getDataObject("deliveries.csv").then((deliveries) => {
        DataModule.writeJsontoFile(
          getExtraRunsConcededCB(match, deliveries, year),
          "ExtraRunsConceded.json"
        );
      });
    });
  }
};

const getExtraRunsConcededCB = function (match, deliveries, year) {
  let extraRunsConceded = {};
  let matchID = match
    .filter((x) => x.season === "" + year)
    .reduce((a, e) => {
      a.push(e.id);
      return a;
    }, []);
  deliveries.map((data) => {
    if (matchID.includes(data.match_id)) {
      if (data.bowling_team in extraRunsConceded)
        extraRunsConceded[data.bowling_team] += +data.extra_runs;
      else extraRunsConceded[data.bowling_team] = +data.extra_runs;
    }
  });
  return extraRunsConceded;
};

module.exports = getExtraRunsConceded;
