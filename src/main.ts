import TCanvas from './types/TCanvas';
import Circle from './types/Circle'
import Mandelbrot from './types/Mandelbrot'
import Triangle from './types/Triangle';
import Rectangle from './types/Rectangle';

type EasyShapes =
  | { kind:     "circle"; shape:     Circle }
  | { kind:   "triangle"; shape:   Triangle }
  | { kind:  "rectangle"; shape:  Rectangle }
  | { kind: "mandelbrot"; shape: Mandelbrot }

type PossShape = EasyShapes['kind'];

class Main {
  private figure: EasyShapes
  private context: TCanvas;

  constructor(){
    this.context = this.getContextWH("app-canvas");

    this.figure = {
      kind: "circle",
      shape: new Circle(75)
    }
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
      case "mandelbrot": this.figure.shape = new Mandelbrot(this.context.width, 300); break;
      case "circle":     this.figure.shape = new Circle(65);                          break;
      case "triangle":   this.figure.shape = new Triangle(75, 75, 75);                break;
      case "rectangle":  this.figure.shape = new Rectangle(75, 10);                   break;
      default: break;
    }

    this.context.ctx.clearRect(0, 0, this.context.width, this.context.height);
    requestAnimationFrame(() => {
      this.figure.shape.drawFigure(this.context.ctx);
      if (this.figure.kind !== "mandelbrot"){
        this.fillShape(true, color);
      }
    });
  }

  handleClick(canvas: HTMLCanvasElement, event: MouseEvent): void {
    if (this.figure.kind == "mandelbrot"){
      const zoomFactor = 1.5;
      const rect = canvas.getBoundingClientRect();
      const [x, y] = [event.clientX - rect.left, event.clientY - rect.top];
      const [w, h] = [canvas.width, canvas.height];
      this.figure.shape.updateZoomByClick(w, h, zoomFactor, { x, y });
      this.figure.shape.drawFigure(this.context.ctx);
    }
  }
}

export type { PossShape };
export default Main;
