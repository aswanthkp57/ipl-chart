const getConnection = require("./database");

let matchPlayedArray = [];
let matchWonObject = {};
let extraRunsArray = [];
let topEconomyArray = [];

function getMatchPlayedPerYear() {
  return new Promise((resolve, reject) => {
    let connection = getConnection();
    connection.connect((err) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      let query =
        "select season,count(*) as matches from matches group by season order by season ;";
      connection.query(query, (err, result) => {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          result.forEach((obj) => {
            matchPlayedArray.push([obj.season, obj.matches]);
          });
          connection.end();
          resolve(JSON.stringify(matchPlayedArray));
        }
      });
    });
  });
}

function getMatchWonPerYear() {
  return new Promise((resolve, reject) => {
    let connection = getConnection();
    connection.connect((err) => {
      if (err) reject(err);
      else {
        let query =
          "select season,winner,count(winner) as matches from matches group by season,winner order by season";
        connection.query(query, (err, result) => {
          if (err) reject(err);
          else {
            result.forEach((ele) => {
              if (ele.season in matchWonObject) {
                matchWonObject[ele.season][ele.winner] = ele.matches;
              } else {
                matchWonObject[ele.season] = { [ele.winner]: ele.matches };
              }
            });
          }
          connection.end();
          resolve(JSON.stringify(matchWonObject));
        });
      }
    });
  });
}

function getExtraRunsConceded() {
  return new Promise((resolve, reject) => {
    let connection = getConnection();
    connection.connect((err) => {
      if (err) reject(err);
      else {
        let query =
          "select bowling_team as team,sum(extra_runs ) as extraruns from deliveries join matches on deliveries.match_id=matches.id where season=2016 group by bowling_team order by sum(extra_runs) desc";
        connection.query(query, (err, result) => {
          if (err) reject(err);
          else {
            result.forEach((ele) => {
              extraRunsArray.push([ele.team, ele.extraruns]);
            });
            console.log(extraRunsArray);
            connection.end();
          }
          resolve(JSON.stringify(extraRunsArray));
        });
      }
    });
  });
}

function getTopEconomy() {
  return new Promise((resolve, reject) => {
    let connection = getConnection();
    connection.connect((err) => {
      if (err) reject(err);
      else {
        let query =
          "select bowler, (sum(total_runs)/(count(*)/6)) as economy from deliveries  join matches on deliveries.match_id=matches.id where season = 2015 group by bowler order by (sum(total_runs)/(count(*)/6)) desc limit 10";
        connection.query(query, (err, result) => {
          if (err) reject(err);
          else {
            result.forEach((ele) => {
              topEconomyArray.push([ele.bowler, ele.economy]);
            });
            console.log(topEconomyArray);
            connection.end();
          }
          resolve(JSON.stringify(topEconomyArray));
        });
      }
    });
  });
}

module.exports = {
  getMatchPlayedPerYear,
  getMatchWonPerYear,
  getExtraRunsConceded,
  getTopEconomy,
};
