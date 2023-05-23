import TCanvas from './types/TCanvas';
import Circle from './types/Circle'
import Mandelbrot from './types/Mandelbrot'
import Triangle from './types/Triangle';
import { Point } from './types/Shape';
import Rectangle from './types/Rectangle';

type EasyShapes =
  | { kind:     "circle"; shape:     Circle }
  | { kind:   "triangle"; shape:   Triangle }
  | { kind:  "rectangle"; shape:  Rectangle }
  | { kind: "mandelbrot"; shape: Mandelbrot }

type PossShape = EasyShapes['kind'];

class Main {
  private figure:   EasyShapes
  private context:  TCanvas;
  private position: Point;

  constructor(){
    this.context = this.getContextWH("app-canvas");

    const [cx, cy] = [this.context.width/2, this.context.height/2]
    this.position = {x: cx, y: cy};

    this.figure = {
      kind: "circle",
      shape: new Circle(this.position, 75)
    }
  }

  canvasUpdateWidth(canvas: HTMLCanvasElement){
    const w = window.innerWidth;
    const perc = 0.4;
    const wperc = w * perc;

    [canvas.width, canvas.height] = (w < 800) ? [300, 300] : [wperc, wperc]

    const [cx, cy] = [canvas.width/2, canvas.height/2]
    this.position = {x: cx, y: cy};
  }

  handlePosition(event: InputEvent, axis: "x" | "y"){
    const invertY = (y: number) => this.context.height - y;
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    this.position[axis] = (axis == "y") 
      ? invertY(value)
      : value;
    console.log(this.position)
  }

  getCanvas(id: string): HTMLCanvasElement | never {
    const canvas = document.getElementById(id)! as HTMLCanvasElement;
    if (!canvas) throw new Error("canvas not found");
    return canvas;
  }

  getContextWH(id: string): TCanvas | never {
    const canvas = this.getCanvas(id);
    const context = canvas.getContext('2d')! as CanvasRenderingContext2D;
    if (!context) throw  new Error("context not found");

    return {
      ctx: context,
      width: canvas.width,
      height: canvas.height
    } as TCanvas;
  }

  fillShape(fill: boolean, color: string): void {
    if (fill) {
      this.context.ctx.fillStyle = color;
      this.context.ctx.fill();
    }
  }

  updateFigureType(new_kind: PossShape): void {
    this.figure.kind = new_kind;
  }

  draw(color: string): void | never {
    if (!this.context.ctx) throw new Error("canvas not found");
    this.context.ctx.clearRect(0, 0,  this.context.width, this.context.height)

    switch (this.figure.kind) {
      case "mandelbrot": this.figure.shape = new Mandelbrot(this.context.ctx.canvas.width, 300); break;
      case     "circle": this.figure.shape = new Circle(this.position, 65);                      break;
      case   "triangle": this.figure.shape = new Triangle(this.position, 85, 85, 85);            break;
      case  "rectangle": this.figure.shape = new Rectangle(this.position, color, 75, 75);        break;
      default: break;
    }

    // this.context.ctx.clearRect(0, 0, this.context.width, this.context.height);
    requestAnimationFrame(() => {
      this.context.ctx.clearRect(0, 0, this.context.width, this.context.height);
      this.figure.shape.drawFigure(this.context.ctx);
      this.fillShape((this.figure.kind !== "mandelbrot"), color);
    });
  }

  handleClick(canvas: HTMLCanvasElement, event: MouseEvent): void {
    if (this.figure.kind === "mandelbrot"){
      const zoomFactor = 1.5;
      const rect = canvas.getBoundingClientRect();
      const [x, y] = [event.clientX - rect.left, event.clientY - rect.top];
      const [w, h] = [canvas.width, canvas.height];
      this.figure.shape.updateZoomByClick(w, h, zoomFactor, { x, y });
      this.figure.shape.drawFigure(this.context.ctx);
    }
  }
}

export type { PossShape, Point };
export default Main;
