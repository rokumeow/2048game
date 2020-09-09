var board = new Array();
var score = 0;

$(document).ready(function () {
    newGame();
})

function newGame() {
    //初始化棋盘格
    init();
    //随机在两个格子生成数字
    generateOneNumber();
    generateOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j));
            gridCell.css('left', getPosLeft(i, j));
        }

    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        for (var j = 0; j < 4; j++)
            board[i][j] = 0;
    }

    updateBoardView();
}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>')
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] === 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                //gridcell的中心位置
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            }
            else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                // 完全覆盖gridcell
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }
        }
}

function generateOneNumber() {
    //格子全满，无新空间
    if (nospace(board))
        return false;
    //随机一个位置
    //生成0、1、2、3中的一位，且为int型
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    while (true) {
        if (board[randx][randy] === 0)
            break;

        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
    }

    //随机一个数字
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}
//玩家按下键盘
$(document).keydown(function (event) {
    switch (event.keyCode) {
        //left
        case 37:
            if (moveLeft()) {
                generateOneNumber();
                isGameOver();
            };
            break;
        //up
        case 38:
            if (moveUp()) {
                generateOneNumber();
                isGameOver();
            };
            break;
        //right
        case 39:
            if (moveRight()) {
                generateOneNumber();
                isGameOver();
            };
            break;
        //down
        case 40:
            if (moveDown()) {
                generateOneNumber();
                isGameOver();
            };
            break;
        //default
        default:
            break;


    }
});

function isGameOver() {

}

function moveLeft() {
    if (!canMoveLeft(board))
        return false;

    //moveLeft
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)) {
                        //move
                        showMoveAnimation(i, j, i, k);
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 200);
    return true;
}