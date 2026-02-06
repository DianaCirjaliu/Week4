"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasApp = void 0;
var constants_js_1 = require("./constants.js");
var CanvasApp = /** @class */ (function () {
    function CanvasApp() {
        var _this = this;
        this.main = document.querySelector("main");
        this.canvas = document.getElementById("myCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.savedImg = [];
        this.contor = 0;
        this.initCanvas();
        this.loadData();
        window.addEventListener("resize", function () { return _this.initCanvas(); });
        this.render();
    }
    CanvasApp.prototype.initCanvas = function () {
        if (this.main && this.canvas) {
            this.canvas.width = this.main.clientWidth;
            this.canvas.height = this.main.clientHeight;
        }
    };
    CanvasApp.prototype.loadData = function () {
        var data = localStorage.getItem("savedImg");
        if (data) {
            this.savedImg = JSON.parse(data);
            this.contor = this.savedImg.length;
            this.render();
        }
    };
    CanvasApp.prototype.drawImg = function (src, x, y) {
        var _this = this;
        var img = new Image();
        img.src = src;
        img.onload = function () {
            var _a;
            (_a = _this.ctx) === null || _a === void 0 ? void 0 : _a.drawImage(img, x, y, constants_js_1.DEFAULT_SIZE, constants_js_1.DEFAULT_SIZE);
        };
    };
    CanvasApp.prototype.render = function () {
        var _this = this;
        var _a;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.savedImg.forEach(function (img) {
            var _a;
            _this.drawImg(img.src, img.x, img.y);
            if (img.selected && _this.ctx) {
                _this.ctx.strokeStyle = "pink";
                (_a = _this.ctx) === null || _a === void 0 ? void 0 : _a.strokeRect(img.x, img.y, constants_js_1.DEFAULT_SIZE, constants_js_1.DEFAULT_SIZE);
            }
        });
    };
    CanvasApp.prototype.addRandomImg = function () {
        var random = constants_js_1.IMAGES[Math.floor(Math.random() * constants_js_1.IMAGES.length)];
        var x = Math.random() * (this.canvas.width - constants_js_1.DEFAULT_SIZE);
        var y = Math.random() * (this.canvas.height - constants_js_1.DEFAULT_SIZE);
        var newImg = {
            src: random,
            x: x,
            y: y,
            selected: false,
            poz: this.contor,
        };
        this.savedImg.push(newImg);
        this.contor++;
        localStorage.setItem("savedImg", JSON.stringify(this.savedImg));
        this.drawImg(newImg.src, newImg.x, newImg.y);
    };
    CanvasApp.prototype.selectImg = function (mouseX, mouseY) {
        this.savedImg.forEach(function (img) { return (img.selected = false); });
        for (var i = this.savedImg.length - 1; i >= 0; i--) {
            var img = this.savedImg[i];
            if (img) {
                if (mouseX >= (img === null || img === void 0 ? void 0 : img.x) &&
                    mouseX <= (img === null || img === void 0 ? void 0 : img.x) + constants_js_1.DEFAULT_SIZE &&
                    mouseY >= img.y &&
                    mouseY <= img.y + constants_js_1.DEFAULT_SIZE) {
                    img.selected = true;
                    this.render();
                    console.log("".concat(i));
                    break;
                }
            }
        }
    };
    CanvasApp.prototype.moveImg = function (dx, dy) {
        var _a;
        var img;
        for (var i = 0; i < this.savedImg.length; i++) {
            if (((_a = this.savedImg[i]) === null || _a === void 0 ? void 0 : _a.selected) === true) {
                img = this.savedImg[i];
            }
        }
        if (img) {
            img.x += dx;
            img.y += dy;
            this.render();
        }
    };
    CanvasApp.prototype.clearCanvas = function () {
        var _a;
        (_a = this.ctx) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.savedImg = [];
        localStorage.removeItem("savedImg");
        this.contor = 0;
    };
    return CanvasApp;
}());
exports.CanvasApp = CanvasApp;
