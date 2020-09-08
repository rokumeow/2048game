var board = new Array();
var score = 0;

$(document).ready(function () {
    newGame();
})

function newGame() {
    //初始化棋盘格
    init();
    //随机在两个格子生成数字
}

function init() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
            console.log("test");
        }
}