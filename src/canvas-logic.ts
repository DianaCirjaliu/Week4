import { Img, DEFAULT_SIZE, IMAGES } from "./constants";

export class CanvasApp {
  private main = document.querySelector("main") as HTMLElement;
  private canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
  private ctx = this.canvas.getContext("2d");

  private savedImg: Img[] = [];
  private contor = 0;

  constructor() {
    this.initCanvas();
    this.loadData();
    window.addEventListener("resize", () => this.initCanvas());
    this.render();
  }

  private initCanvas() {
    if (this.main && this.canvas) {
      this.canvas.width = this.main.clientWidth;
      this.canvas.height = this.main.clientHeight;
    }
  }

  private loadData() {
    const data = localStorage.getItem("savedImg");
    if (data) {
      this.savedImg = JSON.parse(data);
      this.contor = this.savedImg.length;
      this.render();
    }
  }

  private drawImg(src: string, x: number, y: number) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      this.ctx?.drawImage(img, x, y, DEFAULT_SIZE, DEFAULT_SIZE);
    };
  }

  private render() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.savedImg.forEach((img) => {
      this.drawImg(img.src, img.x, img.y);
      if (img.selected && this.ctx) {
        this.ctx.strokeStyle = "pink";
        this.ctx?.strokeRect(img.x, img.y, DEFAULT_SIZE, DEFAULT_SIZE);
      }
    });
  }

  public addRandomImg() {
    const random = IMAGES[Math.floor(Math.random() * IMAGES.length)]!;

    const x = Math.random() * (this.canvas.width - DEFAULT_SIZE);
    const y = Math.random() * (this.canvas.height - DEFAULT_SIZE);

    const newImg = {
      src: random,
      x: x,
      y: y,
      selected: false,
      poz: this.contor,
    };
    this.savedImg.push(newImg);
    this.contor++;

    localStorage.setItem("savedImg", JSON.stringify(this.savedImg));
    this.drawImg(newImg.src!, newImg.x, newImg.y);
  }

  public selectImg(mouseX: number, mouseY: number) {
    this.savedImg.forEach((img) => (img.selected = false));

    for (let i = this.savedImg.length - 1; i >= 0; i--) {
      const img = this.savedImg[i];
      if (img) {
        if (
          mouseX >= img?.x &&
          mouseX <= img?.x + DEFAULT_SIZE &&
          mouseY >= img.y &&
          mouseY <= img.y + DEFAULT_SIZE
        ) {
          img.selected = true;
          this.render();
          console.log(`${i}`);
          break;
        }
      }
    }
  }

  public moveImg(dx: number, dy: number) {
    let img: Img | undefined;

    for (let i = 0; i < this.savedImg.length; i++) {
      if (this.savedImg[i]?.selected === true) {
        img = this.savedImg[i];
      }
    }
    if (img) {
      img.x += dx;
      img.y += dy;
      this.render();
    }
  }

  public clearCanvas() {
    this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.savedImg = [];
    localStorage.removeItem("savedImg");
    this.contor = 0;
  }
}
