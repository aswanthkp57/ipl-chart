const getMatchPlayed = require("../src/server/MatchPlayedPerYear");
const getNumberOfMatchWon = require("../src/server/MatchWonPerYear");
const getExtraRunsConceded = require("../src/server/ExtraConcededPerTeam");

getMatchPlayed();
getNumberOfMatchWon();
getExtraRunsConceded(2016);
