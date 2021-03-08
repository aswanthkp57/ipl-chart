const getConnection = require("./database");

let matchPlayedArray = [];
let matchWonObject = {};

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

module.exports = { getMatchPlayedPerYear, getMatchWonPerYear };
