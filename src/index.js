import './styles/main.scss';

import Block from './block';
import Snake from './snake';

import {
  drawBorder,
  drawText,
  drawCircle,
} from './utilities'

const gameCanvas = document.getElementById('game-canvas');

class Apple {
  constructor() {
    this.position = new Block(10, 10);
  };

  draw(ctx) {
    this.position.drawFilledCircle(ctx, 'LimeGreen');
  };

  move(x, y) {
    this.position = new Block(x, y);
  }
}

class Direction {
  constructor(label, type, colIncrease, rowIncrease){
    this.label = label;
    this.type = type;
    this.colIncrease = colIncrease;
    this.rowIncrease = rowIncrease;
  }
}

class Game {
  constructor(canvas) {
    this.gameCanvas = canvas;
    this.ctx = gameCanvas.getContext('2d');
    this.canvasWidth = gameCanvas.width;
    this.canvasHeight = gameCanvas.height;

    this.blockSize = 10;
    this.widthInBlocks = this.canvasWidth/this.blockSize;
    this.heightInBlocks = this.canvasHeight/this.blockSize;
    this.score = 0;

    this.snake = new Snake();
    this.apple = new Apple();

    this.intervalId;

    this.directions = {
      37: new Direction('left', 'horizontal', -1, 0),
      38: new Direction('up', 'vertical', 0, -1),
      39: new Direction('right', 'horizontal', 1, 0),
      40: new Direction('down', 'vertical', 0, 1),
    }
    this.nextDirection = this.directions[39];

    this.gameProcess = this.gameProcess.bind(this);
    this.checkWallCollision = this.checkWallCollision.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.moveApple = this.moveApple.bind(this);

  };

  checkWallCollision(segment) {
    return segment.col === 0 || segment.col === this.heightInBlocks -1 || segment.row === 0 || segment.row === this.widthInBlocks -1
  }

  checkSelfCollision(nextSegement, segments) {
    for(const segment of segments){
      if(nextSegement.equal(segment)) return true;
    }
    return false;
  }

  setDirection(newDirection) {
    if(newDirection.type !== this.nextDirection.type) this.nextDirection = newDirection;
  }

  start() {
    this.intervalId = setInterval(this.gameProcess, 100);
  };

  moveApple() {
    const {
      apple,
      widthInBlocks,
      heightInBlocks,
    } = this;

    const randomCol = Math.floor(Math.random() * (widthInBlocks -2)) + 1;
    const randomRow = Math.floor(Math.random() * (heightInBlocks -2)) + 1;
    apple.move(randomCol, randomRow)
  }

  gameOver() {
    const {
      ctx,
      intervalId,
      canvasWidth,
      canvasHeight,
    } = this;

    clearInterval(intervalId);
    drawText(ctx, `Game Over`, canvasWidth/2, canvasHeight/2, '60px Courier', 'Red', 'center', 'middle');    

  }

  gameProcess() {
    const {
      apple,
      blockSize,
      canvasWidth,
      canvasHeight,
      checkWallCollision,
      checkSelfCollision,
      ctx,
      gameOver,
      score,
      snake,
      moveApple,
      nextDirection,
    } = this;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    snake.draw(ctx);
    apple.draw(ctx);
    // draw score
    drawText(ctx, `Score: ${score}`, blockSize, blockSize);    
    drawBorder(ctx, canvasWidth, canvasHeight, 'Grey', blockSize)

    snake.generateNextSegement(nextDirection.colIncrease, nextDirection.rowIncrease);
    if(checkWallCollision(snake.nextSegement) || checkSelfCollision(snake.nextSegement, snake.segments)){
      gameOver();
      return;
    }
    if(snake.nextSegement.equal(apple.position)){
      this.score ++;
      moveApple();
      snake.growAndMove();
    }else{
      snake.move();
    }
  }
}

const snakeGame = new Game(gameCanvas);

document.body.onkeydown = e => {
  const newDirection = snakeGame.directions[e.keyCode];
  if(newDirection) snakeGame.setDirection(newDirection)
}

snakeGame.start();

