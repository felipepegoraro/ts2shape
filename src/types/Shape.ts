export type Point = {
  x: number,
  y: number
}

interface Shape {
  drawFigure: (ctx: CanvasRenderingContext2D) => void;
  getArea: () => number | null;
  position: Point;
}

export default Shape;
