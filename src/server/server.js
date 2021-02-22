const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

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
      let matchPlayedDataPath = path.resolve(
        __dirname,
        "../public/output/MatchPlayedperYear.json"
      );
      fs.readFile(matchPlayedDataPath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/json" });
          res.end(data);
        }
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
      let matchwonPath = path.resolve(__dirname, "../client/extraRunConceded.html");
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
      case "/extrarunsconcededData":
      let extraRunsConcededDataPath = path.resolve(__dirname, "../public/output/ExtraRunsConceded.json");
      fs.readFile(extraRunsConcededDataPath, "utf-8", (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(err);
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
      break;
  }
});

server.listen(PORT, (err) => {
  if (err) console.log("Error in Server", err);
  else console.log("Server is ready ");
});
