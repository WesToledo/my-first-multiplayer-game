function createGame(grid) {
  const state = {
    players: {},
    fruits: {},
    grid: grid,
  };

  function addPlayer(command) {
    const playerId = command.playerId;

    state.players[playerId] = new Snake(
      Math.floor(Math.random() * 11) * 10,
      Math.floor(Math.random() * 11) * 10
    );
  }

  function removePlayer(command) {
    const playerId = command.playerId;
    delete state.players[playerId];
  }

  function movePlayer(command) {
    const playerId = command.playerId;
    const player = state.players[playerId];

    const acceptedMoves = {
      [RIGHT_ARROW]: () => {
        player.x = player.x + state.grid;
      },
      [LEFT_ARROW]: () => {
        player.x = player.x - state.grid;
      },
      [UP_ARROW]: () => {
        player.y = player.y - state.grid;
      },
      [DOWN_ARROW]: () => {
        player.y = player.y + state.grid;
      },
    };

    if (player.size === player.tail.length) {
      for (let i = 0; i < player.size - 1; i++) {
        player.tail[i] = player.tail[i + 1];
      }
    }

    player.tail[player.size - 1] = createVector(player.x, player.y);

    //execute the to move
    acceptedMoves[player.direction]();

    player.x = constrain(player.x, 0, width - state.grid);
    player.y = constrain(player.y, 0, height - state.grid);
  }

  function changePlayerDirection(command) {
    state.players[command.playerId].changeDirection(command.direction);
  }

  function killPlayer(command) {
    const playerId = command.playerId;
    const player = state.players[playerId];

    player.size = 0;
    player.tail = [];
  }

  function checkForCollisions(command) {
    const playerId = command.playerId;
    const player = state.players[playerId];

    // fruit collision
    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];

      if (fruit.x === player.x && fruit.y === player.y) {
        player.size++;
        removeFruit({ fruitId: fruitId });
      }
    }

    // border collision
    if (player.x >= width - state.grid || player.y >= height - state.grid) {
      killPlayer({ playerId: playerId });
    }
  }

  function addFruit(command) {
    const fruitId = command
      ? command.fruitId
      : Math.floor(Math.random() * 100000);

    const fruitX = floor(random(10, width / 10)) * 10;
    const fruitY = floor(random(10, height / 10)) * 10;

    state.fruits[fruitId] = new Fruit(fruitX, fruitY);
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
  }

  function Fruit(x,y) {
    this.x = x;
    this.y = y;

    this.show = function () {
      fill(255, 0, 100);
      rect(this.x, this.y, state.grid, state.grid);
    };
  }

  function Snake(x, y, name) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.direction = RIGHT_ARROW;
    this.size = 0;
    this.tail = [];

    this.changeDirection = function (direction) {
      this.direction = direction;
    };
  }

  // checkForTailCollision() {
  //   for (const playerId in state.players) {
  //     const player = state.players[playerId];

  //     for (const playerTail of state.players) {
  //       for (const tail in playerTail.tail) {
  //         if (player.x === tail.x && player.y === tail.y) {
  //           killPlayer({ playerId: playerId });
  //         }
  //       }
  //     }
  //   }
  // }

  // this.checkForCollision = () {
  //   for (const pos of this.tail) {
  //     if (pos.x == this.x && pos.y == this.y) {
  //       this.size = 0;
  //       this.tail = [];
  //     }
  //   }
  // // };

  return {
    state,
    movePlayer,
    changePlayerDirection,
    addPlayer,
    removePlayer,
    addFruit,
    removeFruit,
    checkForCollisions,
  };
}
