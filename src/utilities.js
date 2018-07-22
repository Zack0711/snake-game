const drawBorder = (ctx, width, height, color = 'Grey', borderWidth = 1) => {
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, borderWidth);
  ctx.fillRect(0, height - borderWidth, width, borderWidth);
  ctx.fillRect(0, 0, borderWidth, height);
  ctx.fillRect(width - borderWidth, 0, borderWidth, height);
}

const drawText = (ctx, text,  x = 0, y = 0, fontStyle = '20px Courier', color = 'Black', align = 'left', baseLine = 'top') => {
  ctx.font = fontStyle;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseLine;
  ctx.fillText(text, x, y);
}

const drawCircle = (ctx, x, y, radius, fillColor) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if(fillColor){
    ctx.fillStyle = fillColor;
    ctx.fill();
  }else{
    ctx.stroke();
  }
}

export {
  drawBorder,
  drawText,
  drawCircle,
}