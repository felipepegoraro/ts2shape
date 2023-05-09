import Complex from '../complex'
import Shape from './Shape'

type Point = { x: number, y: number }

class Mendelbrot implements Shape {
  private size: number;
  private iter: number;
  private trans: Point;
  private zoom: Point;

  constructor(canvas_size: number, maxiter: number = 75){
    this.size = canvas_size/2;
    this.iter = maxiter;
    this.trans = {x: -0.5, y: 0} as const;
    this.zoom = {x: this.size, y: -this.size} as const;
    console.log(this.zoom)
  }

  colorConvert(r: number, g: number, b: number): string {
    return `#`+
      `${Math.floor(r * 2.55).toString(16).padStart(2, '0')}` +
      `${Math.floor(g * 2.55).toString(16).padStart(2, '0')}` + 
      `${Math.floor(b * 2.55).toString(16).padStart(2, '0')}` ;
  }

  drawFigure(ctx: CanvasRenderingContext2D): void {
    const canvas_size = this.size*2;
    console.log("render mendel")
    const img  = ctx.createImageData(canvas_size, canvas_size);
    const data = img.data;

    const to_run = Array.from({length: canvas_size}, (_, i) => i);

    to_run.forEach((x: number) => {
      const cx = (x - this.size) / this.zoom.x + this.trans.x;
      to_run.forEach((y: number) => {
        const c = new Complex(cx, (y-this.size)/this.zoom.y+this.trans.y)
        let count = 0;
        let z = new Complex(0, 0);

        while (2 > z.abs() && this.iter > count){
          z = z.mul(z).add(c);
          count++;
        }

        const color = count + 25;
        const hex = 16;
        const colorHex = this.colorConvert(color+20, color-10, color + 40);
        const pixel = (x + y * img.width) * 4;

        data[pixel]     = parseInt(colorHex.substr(1, 2), hex);
        data[pixel + 1] = parseInt(colorHex.substr(3, 2), hex);
        data[pixel + 2] = parseInt(colorHex.substr(5, 2), hex);
        data[pixel + 3] = 255;
      })
    })
    ctx.putImageData(img, 0, 0);
  };

  getArea(): number | null { return null; }

  updateZoomByClick(w: number, h: number, zoom_level: number, dot: Point){
    const cx = (dot.x - w / zoom_level) / this.zoom.x + this.trans.x;
    const cy = (dot.y - h / zoom_level) / this.zoom.y + this.trans.y;

    this.zoom.x *= zoom_level;
    this.zoom.y *= zoom_level;

    this.trans.x = cx - w / zoom_level / this.zoom.x;
    this.trans.y = cy - h / zoom_level / this.zoom.y;
  }
};

export default Mendelbrot;
