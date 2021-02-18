const DataModule = require("./DataManage");

/**
 * Retrieves number of match won per team per year.
 * @method
 */

const getNumberOfMatchWon = function () {
  let matchWonByTeams = {
    NumberOfMatchWonByTeams: [],
  };
  DataModule.getDataObject("matches.csv").then((data) => {
    let result = getNumberOfMatchWonCB(data);
    DataModule.writeJsontoFile(result, "NumberOfMatchWon.json");
  });
};

const getNumberOfMatchWonCB = function (data) {
  let matchWonByTeams = {};
  data.map((match) => {
    const year = match.season;
    const winner = match.winner;

    if (year in matchWonByTeams) {
      if (winner in matchWonByTeams[year]) matchWonByTeams[year][winner] += 1;
      else matchWonByTeams[year][winner] = 1;
    } else matchWonByTeams[year] = { [winner]: 1 };
  });
  return matchWonByTeams;
};

module.exports = getNumberOfMatchWon;
