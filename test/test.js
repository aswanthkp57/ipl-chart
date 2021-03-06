const getMatchPlayed = require("../src/server/MatchPlayedPerYear");
const getNumberOfMatchWon = require("../src/server/MatchWonPerYear");
const getExtraRunsConceded = require("../src/server/ExtraConcededPerTeam");
const getTopEconomy = require("../src/server/TopEconomicalBowler")

getMatchPlayed();
getNumberOfMatchWon();
getExtraRunsConceded(2016);
getTopEconomy(2015,10);
