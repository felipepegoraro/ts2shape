class Complex {
  constructor(public readonly R: number, public readonly I: number) {}

  add(exp: Complex): Complex {
    return new Complex(this.R + exp.R, this.I + exp.I);
  }

  sub(exp: Complex): Complex {
    return new Complex(this.R - exp.R, this.I - exp.I);
  }

  mul(exp: Complex): Complex {
    return new Complex(this.R * exp.R - this.I * exp.I, this.R * exp.I + this.I * exp.R);
  }

  div(exp: Complex): Complex {
    const deno = (exp.R  * exp.R +  exp.I * exp.I);
    const real = (this.R * exp.R + this.I * exp.I) / deno;
    const imag = (this.I * exp.R - this.R * exp.I) / deno;

    return new Complex(real, imag);
  }

  abs(): number {
    return Math.sqrt(this.R * this.R + this.I * this.I);
  }
}

export default Complex;
