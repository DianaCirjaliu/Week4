//select components
const sideBox = document.getElementById('sideBox') as HTMLElement;
const popBtn = document.getElementById('popBtn') as HTMLButtonElement;
const closeBtn = document.getElementById('closeBtn') as HTMLButtonElement;

popBtn.onclick = () => sideBox.classList.add('active');
closeBtn.onclick = () => sideBox.classList.remove('active');


//main image logic
const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
var ctx = canvas.getContext("2d");
const addImg = document.getElementById('addBtn') as HTMLButtonElement;
const clearImg = document.getElementById('clearBtn') as HTMLButtonElement;

const images: string[] = ['./assets/1.png', './assets/2.png', './assets/3.png', './assets/4.png'];

function addRandomImg() {
    const img = new Image();

    const src = images[Math.floor(Math.random()*images.length)] as string;
    img.src=src;

    img.onload =() =>{
        const dwidth = 50;
        const dheight = 50;

        const x = Math.random() * (canvas.width - img.width);
        const y = Math.random() * (canvas.height - img.height);

        ctx?.drawImage(img, x, y, dwidth, dheight);
    };

}


function clearCanvas() {
    ctx?.clearRect(0, 0, canvas.width, canvas.height);
}

addImg.onclick = addRandomImg;
clearImg.onclick = clearCanvas;
