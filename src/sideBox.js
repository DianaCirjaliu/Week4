"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSideBox = initSideBox;
function initSideBox() {
    //select components
    var sideBox = document.getElementById('sideBox');
    var popBtn = document.getElementById('popBtn');
    var closeBtn = document.getElementById('closeBtn');
    popBtn.onclick = function () { return sideBox.classList.add('active'); };
    closeBtn.onclick = function () { return sideBox.classList.remove('active'); };
}
