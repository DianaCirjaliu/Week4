//select components
var sideBox = document.getElementById('sideBox');
var popBtn = document.getElementById('popBtn');
var closeBtn = document.getElementById('closeBtn');
popBtn.onclick = function () { return sideBox.classList.add('active'); };
closeBtn.onclick = function () { return sideBox.classList.remove('active'); };
//main image logic
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext("2d");
var addImg = document.getElementById('addBtn');
var clearImg = document.getElementById('clearBtn');
var images = ['./assets/1.png', './assets/2.png', './assets/3.png', './assets/4.png'];
function addRandomImg() {
    var img = new Image();
    var src = images[Math.floor(Math.random() * images.length)];
    img.src = src;
    img.onload = function () {
        var dwidth = 50;
        var dheight = 50;
        var x = Math.random() * (canvas.width - img.width);
        var y = Math.random() * (canvas.height - img.height);
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, x, y, dwidth, dheight);
    };
}
function clearCanvas() {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
}
addImg.onclick = addRandomImg;
clearImg.onclick = clearCanvas;
