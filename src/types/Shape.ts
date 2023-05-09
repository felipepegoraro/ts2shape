interface Shape {
  drawFigure: (ctx: CanvasRenderingContext2D) => void;
  getArea: () => number | null;
}

export default Shape;
