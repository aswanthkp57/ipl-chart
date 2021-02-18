const DataModule = require("./DataManage");

/**
 * Retrieves match played per year.
 * @async
 * @method
 */

const getMatchPlayed = function () {
  DataModule.getDataObject("matches.csv").then((data) => {
    DataModule.writeJsontoFile(
      getMatchPlayedCB(data),
      "MatchPlayedperYear.json"
    );
  });
};

function getMatchPlayedCB(data) {
  let matchPlayed = {};
  data.map((match) => {
    if (match.season in matchPlayed) {
      matchPlayed[match.season] += 1;
    } else {
      matchPlayed[match.season] = 1;
    }
  });
  return matchPlayed;
}

module.exports = getMatchPlayed;
