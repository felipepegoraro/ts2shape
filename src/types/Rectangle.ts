import Shape from "./Shape";

class Rectangle implements Shape {
  private L: number;
  private h: number;

  constructor(width: number = 75, height: number = 20){
    this.L = width;
    this.h = height;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.fillRect(10, 10, this.L, this.h)
    ctx.closePath();
    ctx.stroke();
  }

  getArea(): number | null { 
    return this.L * this.h;
  }
};

export default Rectangle;
