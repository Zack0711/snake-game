import Block from './block'

class Snake {
  constructor() {
    this.segments = [
      new Block(7, 5),
      new Block(6, 5),
      new Block(5, 5),
    ];
    this.nextSegement;
  };

  draw(ctx) {
    for( const segment of this.segments ){
      segment.drawSquare(ctx, 'Blue');
    }
  };

  generateNextSegement(colIncrease, rowIncrease) {
    const head = this.segments[0];
    this.nextSegement = new Block(head.col + colIncrease, head.row + rowIncrease);
  }

  move() {
    this.segments.unshift(this.nextSegement);
    this.segments.pop();
  };

  growAndMove() {
    this.segments.unshift(this.nextSegement);
  }
}

export default Snake;