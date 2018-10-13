'use strict';

console.log('I am minesweeper');

var gBoard;
var gTimeInterval; //CR: you can use the gState for saving the interval instead of one more variable.
var gClickCnt;//CR: Impossible to understand the variable's purpose.
const sadEmoji = '😩'; // CR: Better to use CAPS_LOCK for consts.
const neutralEmoji = '😐';
const happyEmoji = '😎';
var gElBestScore;


var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gState = {
    isGameOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init() {
    resetVarsAndElements();
    clearInterval(gTimeInterval);
    gTimeInterval = undefined;
    gBoard = buildBoard();
    renderBoard(gBoard);
}

function resetVarsAndElements() {
    gState.isGameOn = false;
    gClickCnt = 0;

    var elBoard = document.querySelector('.board');
    elBoard.style.pointerEvents = 'auto';
    var elEmoji = document.querySelector('.emoji');
    elEmoji.innerHTML = neutralEmoji;
    var elMarkedCnt = document.querySelector('.markedCount');
    elMarkedCnt.innerHTML = 'Flagged cells: ';
    var elGameOver = document.querySelector('.gameOver');
    elGameOver.style.visibility = 'hidden';
    var elTime = document.querySelector('.time');
    elTime.innerHTML = '00:00:00';
    gElBestScore = document.querySelector('.bestScore');
    if (localStorage.getItem(`level${gLevel.SIZE}bestScore`) === null) gElBestScore.innerHTML = 'No Score Yet';
    else gElBestScore.innerHTML = 'Best score for level ' + gLevel.SIZE + ' is: ' + localStorage.getItem(`level${gLevel.SIZE}bestScore`) + ' secs';

    gState.secsPassed = 0;
    gState.shownCount = 0;
    gState.markedCount = 0;
}


function buildBoard() {
    var board = [];
    var size = gLevel.SIZE;
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = cell;
        }
    }
    return board;
}


function renderBoard(board) {
    // CR: Nice!
    var strHtml = '';
    var elBoard = document.querySelector('.board');
    for (var i = 0; i < board.length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var cell = board[i][j];
            var cellId = `cell-${i}-${j}`;
            var cellClass;
            if (cell.isShown) cellClass = 'shown ';
            else cellClass = 'hidden ';
            strHtml += `<td class="${cellClass}" id="${cellId}" onmousedown="cellClicked(this,${i},${j})" onContextMenu="return false;">`;
            strHtml += '</td>';

        }
        strHtml += '</tr>';

    }
    elBoard.innerHTML = strHtml;
}

function cellClicked(elCell, i, j) {
    if (gState.secsPassed === 0 && !gState.isGameOn) {
        gTimeInterval = setInterval(getTime, 1000);
        gState.isGameOn = true;
    }
    //start time and start adding mines!

    var cell = gBoard[i][j];
    if (event.which === 1 && !cell.isMarked) {
        gClickCnt++;
        if (gClickCnt === 1) {
            cell.isShown = true;
            setMines(gBoard);
            if (!cell.minesAroundCount) {
                expandShown(i, j);
                gState.shownCount++;
            }
        }
        if (!cell.isShown && !cell.minesAroundCount && !cell.isMine) {
            expandShown(i, j);
            checkVictory();
        }

        else if (cell.minesAroundCount) {
            //MODEL
            cell.isShown = true;
            gState.shownCount++;
            elCell.innerHTML = cell.minesAroundCount;
            checkVictory();
        }
        else if (cell.isMine) {
            //MODEL
            cell.isShown = true;
            gState.shownCount++;
            elCell.innerHTML = '💣';
            gameOver(1);
        }
        //DOM
        elCell.classList.remove('hidden');
        elCell.classList.add('shown');
    }
    else if (event.which === 3) {
        cellMarked(cell, elCell);
        checkVictory();
    }
}


function cellMarked(cell, elCell) {

    if (cell.isMarked) {
        cell.isMarked = false;
        elCell.classList.remove('marked');
        elCell.innerHTML = '';
        gState.markedCount--;

    }
    else {
        //CR: you should check here that the cell is covered.
        if (!cell.isShown) {
            cell.isMarked = true;
            elCell.classList.add('marked');
            elCell.innerHTML = '🚩';
            gState.markedCount++;
        }
    }
    var elMarkedCnt = document.querySelector('.markedCount');
    elMarkedCnt.innerHTML = `Flagged cells: ${gState.markedCount}`;
}


function getRandomIdxs() {
    //CR: not a good func name. this function is much smarter.
    // it checks and returns only empty coord, then better to say it in its name,
    // such as: getRandomEmptyCoord
    var size = gLevel.SIZE;
    var randI = Math.floor(Math.random() * size);
    var randJ = Math.floor(Math.random() * size);
    while (gBoard[randI][randJ].isShown || gBoard[randI][randJ].isMine) {
        randI = Math.floor(Math.random() * size);
        randJ = Math.floor(Math.random() * size);
    }
    return { i: randI, j: randJ };
}

function setMines(board) {

    for (var i = 0; i < gLevel.MINES; i++) {
        var coord = getRandomIdxs();
        board[coord.i][coord.j].isMine = true;
        console.log(coord.i, coord.j);
    }
    setMinesNegsCount(board);
}


function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            countCellNeighs(board, i, j);
        }
    }
}

function countCellNeighs(board, r, c) {
    for (let i = r - 1; i <= r + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = c - 1; j <= c + 1; j++) {
            if (j < 0 || j >= board.length) continue;
            if (i === r && j === c) continue;

            if (board[i][j].isMine) {
                // debugger;
                board[i][j].minesAroundCount = 0; //CR: Not a necessary line.
                board[r][c].minesAroundCount++;
            }
        }
    }
}

//IF I CAN'T DO IT WITH RECURSION IN THE WEEKEND I MIGHT EXPLODE!!
// CR: :) :)

// function expandShown(board, i, j) {

//     var toBeChecked = [{ i: i, j: j }];
//     var checkedCells = [];
//     var selector;
//     var elCell;
//     // debugger;
//     //if cell is empty, add it to the toBeChecked, and open its neighs. 
//     //else, change its shown/hidden propirty. as long as there are cells to
//     //check, repeat.
//     while (toBeChecked.length) {

//         var r = toBeChecked[0].i;
//         var c = toBeChecked[0].j;
//         var cell = board[r][c];
//         //if cell is not mine and hidden, show it and increase show count
//         if (!cell.minesAroundCount && !cell.isMine) {
//             if (!cell.isShown && !cell.isMarked) { //CR: you could write it together with line-235's if.
//                 selector = `#cell-${r}-${c}`;
//                 elCell = document.querySelector(selector);
//                 //MODEL
//                 cell.isShown = true;
//                 gState.shownCount++;
//                 //DOM
//                 elCell.classList.add('shown');
//                 elCell.classList.remove('hidden');
//                 elCell.innerHTML = '';
//             }
//         }
//         //then remove it from the 2bechecked arr and push it to checked array
//         for (var k = 0; k < toBeChecked.length; k++) {
//             if (toBeChecked[k].i === r && toBeChecked[k].j === c)
//                 checkedCells.push(toBeChecked.splice(k, 1)[0]);
//         }
//         // now go over its neighs 
//         for (var i = r - 1; i <= r + 1; i++) {
//             if (i < 0 || i >= board.length) continue;
//             for (var j = c - 1; j <= c + 1; j++) {
//                 if (j < 0 || j >= board.length) continue;
//                 if (i === r && j === c) continue;
//                 //before pushing it to the toBe.., check if this cell was already checked to avoid endless check
//                 if (!board[i][j].minesAroundCount && !board[i][j].isMine && !isCellChecked(checkedCells, i, j))
//                     toBeChecked.push({ i: i, j: j });
//                 else {
//                     selector = `#cell-${i}-${j}`;
//                     elCell = document.querySelector(selector);
//                     if (!board[i][j].isShown && !board[i][j].isMarked) {
//                         //if cell is flagged dont uncover it.
//                         //MODEL
//                         board[i][j].isShown = true;
//                         gState.shownCount++;
//                         //DOM
//                         elCell.classList.add('shown');
//                         elCell.classList.remove('hidden');
//                         elCell.innerHTML = board[i][j].minesAroundCount;
//                     }
//                 }
//             }
//         }
//     }
// }


function expandShown(i, j) {
// I need selector and elCell
    var selector;
    var elCell;
    //go over neighs of the sent cell
    for (var r = i - 1; r <= i + 1; r++) {
        for (var c = j - 1; c <= j + 1; c++) {
            // check neighs conditions 
            if (r < 0 || r >= gBoard.length || c < 0 || c >= gBoard.length) continue;
            // if cell is alraedy open or is flagged, no need to check it, continue
            if (gBoard[r][c].isMarked || gBoard[r][c].isShown) continue;
            // else, if it's not,(model) show it, increase show count and update in dom
            gBoard[r][c].isShown = true;
            gState.shownCount++;
            selector = `#cell-${r}-${c}`;
            elCell = document.querySelector(selector);
            elCell.classList.add('shown');
            elCell.classList.remove('hidden');
            // inside cell should be empty if 0 and number if neighs
            elCell.innerHTML = (!gBoard[r][c].minesAroundCount) ? '' : gBoard[r][c].minesAroundCount;
            // before sending the currCell, make sure it's empty and does not have neighs
            if (!gBoard[r][c].minesAroundCount) expandShown(r, c);
        }
    }
}


// function isCellChecked(arr, i, j) {
//     for (var k = 0; k < arr.length; k++) {
//         if (arr[k].i === i && arr[k].j === j) return true;
//     }
//     return false;
// }

function changeLevel(elLevel) {
    switch (elLevel) {
        case '6':
            gLevel.SIZE = 6;
            gLevel.MINES = 5;
            break;
        case '8':
            gLevel.SIZE = 8;
            gLevel.MINES = 15;
            break;

        default:
            gLevel.SIZE = 4;
            gLevel.MINES = 2;

            break;
    }
    init();
}


function checkVictory() {
    var size = gLevel.SIZE * gLevel.SIZE;
    var showCnt = gState.shownCount;
    var markCnt = gState.markedCount;
    var minesCnt = gLevel.MINES;
    if (showCnt === size - minesCnt && markCnt === minesCnt) gameOver(0);
}


function gameOver(bomb) {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (bomb) {
                //CR: if(bomb) >> complicated and fishy, but not a best way to understand the code for somebody who did not write it.
                if (!gBoard[i][j].isShown && gBoard[i][j].isMine) {
                    gBoard[i][j].isShown = true;
                    var selector = `#cell-${i}-${j}`;
                    var elCell = document.querySelector(selector);
                    elCell.classList.add('shown');
                    elCell.classList.remove('hidden');
                    elCell.innerHTML = '💣';
                }
            }
        }
    }
    var msg = '';
    var elGameOver = document.querySelector('.gameOver');
    var elBoard = document.querySelector('.board');
    var elEmoji = document.querySelector('.emoji');
    if (bomb) {
        msg = '💥EXPLOSION💥 Try again!';
        elEmoji.innerHTML = sadEmoji;
    }
    else {
        updateScoresLS();
        msg = 'HELLO THERE, 🎊WINNER🎊';
        elEmoji.innerHTML = happyEmoji;
    }
    gState.isGameOn = false;
    clearInterval(gTimeInterval);
    elGameOver.innerHTML = msg;
    elGameOver.style.visibility = 'visible'
    elBoard.style.pointerEvents = 'none';
}


function updateScoresLS() {

    var level4bestScore = +localStorage.getItem("level4bestScore");
    var level6bestScore = +localStorage.getItem("level6bestScore");
    var level8bestScore = +localStorage.getItem("level8bestScore");

    if (typeof (Storage) !== "undefined") {

        if (gLevel.SIZE === 4) {
            if (!level4bestScore) {
                localStorage.setItem("level4bestScore", gState.secsPassed);
            }
            else if (gState.secsPassed < level4bestScore) {
                localStorage.setItem("level4bestScore", gState.secsPassed);
            }
        }
        else if (gLevel.SIZE === 6) {
            if (!level6bestScore) {
                localStorage.setItem("level6bestScore", gState.secsPassed);
            }
            else if (gState.secsPassed < level6bestScore) {
                localStorage.setItem("level6bestScore", gState.secsPassed);
            }
        }
        else if (gLevel.SIZE === 8) {
            if (!level8bestScore) {
                localStorage.setItem("level8bestScore", gState.secsPassed);

            }
            else if (gState.secsPassed < level8bestScore) {
                localStorage.setItem("level8bestScore", gState.secsPassed);
            }
        }
        // CR: Better to use innerText down here >
        gElBestScore.innerHTML = 'Best score for level ' + gLevel.SIZE + ' is: ' + localStorage.getItem(`level${gLevel.SIZE}bestScore`) + ' secs';
    }
    else console.log('I do not support local storage');
}