import { setupUI } from "./ui-logic";
import { CanvasApp } from "./canvas-logic";

const app = new CanvasApp();
setupUI();

const addImg = document.getElementById("addBtn") as HTMLButtonElement;
const clearImg = document.getElementById("clearBtn") as HTMLButtonElement;

addImg.onclick = app.addRandomImg;
clearImg.onclick = app.clearCanvas;

const leftBtn = document.getElementById("leftBtn") as HTMLButtonElement;
const rightBtn = document.getElementById("rightBtn") as HTMLButtonElement;
const upBtn = document.getElementById("upBtn") as HTMLButtonElement;
const downBtn = document.getElementById("downBtn") as HTMLButtonElement;

leftBtn.addEventListener("click", () => app.moveImg(-10, 0));
rightBtn.addEventListener("click", () => app.moveImg(10, 0));
upBtn.addEventListener("click", () => app.moveImg(0, -10));
downBtn.addEventListener("click", () => app.moveImg(0, 10));
