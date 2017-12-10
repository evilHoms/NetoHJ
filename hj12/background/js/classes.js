'use strict';

class MovingObject {
  constructor(ctx, pos, timeFunction) {
    this._ctx = ctx;
    this._startPos = {
      x: pos.x,
      y: pos.y
    };
    this._pos = pos;
    this._size = this.randomSize;
    this._lineWidth = this.size * 5;
    this.timeFunction = timeFunction;
  }
  
  pos(x = this._pos.x, y = this._pos.y) {
    this._pos.x = x;
    this._pos.y = y;
    return this._pos;
  }
  
  draw() {
    const ctx = this.ctx;
  }
  
  update() {
    const newPos = this.timeFunction(this.startPos.x, this.startPos.y, Date.now());
    this.pos(newPos.x, newPos.y);
    this.draw();
  }
  
  get startPos() {
    return this._startPos;}
  
  get ctx() {
    return this._ctx;}
  
  get size() {
    return this._size;}
  
  get randomSize() {
    return Math.random() * 0.5 + 0.1;}
  
  get lineWidth() {
    return this._lineWidth;}
  
  get color() {
    return `#fff`;
  }
}

class Cross extends MovingObject {
  constructor(ctx, pos, timeFunction) {
    super(ctx, pos, timeFunction);
    this.spinSpeed = getRandomInRange(-0.2, 0.2);
    this.angle = getRandomInRange(0, 360);
  }
  
  draw() {
    super.draw();
    const pos = super.pos();
    
    ctx.beginPath();
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate(Math.PI / 180 * this.angle);
    ctx.translate(-pos.x, -pos.y);
    ctx.moveTo(pos.x + 10 * super.size, pos.y + 10 * super.size);
    ctx.lineTo(pos.x - 10 * super.size, pos.y - 10 * super.size);
    ctx.moveTo(pos.x + 10 * super.size, pos.y - 10 * super.size);
    ctx.lineTo(pos.x - 10 * super.size, pos.y + 10 * super.size);
    ctx.lineWidth = super.lineWidth;
    ctx.restore();
    ctx.stroke();
    
    this.spin();
  }
  
  spin() {
    this.angle += this.spinSpeed;
    if (this.angle < 0) {
      this.angle = 360;
    }
    else if (this.angle > 360) {
      this.angle = 0;
    }
  }
}

class Round extends MovingObject {
  constructor(ctx, pos, timeFunction) {
    super(ctx, pos, timeFunction);
  }
  
  draw() {
    super.draw();
    const pos = super.pos();
    
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, super.size * 12, 0, 2 * Math.PI);
    ctx.lineWidth = super.lineWidth;
    ctx.strokeStyle = super.color;
    ctx.stroke();
  }
}