'use strict';

class Star {
  constructor(ctx, size, color, bright, pos) {
    this.ctx = ctx;
    this.size = size;
    this.color = color;
    this.bright = bright;
    this.pos = {
      x: pos.x,
      y: pos.y
    }
  }
  
  draw() {
    const ctx = this.ctx;
    ctx.beginPath()
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.bright;
    ctx.arc(this.pos.x, this.pos.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}