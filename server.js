const express = require("express");
const http = require("http");

const createGame = require("./public/game.js");

const app = express();
const server = http.createServer(app);

app.use(express.static("public"));

game = createGame(10);

game.addPlayer({ playerId: "wesley" });

console.log(game.state)

server.listen(3000, () => {
  console.log("Server running on port: 3000");
});
