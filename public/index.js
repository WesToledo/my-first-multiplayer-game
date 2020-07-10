var game;
var arrowListener;

function setup() {
  createCanvas(400, 400);
  frameRate(8);

  game = createGame(10);

  game.addPlayer({ playerId: "wesley" });

  arrowListener = createArrowListener();
  arrowListener.registerPlayerId("wesley");
  arrowListener.subscribe(game.changePlayerDirection);

  setInterval(game.addFruit, 3000);
}

function draw() {
  background(51);
  renderScreen(game);

  // snake.update();
  // snake.checkForFruitCollision();
  // snake.checkForCollision();
  // snake.show();
}
