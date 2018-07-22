import {
  drawCircle,
} from './utilities'

class Block {
  constructor(col, row, blockSize = 10) {
    this.col = col;
    this.row = row; 
    this.blockSize = blockSize   
  }

  drawSquare(ctx, color) {
    const x = this.col * this.blockSize;
    const y = this.row * this.blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, this.blockSize, this.blockSize);
  }

  drawFilledCircle(ctx, color) {
    const blockSize = this.blockSize
    const centerX = this.col * blockSize + blockSize / 2;
    const centerY = this.row * blockSize + blockSize / 2;
    drawCircle(ctx, centerX, centerY, blockSize/2, color);
  }

  equal(otherBlock) {
    return this.col === otherBlock.col && this.row === otherBlock.row;
  }
}

export default Block;