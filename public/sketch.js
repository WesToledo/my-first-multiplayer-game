let grid = 10;
var snake;
var fruits = [];

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  snake = new Snake();
  fruits.push(new Fruit());
}

function draw() {
  background(51);
  snake.update();
  snake.checkForFruitCollision();
  snake.checkForCollision();
  snake.show();

  for (const index in fruits) {
    fruits[index].show();
  }
}

function keyPressed() {
  snake.arrowListener(keyCode);
}

function mousePressed() {
  snake.size++;
}

function Fruit() {
  this.x = floor(random(10, width / 10)) * 10;
  this.y = floor(random(10, height / 10)) * 10;

  this.show = function () {
    fill(255, 0, 100);
    rect(this.x, this.y, grid, grid);
  };
}

function Snake() {
  this.x = 0;
  this.y = 200;
  this.direction = RIGHT_ARROW;
  this.size = 0;
  this.tail = [];

  this.update = function () {
    const acceptedMoves = {
      [RIGHT_ARROW]: () => {
        this.x = this.x + grid;
      },
      [LEFT_ARROW]: () => {
        this.x = this.x - grid;
      },
      [UP_ARROW]: () => {
        this.y = this.y - grid;
      },
      [DOWN_ARROW]: () => {
        this.y = this.y + grid;
      },
    };

    if (this.size === this.tail.length) {
      for (let i = 0; i < this.size - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.size - 1] = createVector(this.x, this.y);

    //execute the function to move
    acceptedMoves[this.direction]();

    this.x = constrain(this.x, 0, width - grid);
    this.y = constrain(this.y, 0, height - grid);
  };

  this.arrowListener = function (key) {
    const acceptedKeys = {
      [RIGHT_ARROW]: () => {
        this.direction = RIGHT_ARROW;
      },
      [LEFT_ARROW]: () => {
        this.direction = LEFT_ARROW;
      },
      [UP_ARROW]: () => {
        this.direction = UP_ARROW;
      },
      [DOWN_ARROW]: () => {
        this.direction = DOWN_ARROW;
      },
    };
    const keyPressed = acceptedKeys[key];
    if (keyPressed) keyPressed();
  };

  this.show = function () {
    fill(255);

    for (let i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, grid, grid);
    }
    fill(255);
    rect(this.x, this.y, grid, grid);
  };

  this.removeFruit = function (index) {
    delete fruits[index];
  };

  this.addFruit = function () {
    fruits.push(new Fruit());
  };

  this.checkForFruitCollision = function () {
    for (const index in fruits) {
      const fruit = fruits[index];
      if (fruit.x === this.x && fruit.y === this.y) {
        this.size++;
        this.removeFruit(index);
        this.addFruit();
      }
      break;
    }
  };

  this.checkForCollision = function () {
    for (const pos of this.tail) {
      if (pos.x == this.x && pos.y == this.y) {
        this.size = 0;
        this.tail = [];
      }
    }
  };
}
