const http = require("http");
const fs = require("fs");
const path = require("path");
const dataModel = require("../database/dataModel");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  switch (req.url) {
    case "/":
      let htmlPagePath = path.resolve(__dirname, "../client/index.html");
      fs.readFile(htmlPagePath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
      break;

    case "/matchplayed":
      dataModel
        .getMatchPlayedPerYear()
        .then((data) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        })
        .catch((err) => {
          console.log(err);
          res.writeHead(404);
          res.end(JSON.stringify(err));
        });

      break;

    case "/plot.js":
      let plotJSPath = path.resolve(__dirname, "../client/plot.js");
      fs.readFile(plotJSPath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/javascript" });
          res.end(data);
        }
      });
      break;

    case "/extraruns":
      let extrarunsPath = path.resolve(
        __dirname,
        "../client/extraRunConceded.html"
      );
      fs.readFile(extrarunsPath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
      break;

    case "/extrarunsconcededData":
      dataModel
        .getExtraRunsConceded()
        .then((data) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        })
        .catch((err) => {
          console.log(err);
          res.writeHead(404);
          res.end(JSON.stringify(err));
        });
      break;

    case "/topeconomic":
      let topeconomicPath = path.resolve(
        __dirname,
        "../client/topEconomicalBowler.html"
      );
      fs.readFile(topeconomicPath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
      break;

    case "/topeconomicData":
      dataModel
        .getTopEconomy()
        .then((data) => {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        })
        .catch((err) => {
          console.log(err);
          res.writeHead(404);
          res.end(JSON.stringify(err));
        });

      break;

    case "/matchwon":
      let matchwonPath = path.resolve(
        __dirname,
        "../client/matchWonPerTeam.html"
      );
      fs.readFile(matchwonPath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
      break;

    case "/matchwonData":
      dataModel
        .getMatchWonPerYear()
        .then((data) => {
          res.writeHead(200, {
            "content-type": "application/json",
          });
          res.end(data);
        })
        .catch((err) => {
          res.writeHead(404);
          res.end(JSON.stringify(err));
        });
      break;
  }
});

server.listen(PORT, (err) => {
  if (err) console.log("Error in Server", err);
  else console.log("Server is ready ");
});
