const getConnection = require("./database");

let matchPlayedArray = [];

function getMatchPlayedPerYear(cb) {
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

module.exports = { getMatchPlayedPerYear };
