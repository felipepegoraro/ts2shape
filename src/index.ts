import './style.css'
import Main, { PossShape } from './main';

const run = new Main();
const canvas = run.getCanvas("app-canvas");

canvas.addEventListener('click', (event) => {
  run.handleClick(canvas, event);
});

const shape = document.getElementById("select-shape")! as HTMLSelectElement;
const colorSelect = document.getElementById("select-color")! as HTMLSelectElement;
const posX = document.getElementById('pos-x')! as HTMLInputElement;
const posY = document.getElementById('pos-y')! as HTMLInputElement;

colorSelect.addEventListener("change", (_: any) => {
  console.log("Selected option:", colorSelect.value);
  run.draw(colorSelect.value);
});

shape.addEventListener("change", (_: any) => {
  const selectedOption = shape.value  as PossShape;
  console.log("Selected option:", selectedOption);
  run.updateFigureType(selectedOption);
  run.draw(colorSelect.value);
});


let timeOut = null;
const ms = 550;

posX.addEventListener('input', (event) => {
  timeOut = setTimeout(() => {
    run.handlePosition(event as InputEvent, "x")
    run.draw(colorSelect.value);
  }, ms);
});

posY.addEventListener('input', (event) => {
  timeOut = setTimeout(() => {
    run.handlePosition(event as InputEvent, "y")
    run.draw(colorSelect.value);
  }, ms);
});

run.draw(colorSelect.value);
