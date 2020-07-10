function renderScreen(game) {
  const grid = game.state.grid;

  function showPlayer(player) {
    // render tail
    fill(255);
    for (let i = 0; i < player.tail.length; i++) {
      if (player.tail[i]) {
        const x = player.tail[i].x;
        const y = player.tail[i].y;
        rect(x, y, grid, grid);
      }
    }
    fill(255);
    rect(player.x, player.y, grid, grid);
  }

  var count = 0;
  for (const fruitId in game.state.fruits) {
    const fruit = game.state.fruits[fruitId];
    fruit.show();
    count++;
  }

  console.log("count", count);

  // render players
  for (const playerId in game.state.players) {
    game.movePlayer({ playerId: playerId });
    const player = game.state.players[playerId];
    showPlayer(player);
  }
}
