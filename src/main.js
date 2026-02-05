//select components
var sideBox = document.getElementById("sideBox");
var popBtn = document.getElementById("popBtn");
var closeBtn = document.getElementById("closeBtn");
popBtn.onclick = function () { return sideBox.classList.add("active"); };
closeBtn.onclick = function () { return sideBox.classList.remove("active"); };
//main image logic
var addImg = document.getElementById("addBtn");
var clearImg = document.getElementById("clearBtn");
var main = document.querySelector("main");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var images = [
    "./assets/1.png",
    "./assets/2.png",
    "./assets/3.png",
    "./assets/4.png",
];
var savedImg = [];
function initCanvas() {
    if (main && canvas) {
        canvas.width = main.clientWidth;
        canvas.height = main.clientHeight;
    }
}
function drawImg(src, x, y) {
    var img = new Image();
    img.src = images[Math.floor(Math.random() * images.length)];
    img.onload = function () {
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, x, y, 100, 100);
    };
}
function addRandomImg() {
    var random = images[Math.floor(Math.random() * images.length)];
    var x = Math.random() * (canvas.width - 100);
    var y = Math.random() * (canvas.height - 100);
    var newImg = { src: random, x: x, y: y };
    savedImg.push(newImg);
    localStorage.setItem("savedImg", JSON.stringify(savedImg));
    drawImg(newImg.src, newImg.x, newImg.y);
}
window.addEventListener("load", function () {
    initCanvas();
    var data = localStorage.getItem("savedImg");
    if (data) {
        savedImg = JSON.parse(data);
        savedImg.forEach(function (img) { return drawImg(img.src, img.x, img.y); });
    }
});
addImg.onclick = addRandomImg;
function clearCanvas() {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    savedImg = [];
    localStorage.removeItem("savedImg");
}
addImg.onclick = addRandomImg;
clearImg.onclick = clearCanvas;
//info window logic
var scrollEl = document.getElementById("scrollPos");
var dimensionEl = document.getElementById("innerDim");
function updateState() {
    var scrollX = Math.round(window.scrollX);
    var scrollY = Math.round(window.scrollY);
    var width = window.innerWidth;
    var height = window.innerHeight;
    if (scrollEl) {
        scrollEl.innerText = "X: ".concat(scrollX, ", Y:").concat(scrollY);
    }
    if (dimensionEl) {
        dimensionEl.innerText = "".concat(width, "px x ").concat(height, "px");
    }
}
window.addEventListener("scroll", updateState);
window.addEventListener("resize", updateState);
updateState();
