import './style.css'

import TCanvas from './types/TCanvas';
import Circle from './types/Circle'
import Mandelbrot from './types/Mandelbrot'
import Triangle from './types/Triangle';
import Rectangle from './types/Rectangle';

type EasyShapes =
  | { kind: "circle"; shape: Circle}
  | { kind: "triangle"; shape: Triangle }
  | { kind: "rectangle"; shape: Rectangle }
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
    if (!canvas) throw  new Error("canvas not found");
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
    // this.context.ctx.beginPath();

    switch (this.figure.kind) {
      case "circle": this.figure.shape = new Circle(65); break;
      case "triangle": this.figure.shape = new Triangle(75, 75, 75); break;
      case "rectangle": this.figure.shape = new Rectangle(75, 10); break;
      case "mandelbrot": this.figure.shape = new Mandelbrot(this.context.width, 75); break;
      default: break;
    }

    this.fillShape(true, color);
    this.context.ctx.clearRect(0, 0, this.context.width, this.context.width);
    this.figure.shape.drawFigure(this.context.ctx);
    this.context.ctx.closePath();
  }

  handleClick(canvas: HTMLCanvasElement, event: MouseEvent): void {
    if (this.figure.kind == "mandelbrot"){
      const zoom_level = 2;
      const rect = canvas.getBoundingClientRect();
      const x = event.offsetX - rect.left;
      const y = event.offsetY - rect.top;
      this.figure.shape.updateZoomByClick(canvas.width, canvas.height, zoom_level, {x: x, y: y});
      if (this.context.ctx) this.figure.shape.drawFigure(this.context.ctx);
    }
  }
}

const run = new Main();
const canvas = run.getCanvas("app-canvas")
canvas.addEventListener('click', (event) => {
  run.handleClick(canvas, event);
});

const shape = document.getElementById("select-shape")! as HTMLSelectElement;
const colorSelect = document.getElementById("select-color")! as HTMLSelectElement;

colorSelect.addEventListener("change", (_: any) => {
  console.log("Selected option:", colorSelect.value);
  run.draw(colorSelect.value)
});

shape.addEventListener("change", (_: any) => {
  const selectedOption = shape.value  as PossShape;
  console.log("Selected option:", selectedOption);
  run.updateFigureType(selectedOption);
  run.draw(colorSelect.value);
});

console.log("OK")
run.draw(colorSelect.value);
