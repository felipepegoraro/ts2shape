import Shape, { Point } from "./Shape";

class Circle implements Shape {
  private readonly radius: number;
  position: Point;

  constructor(position: { x: number, y: number }, radius: number){
    this.radius = radius;
    this.position = position;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.stroke();
  }

  getArea(): number | null { 
    return Math.pow(this.radius, 2)*Math.PI;
  }
};

export default Circle;
