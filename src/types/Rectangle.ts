import Shape, { Point } from "./Shape";

class Rectangle implements Shape {
  private L: number;
  private h: number;
  position: Point;

  constructor(position: Point, width: number = 75, height: number = 20){
    this.L = width;
    this.h = height;
    this.position = {
      x: position.x - (this.L/2),
      y: position.y - (this.h/2)
    }
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillRect(this.position.x, this.position.y, this.L, this.h)
    ctx.closePath();
    ctx.stroke();
  }

  getArea(): number | null { 
    return this.L * this.h;
  }
};

export default Rectangle;
