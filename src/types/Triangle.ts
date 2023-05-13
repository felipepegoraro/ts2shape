import Shape, { Point } from './Shape'

type TTri = {
  A: number;
  B: number;
  C: number;
}

class Triangle implements Shape {
  private sides: TTri;
  position: Point;

  constructor(pos: Point, A: number, B: number, C: number){
    this.sides = {A, B, C} as TTri;
    this.position = {
      x: pos.x,
      y: pos.y
    }
  }

  drawFigure(ctx: CanvasRenderingContext2D){
    const [A, B, C] = [this.sides.A, this.sides.B, this.sides.C];

    const angleC  = Math.acos((A * A + B * B - C * C) / (2 * A * B));
    const angleA  = Math.acos((B * B + C * C - A * A) / (2 * B * C));

    const startX  = this.position.x - (A / 2);
    const startY  = this.position.y - ((B * Math.sin(angleC)) / 2);

    const point2X = startX + A;
    const point2Y = startY;

    const point3X = startX + B * Math.cos(angleA);
    const point3Y = startY + B * Math.sin(angleC);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(point2X, point2Y);
    ctx.lineTo(point3X, point3Y);
    ctx.closePath();
    ctx.stroke();
  };

  getArea(): number | null { 
    const [A, B, C] = [this.sides.A, this.sides.B, this.sides.C];
    const p = (A + B + C)/2;
    return Math.sqrt(p * (p - A) * (p - B) * (p - C))
  }
};

export default Triangle;
