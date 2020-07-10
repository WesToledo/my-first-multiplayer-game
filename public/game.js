function useConstrain(num, min, max) {
  const MIN = min || 0;
  const MAX = max;
  return Math.min(Math.max(num, MIN), MAX);
}

function createGame(grid) {
  const LEFT_ARROW = 37;
  const UP_ARROW = 38;
  const RIGHT_ARROW = 39;
  const DOWN_ARROW = 40;

  const state = {
    players: {},
    fruits: {},
    grid: grid,
    screen: {
      width: 400,
      height: 400,
    },
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

    console.log(player);

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

    if (player.size >= 1) {
      player.tail[player.size - 1] = createVector(player.x, player.y);
    }

    //execute the to move
    acceptedMoves[player.direction]();

    checkForCollisions({ playerId: playerId });

    player.x = useConstrain(player.x, 0, state.screen.width - state.grid);
    player.y = useConstrain(player.y, 0, state.screen.height - state.grid);

    console.log(player.x, player.y);
  }

  function changePlayerDirection(command) {
    state.players[command.playerId].changeDirection(command.direction);
  }

  function killPlayer(command) {
    const playerId = command.playerId;

    state.players[playerId].size = 0;
    state.players[playerId].tail = [];
  }

  function checkForCollisions(command) {
    const playerId = command.playerId;
    const player = state.players[playerId];

    // fruit collision
    for (const fruitId in state.fruits) {
      const fruit = state.fruits[fruitId];

      if (fruit.x === player.x && fruit.y === player.y) {
        player.size++;
        console.log(`Player ${playerId} colide to fruit`);
        removeFruit({ fruitId: fruitId });
      }
    }

    // border collision
    if (
      player.x >= state.screen.width ||
      player.y >= state.screen.height ||
      player.x < 0 ||
      player.y < 0
    ) {
      console.log("Border Collision");
      killPlayer({ playerId: playerId });
    }
  }

  function addFruit(command) {
    const fruitId = command
      ? command.fruitId
      : Math.floor(Math.random() * 1000000);

    const fruitX = useConstrain(
      Math.floor(Math.random() * (state.screen.width / 10)) * 10,
      0,
      state.screen.width - state.grid
    );
    const fruitY = useConstrain(
      Math.floor(Math.random() * (state.screen.height / 10)) * 10,
      0,
      state.screen.height - state.grid
    );

    state.fruits[fruitId] = new Fruit(fruitX, fruitY);
  }

  function removeFruit(command) {
    const fruitId = command.fruitId;
    delete state.fruits[fruitId];
  }

  function Fruit(x, y) {
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

module.exports = createGame;
