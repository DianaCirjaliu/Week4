//select components
const sideBox = document.getElementById("sideBox") as HTMLElement;
const popBtn = document.getElementById("popBtn") as HTMLButtonElement;
const closeBtn = document.getElementById("closeBtn") as HTMLButtonElement;
const default_size = 100;

popBtn.onclick = () => sideBox.classList.add("active");
closeBtn.onclick = () => sideBox.classList.remove("active");

//main image logic
const addImg = document.getElementById("addBtn") as HTMLButtonElement;
const clearImg = document.getElementById("clearBtn") as HTMLButtonElement;
const main = document.querySelector("main") as HTMLElement;
const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
let contor = 0;

const images: string[] = [
  "./assets/1.png",
  "./assets/2.png",
  "./assets/3.png",
  "./assets/4.png",
];

interface Img {
  src: string;
  x: number;
  y: number;
  selected: boolean;
  poz: number;
}

let savedImg: Img[] = [];

function initCanvas() {
  if (main && canvas) {
    canvas.width = main.clientWidth;
    canvas.height = main.clientHeight;
  }
}

function drawImg(src: string, x: number, y: number) {
  if(!ctx) return;
  const img = new Image();
  img.src = src;
  img.onload = () => {
    ctx?.drawImage(img, x, y, default_size, default_size);
  };
}

function render(){
  if(!ctx) return;
  ctx?.clearRect(0,0, canvas.width, canvas.height);
  savedImg.forEach(img => {
    drawImg(img.src, img.x, img.y);
    if(img.selected){
      ctx.strokeStyle = "pink";
      ctx?.strokeRect(img.x, img.y, default_size, default_size);
    }});

  
}

function addRandomImg() {
  const random = images[Math.floor(Math.random() * images.length)]!;

  const x = Math.random() * (canvas.width - default_size);
  const y = Math.random() * (canvas.height - default_size);

  const newImg = { src: random, x: x, y: y, selected: false, poz: contor };
  savedImg.push(newImg);
  contor++;

  localStorage.setItem("savedImg", JSON.stringify(savedImg));
  drawImg(newImg.src!, newImg.x, newImg.y);
}

window.addEventListener("load", () => {
  initCanvas();
  const data = localStorage.getItem("savedImg");
  if (data) {
    savedImg = JSON.parse(data);
    savedImg.forEach((img) => drawImg(img.src, img.x, img.y));
  }
});

addImg.onclick = addRandomImg;

function clearCanvas() {
  ctx?.clearRect(0, 0, canvas.width, canvas.height);
  savedImg = [];
  localStorage.removeItem("savedImg");
  contor = 0;
}

addImg.onclick = addRandomImg;
clearImg.onclick = clearCanvas;

//info window logic
const scrollEl = document.getElementById("scrollPos") as HTMLElement;
const dimensionEl = document.getElementById("innerDim") as HTMLElement;

function updateState() {
  const scrollX = Math.round(window.scrollX);
  const scrollY = Math.round(window.scrollY);

  const width = window.innerWidth;
  const height = window.innerHeight;

  if (scrollEl) {
    scrollEl.innerText = `X: ${scrollX}, Y:${scrollY}`;
  }

  if (dimensionEl) {
    dimensionEl.innerText = `${width}px x ${height}px`;
  }
}

window.addEventListener("scroll", updateState);
window.addEventListener("resize", updateState);

updateState();

//move objects logic

const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");
const upBtn = document.getElementById("upBtn");
const downBtn = document.getElementById("downBtn");

function selectImg(mouseX: number, mouseY: number) {
  //reset all the selection before
  savedImg.forEach((img) => (img.selected = false));

  for (let i = savedImg.length - 1; i >= 0; i--) {
    const img = savedImg[i];
    if (img) {
      if (
        mouseX >= img?.x &&
        mouseX <= img?.x + default_size &&
        mouseY >= img.y &&
        mouseY <= img.y + default_size
      ) {
        img.selected = true;
        render();
        console.log(`${i}`);
        break;
      }
    }
  }
}

canvas.addEventListener("click", (e: MouseEvent) => {
  const x = e.offsetX;
  const y = e.offsetY;
  selectImg(x, y);
});

function moveImg(dx: number, dy: number) {

  let img: Img | undefined;

  for (let i = 0; i < savedImg.length; i++){
    if(savedImg[i]?.selected === true){
      img = savedImg[i];

    }
  }
  if (img) {
    img.x += dx;
    img.y += dy;
    render();
  }

}


leftBtn?.addEventListener('click',() => moveImg(-10,0));
rightBtn?.addEventListener('click', () => moveImg(10,0));
upBtn?.addEventListener('click', () => moveImg(0,-10));
downBtn?.addEventListener('click', () => moveImg(0,10));
