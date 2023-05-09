import Shape from "./Shape";

class Circle implements Shape {
  private readonly radius: number;

  constructor(radius: number){
    this.radius = radius;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.radius, this.radius, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.stroke();
  }

  getArea(): number | null { 
    return Math.pow(this.radius, 2)*Math.PI;
  }
};

export default Circle;
