import Shape, { Point } from "./Shape";

class Rectangle implements Shape {
  private L: number;
  private h: number;
  position: Point;

  constructor(width: number = 75, height: number = 20){
    this.L = width;
    this.h = height;
    this.position = {x: 0, y: 0};
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillRect(0, 0, this.L, this.h)
    ctx.closePath();
    ctx.stroke();
  }

  getArea(): number | null { 
    return this.L * this.h;
  }
};

export default Rectangle;
