//select components
var sideBox = document.getElementById("sideBox");
var popBtn = document.getElementById("popBtn");
var closeBtn = document.getElementById("closeBtn");
var default_size = 100;
popBtn.onclick = function () { return sideBox.classList.add("active"); };
closeBtn.onclick = function () { return sideBox.classList.remove("active"); };
//main image logic
var addImg = document.getElementById("addBtn");
var clearImg = document.getElementById("clearBtn");
var main = document.querySelector("main");
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var contor = 0;
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
    if (!ctx)
        return;
    var img = new Image();
    img.src = src;
    img.onload = function () {
        ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(img, x, y, default_size, default_size);
    };
}
function render() {
    if (!ctx)
        return;
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    savedImg.forEach(function (img) {
        drawImg(img.src, img.x, img.y);
        if (img.selected) {
            ctx.strokeStyle = "pink";
            ctx === null || ctx === void 0 ? void 0 : ctx.strokeRect(img.x, img.y, default_size, default_size);
        }
    });
}
function addRandomImg() {
    var random = images[Math.floor(Math.random() * images.length)];
    var x = Math.random() * (canvas.width - default_size);
    var y = Math.random() * (canvas.height - default_size);
    var newImg = { src: random, x: x, y: y, selected: false, poz: contor };
    savedImg.push(newImg);
    contor++;
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
    contor = 0;
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
//move objects logic
var leftBtn = document.getElementById("leftBtn");
var rightBtn = document.getElementById("rightBtn");
var upBtn = document.getElementById("upBtn");
var downBtn = document.getElementById("downBtn");
function selectImg(mouseX, mouseY) {
    //reset all the selection before
    savedImg.forEach(function (img) { return (img.selected = false); });
    for (var i = savedImg.length - 1; i >= 0; i--) {
        var img = savedImg[i];
        if (img) {
            if (mouseX >= (img === null || img === void 0 ? void 0 : img.x) &&
                mouseX <= (img === null || img === void 0 ? void 0 : img.x) + default_size &&
                mouseY >= img.y &&
                mouseY <= img.y + default_size) {
                img.selected = true;
                render();
                console.log("".concat(i));
                break;
            }
        }
    }
}
canvas.addEventListener("click", function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    selectImg(x, y);
});
function moveImg(dx, dy) {
    var _a;
    var img;
    for (var i = 0; i < savedImg.length; i++) {
        if (((_a = savedImg[i]) === null || _a === void 0 ? void 0 : _a.selected) === true) {
            img = savedImg[i];
        }
    }
    if (img) {
        img.x += dx;
        img.y += dy;
        render();
    }
}
leftBtn === null || leftBtn === void 0 ? void 0 : leftBtn.addEventListener('click', function () { return moveImg(-10, 0); });
rightBtn === null || rightBtn === void 0 ? void 0 : rightBtn.addEventListener('click', function () { return moveImg(10, 0); });
upBtn === null || upBtn === void 0 ? void 0 : upBtn.addEventListener('click', function () { return moveImg(0, -10); });
downBtn === null || downBtn === void 0 ? void 0 : downBtn.addEventListener('click', function () { return moveImg(0, 10); });
