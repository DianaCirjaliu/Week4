//select components
const sideBox = document.getElementById('sideBox') as HTMLElement;
const popBtn = document.getElementById('popBtn') as HTMLButtonElement;
const closeBtn = document.getElementById('closeBtn') as HTMLButtonElement;

popBtn.onclick = () => sideBox.classList.add('active');
closeBtn.onclick = () => sideBox.classList.remove('active');


//main image logic
const addImg = document.getElementById('addBtn') as HTMLButtonElement;
const clearImg = document.getElementById('clearBtn') as HTMLButtonElement;
const main = document.querySelector('main') as HTMLElement;
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

const images: string[] = ['./assets/1.png', './assets/2.png', './assets/3.png', './assets/4.png'];

interface Img {
    src:string,
    x:number,
    y:number
};

let savedImg: Img[] = [];

function initCanvas(){
    if(main && canvas)
    {
        canvas.width = main.clientWidth;
        canvas.height = main.clientHeight;
    }
}

function drawImg(src:string, x:number, y:number){
    const img = new Image();
    img.src = images[Math.floor(Math.random()*images.length)]!;
    img.onload = () => {
         ctx?.drawImage(img, x, y, 100, 100);
    }
}


function addRandomImg() {
    const random = images[Math.floor(Math.random()*images.length)]!;

    const x = Math.random() * (canvas.width - 100);
    const y = Math.random() * (canvas.height - 100);

    const newImg = {src: random, x:x, y:y};
    savedImg.push(newImg);

    localStorage.setItem('savedImg', JSON.stringify(savedImg));
    drawImg(newImg.src!, newImg.x, newImg.y);

}

window.addEventListener('load', () => {
    initCanvas();
    const data = localStorage.getItem('savedImg');
    if(data){
        savedImg = JSON.parse(data);
        savedImg.forEach(img => drawImg(img.src,img.x, img.y));
    }
})

addImg.onclick = addRandomImg;

function clearCanvas() {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
    savedImg =[];
    localStorage.removeItem('savedImg');
}

addImg.onclick = addRandomImg;
clearImg.onclick = clearCanvas;