"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupUI = setupUI;
function setupUI() {
    var sideBox = document.getElementById("sideBox");
    var popBtn = document.getElementById("popBtn");
    var closeBtn = document.getElementById("closeBtn");
    var scrollEl = document.getElementById("scrollPos");
    var dimensionEl = document.getElementById("innerDim");
    popBtn.onclick = function () { return sideBox.classList.add("active"); };
    closeBtn.onclick = function () { return sideBox.classList.remove("active"); };
    var updateState = function () {
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
    };
    window.addEventListener("scroll", updateState);
    window.addEventListener("resize", updateState);
    updateState();
}
