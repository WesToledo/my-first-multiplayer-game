// executa a cada key pressionada
function keyPressed() {
  arrowListener.handleArrowDown(keyCode);
}

function createArrowListener() {
  const state = {
    observers: [],
    playerId: null,
  };

  function registerPlayerId(playerId) {
    state.playerId = playerId;
  }

  function subscribe(observerFunction) {
    state.observers.push(observerFunction);
  }

  function notifyAll(command) {
    console.log(`Notificando ${state.observers.length} observers`);
    for (const observerFunction of state.observers) {
      observerFunction(command);
    }
  }

  // recebe a key pressionada e se esta for válida
  // notifica os observers
  function handleArrowDown(key) {
    const acceptedKeys = {
      [RIGHT_ARROW]: RIGHT_ARROW,
      [LEFT_ARROW]: LEFT_ARROW,
      [UP_ARROW]: UP_ARROW,
      [DOWN_ARROW]: DOWN_ARROW,
    };

    const keyCodeArrowPressed = acceptedKeys[key];

    if (keyCodeArrowPressed) {
      const command = {
        playerId: state.playerId,
        direction: keyCodeArrowPressed,
      };
      notifyAll(command);
    }
  }

  return { subscribe, handleArrowDown, registerPlayerId };
}
