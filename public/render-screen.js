function renderScreen(game) {
  const grid = game.state.grid;

  function showPlayer(player){
    // render tail
    fill(255);
    for (let i = 0; i < player.tail.length; i++) {
      rect(player.tail[i].x, player.tail[i].y, grid, grid);
    }
    fill(255);
    rect(player.x, player.y, grid, grid);
  }

  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId];
    fruit.show();
  }

  // render players
  for (const playerId in game.state.players) {
    const player = game.state.players[playerId];
    game.movePlayer({ playerId: playerId });
    game.checkForCollisions({ playerId: playerId });
    showPlayer(player);
  }
}
