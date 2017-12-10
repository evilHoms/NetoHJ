'use strict';

class Brush {
  constructor(ctx) {
    this.ctx = ctx;
    this.lineWidth = 100;
    this.hue = 0;
    this.saturation = '100%';
    this.lightness = '50%';
    this.isLineWidthIncrease = false;
  }
  
  draw(fromX, fromY, toX, toY, isShifted) {
    const ctx = this.ctx;
    
    ctx.beginPath();
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = this.color();
    ctx.lineCap = `round`;
    ctx.lineJoin = `round`;
    ctx.stroke();
    
    this.changeDrawStyle(isShifted);
  }
  
  changeDrawStyle(isShifted) {
    if (isShifted) {
      if (this.hue > 0) {
        this.hue --;  
      }
    }
    else {
      if (this.hue < 359) {
        this.hue ++;  
      }
    }
    
    if (this.isLineWidthIncrease) {
      this.lineWidth ++;
    }
    else {
      this.lineWidth --;
    }
    
    if (this.lineWidth === 0) {
      this.isLineWidthIncrease = true;
    }
    else if (this.lineWidth === 100) {
      this.isLineWidthIncrease = false
    }
  }
  
  color(h = this.hue, s = this.saturation, l = this.lightness) {
    this.hue = h;
    this.saturation = s;
    this.lightness = l;
    
    return `hsl(${this.hue}, ${this.saturation}, ${this.lightness})`;
  }
}