/*  
    File:       SudokuMD.js
    Program:    Sudoku MD
    Author:     Erik Muir
    Email:      erikdmuir@gmail.com
    Copyright:  © 2014 MuirDev
*/


//-------------------------------------------------------------------------------------------------------------------------------
// Global & Constant Variables
//-------------------------------------------------------------------------------------------------------------------------------
var _sudoku;
var UNIT_SIZE = 9;
var COLOR = {
    background: {
        normal: 'rgba(255, 255, 255, 1.0)', // White
        active: 'rgba(100, 255,  100, 0.6)', // Light Green 1
        paused: 'rgba(40, 40, 40, 0.8)', // Dark Gray
        relative: 'rgba(180, 255, 180, 0.4)', // Light Green 2
        hint: 'rgba(140, 255, 140, 1.0)' // Light Green 3
    },
    foreground: {
        normal: 'rgba(85, 85, 85, 1.0)', // Darker Gray
        active: 'rgba(0, 0, 255, 1.0)', // Blue
        paused: 'rgba(38, 38, 38, 0.8)', // Dark Gray
        warning: 'rgba(255, 0, 0, 1.0)', // Red
        solved: 'rgba(85, 85, 85, 1.0)', // Darker Gray
        clue: 'rgba(0, 0, 0, 1.0)' // Black
    },
    legend: {
        enabled: 'rgba(250, 235, 215, 1.0)', // Antique White
        disabled: 'rgba(128, 128, 128, 1.0)' // Gray
    },
    candidate: {
        0: 'rgba(38, 38, 38, 0.8)',
        1: 'rgba(43, 113, 127, 0.8)',
        2: 'rgba(240, 59, 233, 0.8)',
        3: 'rgba(180, 67, 20, 0.8)',
        4: 'rgba(88, 182, 106, 0.8)',
        5: 'rgba(200, 22, 87, 0.8)',
        6: 'rgba(150, 112, 239, 0.8)',
        7: 'rgba(134, 37, 143, 0.8)',
        8: 'rgba(56, 175, 225, 0.8)',
        9: 'rgba(22, 99, 38, 0.8)'
    }
};
var PUZZLE = {
    easy: [
        '00000000000,00000000000,00000000000,00000000000,14000000000,15000000000,00000000000,13000000000,00000000000,18000000000,00000000000,13000000000,00000000000,00000000000,00000000000,14000000000,15000000000,00000000000,00000000000,00000000000,00000000000,11000000000,00000000000,00000000000,17000000000,00000000000,00000000000,15000000000,17000000000,00000000000,19000000000,00000000000,13000000000,12000000000,14000000000,00000000000,00000000000,00000000000,00000000000,00000000000,16000000000,00000000000,00000000000,00000000000,00000000000,00000000000,18000000000,12000000000,14000000000,00000000000,17000000000,00000000000,19000000000,15000000000,00000000000,00000000000,17000000000,00000000000,00000000000,16000000000,00000000000,00000000000,00000000000,00000000000,12000000000,14000000000,00000000000,00000000000,00000000000,13000000000,00000000000,16000000000,00000000000,15000000000,00000000000,13000000000,12000000000,00000000000,00000000000,00000000000,00000000000,0',
        '00000000000,14000000000,00000000000,13000000000,00000000000,12000000000,00000000000,00000000000,16000000000,00000000000,16000000000,00000000000,17000000000,00000000000,00000000000,00000000000,00000000000,00000000000,19000000000,15000000000,13000000000,14000000000,00000000000,00000000000,00000000000,00000000000,17000000000,15000000000,00000000000,17000000000,00000000000,00000000000,00000000000,00000000000,00000000000,13000000000,00000000000,13000000000,00000000000,19000000000,00000000000,14000000000,00000000000,15000000000,00000000000,11000000000,00000000000,00000000000,00000000000,00000000000,00000000000,16000000000,00000000000,19000000000,13000000000,00000000000,00000000000,00000000000,00000000000,15000000000,12000000000,17000000000,11000000000,00000000000,00000000000,00000000000,00000000000,00000000000,19000000000,00000000000,13000000000,00000000000,12000000000,00000000000,00000000000,11000000000,00000000000,13000000000,00000000000,16000000000,00000000000,0'
    ],
    medium: [
        '00000000000,00000000000,00000000000,00000000000,16000000000,00000000000,00000000000,11000000000,00000000000,00000000000,16000000000,00000000000,12000000000,00000000000,00000000000,00000000000,00000000000,18000000000,00000000000,00000000000,00000000000,00000000000,00000000000,00000000000,16000000000,15000000000,00000000000,00000000000,00000000000,00000000000,18000000000,14000000000,13000000000,00000000000,19000000000,17000000000,00000000000,13000000000,19000000000,15000000000,11000000000,17000000000,12000000000,16000000000,00000000000,14000000000,15000000000,00000000000,16000000000,19000000000,12000000000,00000000000,00000000000,00000000000,00000000000,11000000000,13000000000,00000000000,00000000000,00000000000,00000000000,00000000000,00000000000,16000000000,00000000000,00000000000,00000000000,00000000000,19000000000,00000000000,13000000000,00000000000,00000000000,14000000000,00000000000,00000000000,17000000000,00000000000,00000000000,00000000000,00000000000,0',
        '00000000000,14000000000,00000000000,00000000000,11000000000,00000000000,16000000000,00000000000,00000000000,16000000000,00000000000,15000000000,00000000000,00000000000,17000000000,18000000000,00000000000,11000000000,00000000000,00000000000,12000000000,16000000000,15000000000,00000000000,00000000000,14000000000,00000000000,00000000000,00000000000,00000000000,00000000000,00000000000,11000000000,00000000000,00000000000,19000000000,00000000000,11000000000,00000000000,00000000000,18000000000,00000000000,00000000000,16000000000,00000000000,12000000000,00000000000,00000000000,13000000000,00000000000,00000000000,00000000000,00000000000,00000000000,00000000000,17000000000,00000000000,00000000000,13000000000,15000000000,19000000000,00000000000,00000000000,15000000000,00000000000,19000000000,18000000000,00000000000,00000000000,11000000000,00000000000,14000000000,00000000000,00000000000,11000000000,00000000000,19000000000,00000000000,00000000000,15000000000,00000000000,0',
        '00000000000,00000000000,00000000000,19000000000,13000000000,00000000000,00000000000,00000000000,15000000000,00000000000,16000000000,00000000000,11000000000,00000000000,15000000000,00000000000,00000000000,17000000000,00000000000,00000000000,00000000000,16000000000,17000000000,00000000000,00000000000,19000000000,00000000000,00000000000,14000000000,16000000000,00000000000,00000000000,00000000000,00000000000,17000000000,19000000000,11000000000,18000000000,00000000000,00000000000,00000000000,00000000000,00000000000,14000000000,12000000000,19000000000,12000000000,00000000000,00000000000,00000000000,00000000000,15000000000,11000000000,00000000000,00000000000,15000000000,00000000000,00000000000,19000000000,13000000000,00000000000,00000000000,00000000000,16000000000,00000000000,00000000000,17000000000,00000000000,14000000000,00000000000,15000000000,00000000000,18000000000,00000000000,00000000000,00000000000,11000000000,16000000000,00000000000,00000000000,00000000000,0',
        '00000000000,18000000000,00000000000,16000000000,00000000000,00000000000,00000000000,00000000000,00000000000,14000000000,00000000000,19000000000,18000000000,00000000000,00000000000,15000000000,00000000000,00000000000,00000000000,11000000000,00000000000,13000000000,12000000000,14000000000,00000000000,00000000000,00000000000,00000000000,00000000000,00000000000,14000000000,00000000000,00000000000,16000000000,00000000000,00000000000,00000000000,16000000000,14000000000,15000000000,11000000000,12000000000,18000000000,19000000000,00000000000,00000000000,00000000000,13000000000,00000000000,00000000000,17000000000,00000000000,00000000000,00000000000,00000000000,00000000000,00000000000,11000000000,14000000000,15000000000,00000000000,18000000000,00000000000,00000000000,00000000000,18000000000,00000000000,00000000000,16000000000,11000000000,00000000000,15000000000,00000000000,00000000000,00000000000,00000000000,00000000000,18000000000,00000000000,12000000000,00000000000,0',
        '00000000000,00000000000,00000000000,16000000000,14000000000,00000000000,18000000000,00000000000,13000000000,00000000000,00000000000,00000000000,12000000000,00000000000,00000000000,00000000000,15000000000,00000000000,00000000000,12000000000,00000000000,13000000000,15000000000,11000000000,14000000000,00000000000,00000000000,13000000000,00000000000,00000000000,00000000000,19000000000,00000000000,11000000000,16000000000,00000000000,00000000000,19000000000,00000000000,00000000000,00000000000,00000000000,00000000000,18000000000,00000000000,00000000000,17000000000,16000000000,00000000000,13000000000,00000000000,00000000000,00000000000,14000000000,00000000000,00000000000,12000000000,15000000000,18000000000,13000000000,00000000000,11000000000,00000000000,00000000000,15000000000,00000000000,00000000000,00000000000,16000000000,00000000000,00000000000,00000000000,19000000000,00000000000,11000000000,00000000000,12000000000,14000000000,00000000000,00000000000,00000000000,0'
    ],
    hard: [
        '00000000000,00000000000,11000000000,00000000000,00000000000,00000000000,00000000000,00000000000,17000000000,17000000000,00000000000,13000000000,19000000000,11000000000,00000000000,00000000000,00000000000,00000000000,00000000000,18000000000,00000000000,00000000000,00000000000,00000000000,11000000000,00000000000,00000000000,00000000000,00000000000,12000000000,00000000000,17000000000,00000000000,18000000000,11000000000,13000000000,11000000000,00000000000,00000000000,15000000000,16000000000,18000000000,00000000000,00000000000,19000000000,14000000000,19000000000,18000000000,00000000000,13000000000,00000000000,15000000000,00000000000,00000000000,00000000000,00000000000,16000000000,00000000000,00000000000,00000000000,00000000000,18000000000,00000000000,00000000000,00000000000,00000000000,00000000000,14000000000,16000000000,13000000000,00000000000,11000000000,13000000000,00000000000,00000000000,00000000000,00000000000,00000000000,19000000000,00000000000,00000000000,0',
        '00000000000,15000000000,18000000000,00000000000,00000000000,00000000000,00000000000,00000000000,16000000000,16000000000,00000000000,00000000000,00000000000,17000000000,15000000000,00000000000,00000000000,19000000000,12000000000,00000000000,19000000000,18000000000,14000000000,00000000000,00000000000,00000000000,00000000000,00000000000,00000000000,14000000000,00000000000,00000000000,17000000000,00000000000,15000000000,00000000000,13000000000,00000000000,00000000000,00000000000,18000000000,00000000000,00000000000,00000000000,14000000000,00000000000,19000000000,00000000000,11000000000,00000000000,00000000000,16000000000,00000000000,00000000000,00000000000,00000000000,00000000000,00000000000,19000000000,18000000000,14000000000,00000000000,13000000000,14000000000,00000000000,00000000000,16000000000,15000000000,00000000000,00000000000,00000000000,12000000000,19000000000,00000000000,00000000000,00000000000,00000000000,00000000000,18000000000,16000000000,00000000000,0'
    ],
    extreme: [
    ],
    diabolical: [
    ]
};


//-------------------------------------------------------------------------------------------------------------------------------
// Document Ready
//-------------------------------------------------------------------------------------------------------------------------------
var initializeApp = function () {
    //$('body').height(this.outerHeight);

    // Check for the various File API support.
    var browserOk = (window.File && window.FileReader && window.FileList && window.Blob);

    if (browserOk) {
        //window.onresize = function() {
        //    $('body').height(this.outerHeight);
        //};
        document.onkeydown = function (e) {
            e = e || event; // "real browsers" || IE6/7.
            _sudoku.keypressHandler(e.which);
            return false;
        }
        newPuzzle();
    } else {
        alert('This browser does not support Sudoku MD. Please upgrade to a modern browser.');

    }
};


//-------------------------------------------------------------------------------------------------------------------------------
// Utility Functions
//-------------------------------------------------------------------------------------------------------------------------------
Number.prototype.toHHMMSS = function () {
    var sec_num = this;
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));
    if (hours < 10) hours = '0' + hours;
    if (minutes < 10) minutes = '0' + minutes;
    if (seconds < 10) seconds = '0' + seconds;
    var time = hours + ':' + minutes + ':' + seconds;
    return time;
}


//-------------------------------------------------------------------------------------------------------------------------------
// Menu Functions
//-------------------------------------------------------------------------------------------------------------------------------
function newPuzzle(difficultyLevel) {
    difficultyLevel = typeof difficultyLevel !== 'undefined' ? difficultyLevel : Math.floor((Math.random() * 5) + 1);
    var len, rnd, str;
    switch (difficultyLevel) {
        case 1:
            len = PUZZLE.easy.length;
            rnd = Math.floor(Math.random() * len);
            str = PUZZLE.easy[rnd];
            break;
        case 5:
            len = PUZZLE.hard.length;
            rnd = Math.floor(Math.random() * len);
            str = PUZZLE.hard[rnd];
            break;
        default:
            len = PUZZLE.medium.length;
            rnd = Math.floor(Math.random() * len);
            str = PUZZLE.medium[rnd];
    }
    s = new Sudoku();
    s.string = str;
    var puzzleArray = s.string.split(',');
    if (puzzleArray.length != ((UNIT_SIZE * UNIT_SIZE) + 1)) {
        //alert('Sorry! There was an issue trying to load a puzzle.');
        swal('Oops...', 'There was an issue trying to load a puzzle.', 'error');
        delete window.s;
        return;
    }
    var iCell = 0;
    var iRow = UNIT_SIZE;
    while (iRow--) {
        var iCol = UNIT_SIZE;
        while (iCol--) {
            var cellArray = puzzleArray[iCell++].split('');
            if (cellArray.length != 11) {
                //alert('Sorry! There was an issue trying to load a puzzle.');
                swal('Oops...', 'There was an issue trying to load a puzzle.', 'error');
                delete window.s;
                return;
            }
            var isClue = (cellArray[0] == '1');
            s.cell[iCol][iRow].clue = s.cell[iCol][iRow].readOnly = isClue;
            s.cell[iCol][iRow].value = cellArray[1];
            var i = UNIT_SIZE;
            while (i--) {
                s.cell[iCol][iRow].candidate[i] = (cellArray[i + 2] == '1');
            }
        }
    }
    s.initialTimer = isNaN(puzzleArray[iCell]) ? 0 : puzzleArray[iCell];
    _sudoku = $.extend(true, {}, s);
    _sudoku.initialize();
}

function savePuzzle() {
    var puzzleString = '';
    var iRow = UNIT_SIZE;
    while (iRow--) {
        var iCol = UNIT_SIZE;
        while (iCol--) {
            var cell = _sudoku.cell[iCol][iRow];
            puzzleString += (cell.clue) ? '1' : '0';
            puzzleString += cell.value.toString();
            var iCand = UNIT_SIZE;
            while (iCand--) {
                puzzleString += cell.candidate[iCand] ? '1' : '0';
            }
            puzzleString += ',';
        }
    }
    puzzleString += (_sudoku.timer.getClock() / 1000).toString();
    var data = new Blob([puzzleString], { type: 'text/plain' });
    var link = document.getElementById('downloadLink');
    link.href = window.URL.createObjectURL(data);
    link.click();
}

function openPuzzle(f) {
    if (!f) {
        //alert('Failed to load file');
        swal('Oops...', 'Failed to load file', 'error');
        return;
    }
    var r = new FileReader();
    var s = new Sudoku();
    r.onload = function (e) {
        s.string = e.target.result;
        var puzzleArray = s.string.split(',');
        if (puzzleArray.length != ((UNIT_SIZE * UNIT_SIZE) + 1)) {
            //alert('Invalid or corrupt file');
            swal('Oops...', 'Invalid or corrupt file', 'error');
            delete window.s;
            return;
        }
        var iCell = 0;
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var iCol = UNIT_SIZE;
            while (iCol--) {
                var cellArray = puzzleArray[iCell++].split('');
                if (cellArray.length != 11) {
                    //alert('Invalid or corrupt file');
                    swal('Oops...', 'Invalid or corrupt file', 'error');
                    delete window.s;
                    return;
                }
                var isClue = (cellArray[0] == '1');
                s.cell[iCol][iRow].clue = s.cell[iCol][iRow].readOnly = isClue;
                s.cell[iCol][iRow].value = cellArray[1];
                var i = UNIT_SIZE;
                while (i--) {
                    s.cell[iCol][iRow].candidate[i] = (cellArray[i + 2] == '1');
                }
            }
        }
        s.initialTimer = isNaN(puzzleArray[iCell]) ? 0 : puzzleArray[iCell];
        _sudoku = $.extend(true, {}, s);
        _sudoku.initialize();
    }
    r.readAsText(f);
}


//-------------------------------------------------------------------------------------------------------------------------------
// Stopwatch Class
//-------------------------------------------------------------------------------------------------------------------------------
var Stopwatch = function (elem, options) {

    var timer = createTimer(),
        offset,
        clock,
        interval;

    // default options
    options = options || {};
    options.delay = options.delay || 1;

    // append elements     
    elem.appendChild(timer);

    // initialize
    reset();

    // private functions
    function createTimer() {
        return document.createElement('span');
    }

    function start() {
        if (!interval) {
            offset = Date.now();
            interval = setInterval(update, options.delay);
        }
    }

    function stop() {
        if (interval) {
            clearInterval(interval);
            interval = null;
        }
    }

    function set(t) {
        clock = (t * 1000);
        render();
    }

    function reset() {
        clock = 0;
        render();
    }

    function update() {
        clock += delta();
        render();
    }

    function render() {
        timer.innerHTML = (clock / 1000).toHHMMSS();
    }

    function delta() {
        var now = Date.now(),
            d = (now - offset);
        offset = now;
        return d;
    }

    function getClock() {
        return clock;
    }

    // public API
    this.start = start;
    this.stop = stop;
    this.set = set;
    this.reset = reset;
    this.render = render;
    this.getClock = getClock;
};


//-------------------------------------------------------------------------------------------------------------------------------
// Cell Class
//-------------------------------------------------------------------------------------------------------------------------------
var Cell = function Cell(col, row) {
    this.col = col;
    this.row = row;
    this.box = (Math.floor(col / 3) + (Math.floor(row / 3) * 3));
    this.value = 0;
    this.clue = false;
    this.readOnly = false;
    this.relative = false;
    this.candidate = new Array(UNIT_SIZE);
    var i = UNIT_SIZE;
    while (i--) {
        this.candidate[i] = false;
    }
}

Cell.prototype.clearCandidates = function () {
    var i = UNIT_SIZE;
    while (i--) {
        this.candidate[i] = false;
    }
}

Cell.prototype.fillCandidates = function () {
    var i = UNIT_SIZE;
    while (i--) {
        this.candidate[i] = true;
    }
}

Cell.prototype.candidateCount = function () {
    var theCount = 0;
    var i = UNIT_SIZE;
    while (i--) {
        if (this.candidate[i] === true) {
            theCount++;
        }
    }
    return theCount;
}

Cell.prototype.getCandidates = function () {
    var candidates = new Array();
    var i = UNIT_SIZE;
    while (i--) {
        if (this.candidate[i] === true) {
            candidates.push(i);
        }
    }
    return candidates;
}


//-------------------------------------------------------------------------------------------------------------------------------
// Sudoku Class
//-------------------------------------------------------------------------------------------------------------------------------

// constructor
var Sudoku = function Sudoku() {
    this.string = '';
    this.initialTimer = 0;
    this.cell = new Array(UNIT_SIZE);
    var iCol = UNIT_SIZE;
    while (iCol--) {
        this.cell[iCol] = new Array(UNIT_SIZE);
        var iRow = UNIT_SIZE;
        while (iRow--) {
            this.cell[iCol][iRow] = new Cell(iCol, iRow);
        }
    }
}

// initialize - binds the puzzle to the puzzle board
Sudoku.prototype.initialize = function () {
    this.isPaused = false;
    this.isPencil = false;
    this.showWarnings = false;
    this.activeCell = this.cell[0][0];
    this.changeActiveCell(4, 4);
    this.gameClock = document.getElementById('gameClock');
    this.gameClock.innerHTML = '';
    this.timer = new Stopwatch(this.gameClock, { delay: 1000 });
    this.timer.set(this.initialTimer);
    this.timer.start();
}

// keypressHandler
Sudoku.prototype.keypressHandler = function (keyCode) {
    if (this.isPaused === true) {
        return false;
    }
    var col = _sudoku.activeCell.col;
    var row = _sudoku.activeCell.row;

    // handle arrow keys
    if (keyCode >= 37 && keyCode <= 40) {
        if (keyCode === 37 && col > 0) {
            col = (col - 1);
        } else if (keyCode === 38 && row > 0) {
            row = (row - 1);
        } else if (keyCode === 39 && col < 8) {
            col = (col + 1);
        } else if (keyCode === 40 && row < 8) {
            row = (row + 1);
        }

        if (col !== _sudoku.activeCell.col || row !== _sudoku.activeCell.row) {
            _sudoku.changeActiveCell(col, row);
        }
    }

    // handle eraser keys
    if (keyCode === 8 || keyCode === 27 || keyCode === 32 || keyCode === 46 || keyCode === 48 || keyCode === 96) {
        _sudoku.changeCellValue(col, row, 0);
    }

    // handle numpad keys
    if (keyCode >= 97 && keyCode <= 105) {
        keyCode = (keyCode - 48);
    }

    // handle number keys
    if (keyCode >= 49 && keyCode <= 57) {
        if (_sudoku.isPencil) {
            _sudoku.toggleCandidate(col, row, (keyCode - 49));
        } else {
            _sudoku.changeCellValue(col, row, (keyCode - 48));
        }
    }
}

// refreshPuzzle
Sudoku.prototype.refreshPuzzle = function () {
    this.resetRelatives();
    var isSolved = this.isPuzzleSolved();
    var iRow = UNIT_SIZE;
    while (iRow--) {
        var iCol = UNIT_SIZE;
        while (iCol--) {
            var cell = this.cell[iCol][iRow];
            var tableCell = $('#cell_' + iCol + '_' + iRow);
            tableCell.html('');
            var backgroundColor;
            if (isSolved) {
                backgroundColor = COLOR.background.solved;
            } else if (this.isPaused === true) {
                backgroundColor = COLOR.background.paused;
            } else if (cell == this.activeCell) {
                backgroundColor = COLOR.background.active;
            } else if (cell.relative) {
                backgroundColor = COLOR.background.relative;
            } else {
                backgroundColor = COLOR.background.normal;
            }
            tableCell.css({ 'background-color': backgroundColor });
            if (cell.value > 0) {
                var fontFamily = (cell.clue) ? 'Trebuchet MS' : 'Maiandra GD';
                var fontSize = (cell.clue) ? '38px' : '38px';
                var fontWeight = (cell.clue) ? 900 : 100;
                var fontColor;
                if (isSolved) {
                    cell.readOnly = true;
                    fontColor = COLOR.foreground.solved;
                } else if (this.isPaused === true) {
                    fontColor = COLOR.foreground.paused;
                } else if (cell.value == this.activeCell.value) {
                    fontColor = COLOR.foreground.active;
                } else if (cell.clue) {
                    fontColor = COLOR.foreground.clue;
                } else {
                    fontColor = COLOR.foreground.normal;
                }
                tableCell.css({
                    'font-family': fontFamily,
                    'font-size': fontSize,
                    'font-weight': fontWeight,
                    'color': fontColor
                });
                tableCell.html(cell.value);
                this.calculateWarnings(iCol, iRow);
            } else {
                this.displayCandidates(iCol, iRow);
            }
        }
    }
    this.refreshLegend();
}

// calculateWarnings
Sudoku.prototype.calculateWarnings = function (col, row) {
    var theCell = this.cell[col][row];
    var tableCell = $('#cell_' + theCell.col + '_' + theCell.row);
    if (this.showWarnings === false || this.isPaused === true) {
        tableCell.removeClass('warning');
    } else {
        var box = (Math.floor(col / 3) + (Math.floor(row / 3) * 3));
        var colCount = 0;
        var rowCount = 0;
        var boxCount = 0;
        var theCol = this.cloneCol(col);
        var theRow = this.cloneRow(row);
        var theBox = this.cloneBox(box);
        var i = UNIT_SIZE;
        while (i--) {
            if (theCol[i].value == theCell.value) {
                colCount++;
            }
            if (theRow[i].value == theCell.value) {
                rowCount++;
            }
            if (theBox[i].value == theCell.value) {
                boxCount++;
            }
        }
        if (colCount > 1 || rowCount > 1 || boxCount > 1) {
            tableCell.addClass('warning');
        } else {
            tableCell.removeClass('warning');
        }
    }
}

// displayCandidates
Sudoku.prototype.displayCandidates = function (col, row) {
    var candidateTable = '';
    candidateTable += '<table class="candidateTable"><tr>';
    candidateTable += '<td><canvas id="cell_' + col + '_' + row + '_cand_1" height="15" width="15"></canvas></td>';
    candidateTable += '<td><canvas id="cell_' + col + '_' + row + '_cand_2" height="15" width="15"></canvas></td>';
    candidateTable += '<td><canvas id="cell_' + col + '_' + row + '_cand_3" height="15" width="15"></canvas></td>';
    candidateTable += '</tr><tr>';
    candidateTable += '<td><canvas id="cell_' + col + '_' + row + '_cand_4" height="15" width="15"></canvas></td>';
    candidateTable += '<td><canvas id="cell_' + col + '_' + row + '_cand_5" height="15" width="15"></canvas></td>';
    candidateTable += '<td><canvas id="cell_' + col + '_' + row + '_cand_6" height="15" width="15"></canvas></td>';
    candidateTable += '</tr><tr>';
    candidateTable += '<td><canvas id="cell_' + col + '_' + row + '_cand_7" height="15" width="15"></canvas></td>';
    candidateTable += '<td><canvas id="cell_' + col + '_' + row + '_cand_8" height="15" width="15"></canvas></td>';
    candidateTable += '<td><canvas id="cell_' + col + '_' + row + '_cand_9" height="15" width="15"></canvas></td>';
    candidateTable += '</tr></table>';
    //this.cell[col][row].tableCell.html(candidateTable);
    $('#cell_' + col + '_' + row).html(candidateTable);
    var iCand = UNIT_SIZE;
    while (iCand--) {
        if (this.cell[col][row].candidate[iCand] === true) {
            var canvas = document.getElementById('cell_' + col + '_' + row + '_cand_' + (iCand + 1));
            var context = canvas.getContext('2d');
            var centerX = canvas.width / 2;
            var centerY = canvas.height / 2;
            var radius = 6;
            context.beginPath();
            context.arc(centerX, centerY, radius, 0, (2 * Math.PI), false);
            context.fillStyle = COLOR.candidate[(this.isPaused === true) ? 0 : (iCand + 1)];
            context.fill();
        }
    }
}

// refreshLegend
Sudoku.prototype.refreshLegend = function () {
    var count = new Array(UNIT_SIZE);
    var i = UNIT_SIZE;
    while (i--) {
        count[i] = 0;
    }
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var value = this.cell[iCol][iRow].value;
            if (value) {
                count[value - 1]++;
            }
        }
    }
    i = UNIT_SIZE;
    while (i--) {
        var remainingCount = (UNIT_SIZE - count[i]);
        $('#legend_' + (i + 1)).css('color', (remainingCount <= 0) ? COLOR.legend.disabled : COLOR.legend.enabled);
        $('#legend_' + (i + 1) + ' sup').html((remainingCount <= 0) ? '0' : remainingCount);
    }
}

// handleLegendClick
Sudoku.prototype.handleLegendClick = function (value) {
    if (this.isPaused === true) {
        return;
    }
    this.changeCellValue(this.activeCell.col, this.activeCell.row, value);
}

// changeActiveCell
Sudoku.prototype.changeActiveCell = function (col, row) {
    if (this.isPaused === true) {
        return;
    }
    this.activeCell = this.cell[col][row];
    this.refreshPuzzle();
}

// changeCellValue
Sudoku.prototype.changeCellValue = function (col, row, value) {
    if (value < 0 || value > UNIT_SIZE || this.cell[col][row].readOnly === true) {
        return;
    }
    this.cell[col][row].value = value;
    if (value > 0) {
        var theRelatives = this.getRelatives(col, row);
        var i = theRelatives.length;
        while (i--) {
            theRelatives[i].candidate[(value - 1)] = false;
        }
        this.cell[col][row].clearCandidates();
    }
    this.refreshPuzzle();
    if (this.isPuzzleSolved() === true) {
        this.solved();
    }
}

// accentuateHint
Sudoku.prototype.accentuateHint = function (col, row) {
    var hintCell = $('#cell_' + col + '_' + row);
    for (var i = 0; i < 5; i++) {
        hintCell.fadeTo(150, 0.1).fadeTo(150, 1.0);
    }
}

// toggleCandidate
Sudoku.prototype.toggleCandidate = function (col, row, candidate) {
    if (candidate < 0 || candidate >= UNIT_SIZE || this.cell[col][row].readOnly === true) {
        return;
    }
    this.cell[col][row].candidate[candidate] = !this.cell[col][row].candidate[candidate];
    this.refreshPuzzle();
}

// resetRelatives
Sudoku.prototype.resetRelatives = function () {
    this.clearRelatives();
    var theRelatives = this.getRelatives(this.activeCell.col, this.activeCell.row);
    this.setRelatives(theRelatives);
}

// clearRelatives
Sudoku.prototype.clearRelatives = function () {
    var iRow = UNIT_SIZE;
    while (iRow--) {
        var iCol = UNIT_SIZE;
        while (iCol--) {
            this.cell[iCol][iRow].relative = false;
        }
    }
}

// setRelatives
Sudoku.prototype.setRelatives = function (theRelatives) {
    var i = theRelatives.length;
    while (i--) {
        theRelatives[i].relative = true;
    }
}

// getRelatives
Sudoku.prototype.getRelatives = function (col, row) {
    var count = 0;
    var theRelatives = new Array();
    var box = (Math.floor(col / 3) + (Math.floor(row / 3) * 3));
    var theCol = this.getCol(col);
    var theRow = this.getRow(row);
    var theBox = this.getBox(box);
    var i = UNIT_SIZE;
    while (i--) {
        theRelatives[count++] = theBox[i];
        if (theCol[i].box != box) {
            theRelatives[count++] = theCol[i];
        }
        if (theRow[i].box != box) {
            theRelatives[count++] = theRow[i];
        }
    }
    return theRelatives;
}

// getRow
Sudoku.prototype.getRow = function (row) {
    var theRow = new Array();
    var i = UNIT_SIZE;
    while (i--) {
        theRow.push(this.cell[i][row]);
    }
    return theRow;
}

// cloneRow
Sudoku.prototype.cloneRow = function (row) {
    var theRow = new Array(UNIT_SIZE);
    var i = UNIT_SIZE;
    while (i--) {
        theRow[i] = $.extend(true, {}, this.cell[i][row]);
    }
    return theRow;
}

// getCol
Sudoku.prototype.getCol = function (col) {
    var theCol = new Array();
    var i = UNIT_SIZE;
    while (i--) {
        theCol.push(this.cell[col][i]);
    }
    return theCol;
}

// cloneCol
Sudoku.prototype.cloneCol = function (col) {
    var theCol = new Array(UNIT_SIZE);
    var i = UNIT_SIZE;
    while (i--) {
        theCol[i] = $.extend(true, {}, this.cell[col][i]);
    }
    return theCol;
}

// getBox
Sudoku.prototype.getBox = function (box) {
    var theBox = new Array();
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            if (this.cell[iCol][iRow].box == box) {
                theBox.push(this.cell[iCol][iRow]);
            }
        }
    }
    return theBox;
}

// cloneBox
Sudoku.prototype.cloneBox = function (box) {
    var theBox = new Array(UNIT_SIZE);
    var i = 0;
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            if (this.cell[iCol][iRow].box == box) {
                theBox[i++] = $.extend(true, {}, this.cell[iCol][iRow]);
            }
        }
    }
    return theBox;
}

// isUnitSolved
Sudoku.prototype.isUnitSolved = function (theUnit) {
    var flag = 0;
    var i = UNIT_SIZE;
    while (i--) {
        if (theUnit[i].value > 0) {
            var bit = 1 << theUnit[i].value;
            if ((flag & bit) != 0) {
                return false;
            } else {
                flag |= bit;
            }
        }
    }
    return (flag == 1022);
}

// isPuzzleSolved
Sudoku.prototype.isPuzzleSolved = function () {
    var i = UNIT_SIZE;
    while (i--) {
        if (!this.isUnitSolved(this.cloneCol(i))) {
            return false;
        }
        if (!this.isUnitSolved(this.cloneRow(i))) {
            return false;
        }
        if (!this.isUnitSolved(this.cloneBox(i))) {
            return false;
        }
    }
    return true;
}

// isPuzzleEmpty 
Sudoku.prototype.isPuzzleEmpty = function () {
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            if (this.cell[iCol][iRow].value > 0) {
                return false;
            }
        }
    }
    return true;
}

// solved
Sudoku.prototype.solved = function () {
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            this.cell[iCol][iRow].readOnly = true;
        }
    }
    this.clearCandidates();
    this.timer.stop();
    $('#gameMessage').html('SOLVED');
    //alert('Congrats! The puzzle is solved!');
    swal('Congrats!', 'The puzzle is solved!', 'success');
}

// togglePen
Sudoku.prototype.togglePen = function () {
    if (this.isPaused === true) {
        return;
    }
    this.isPencil = !this.isPencil;
    $('#pen').attr('src', (this.isPencil) ? 'images/pencil.png' : 'images/pen.png');    
}

// calculateCandidates
Sudoku.prototype.calculateCandidates = function () {
    if (this.isPaused === true) {
        return;
    }

    // First, reset all empty cells' candidates to true and filled cells to false.
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var cell = this.cell[iCol][iRow];
            var iCand = UNIT_SIZE;
            while (iCand--) {
                cell.candidate[iCand] = (cell.value == 0);
            }
        }
    }

    // Now, re-calculate candidates for empty cells.
    var iUnit = UNIT_SIZE;
    while (iUnit--) {
        var theCol = this.getCol(iUnit);
        var theRow = this.getRow(iUnit);
        var theBox = this.getBox(iUnit);
        var i = UNIT_SIZE;
        while (i--) {
            var colValue = theCol[i].value;
            var rowValue = theRow[i].value;
            var boxValue = theBox[i].value;
            var j = UNIT_SIZE;
            while (j--) {
                if (rowValue > 0) {
                    theRow[j].candidate[rowValue - 1] = false;
                }
                if (colValue > 0) {
                    theCol[j].candidate[colValue - 1] = false;
                }
                if (boxValue > 0) {
                    theBox[j].candidate[boxValue - 1] = false;
                }
            }
        }
    }
    this.refreshPuzzle();
}

// clearCandidates
Sudoku.prototype.clearCandidates = function () {
    if (this.isPaused === true) {
        return;
    }
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            this.cell[iCol][iRow].clearCandidates();
        }
    }
    this.refreshPuzzle();
}

// toggleWarnings
Sudoku.prototype.toggleWarnings = function () {
    if (this.isPaused === true) {
        return;
    }
    this.showWarnings = !this.showWarnings;
    $('#warnings').attr('src', (this.showWarnings) ? 'images/no-warnings.png' : 'images/warnings.png');
    this.refreshPuzzle();
}

// hint
Sudoku.prototype.hint = function () {
    if (this.isPaused === true) {
        return;
    }
    if (this.isPuzzleSolved() === true) {
        //alert('This puzzle is already solved.');
        swal('Hey, wait!', 'This puzzle is already solved', 'warning');
        return;
    }
    if (this.isPuzzleEmpty() === true) {
        //alert('Sorry, there are no hints available at this time.');
        swal('Sorry', 'There are no hints available at this time', 'info');
        return;
    }
    var solver = new Solver();
    solver.initialize();
    solver.hint();
}

// solve
Sudoku.prototype.solve = function () {
    if (this.isPaused === true) {
        return;
    }
    if (this.isPuzzleSolved() === true) {
        //alert('This puzzle is already solved.');
        swal('Hey, wait!', 'This puzzle is already solved', 'warning');
        return;
    }
    if (this.isPuzzleEmpty() === true) {
        //alert('Sorry, an empty puzzle cannot be solved.');
        swal('Sorry', 'An empty puzzle connot be solved', 'warning');
        return;
    }
    var solver = new Solver();
    solver.initialize();
    solver.solve();
}

// startOver
Sudoku.prototype.startOver = function () {
    if (this.isPaused === true) {
        return;
    }
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var cell = this.cell[iCol][iRow];
            cell.clearCandidates();
            if (!cell.clue) {
                cell.value = 0;
                cell.readOnly = false;
            }
        }
    }
    $('#gameMessage').html('');
    this.changeActiveCell(4, 4);
    this.timer.stop();
    this.timer.reset();
    this.timer.start();    
}

// pause
Sudoku.prototype.pause = function () {
    if (!this.isPuzzleSolved()) {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.timer.stop();
            $('#gameMessage').html('PAUSED');
        } else {
            $('#gameMessage').html('');
            this.timer.start();
        }
        this.refreshPuzzle();
    }
}


//-------------------------------------------------------------------------------------------------------------------------------
// Solver Class
//-------------------------------------------------------------------------------------------------------------------------------

// constructor
function Solver() {
    this.puzzle = new Sudoku();
    this.singles = new Array();
    this.pairs = new Array();
    this.trips = new Array();
    this.quads = new Array();
}

// initialize
Solver.prototype.initialize = function () {
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            this.puzzle.cell[iCol][iRow].value = _sudoku.cell[iCol][iRow].value;
        }
    }

    this.puzzle.string = _sudoku.string;
    this.initialTimer = _sudoku.timer.getClock();
    this.puzzle.isPaused = _sudoku.isPaused;
    this.puzzle.isPencil = _sudoku.isPencil;
    this.puzzle.showWarnings = _sudoku.showWarnings;
    this.puzzle.activeCell = this.puzzle.cell[0][0];
    this.puzzle.changeActiveCell(_sudoku.activeCell.col, _sudoku.activeCell.row);
    this.puzzle.gameClock = null;
    this.puzzle.timer = null;

    var a, b, c, d;
    for (a = 0; a < UNIT_SIZE; a++) {
        this.singles.push([a]);
        for (b = 1; b < UNIT_SIZE; b++) {
            if (b <= a) continue;
            this.pairs.push([a, b]);
            for (c = 2; c < UNIT_SIZE; c++) {
                if (c <= a || c <= b) continue;
                this.trips.push([ a, b, c ]);
                for (d = 3; d < UNIT_SIZE; d++) {
                    if (d <= a || d <= b || d <= c) continue;
                    this.quads.push([ a, b, c, d ]);
                }
            }
        }
    }
}

// solve
Solver.prototype.solve = function () {
    var isChanged;
    this.reduceCandidates(true);
    do {
        isChanged = false;
        if (!isChanged) isChanged = this.nakedSingle();
        if (!isChanged) isChanged = this.hiddenSingle();
        if (!isChanged) isChanged = this.nakedSet(this.pairs);
        if (!isChanged) isChanged = this.nakedSet(this.trips);
        if (!isChanged) isChanged = this.hiddenSet(this.pairs);
        if (!isChanged) isChanged = this.hiddenSet(this.trips);
        if (!isChanged) isChanged = this.nakedSet(this.quads);
        if (!isChanged) isChanged = this.hiddenSet(this.quads);
        if (!isChanged) isChanged = this.pointingSet();
        if (!isChanged) isChanged = this.boxLineReduction();
        if (!isChanged) isChanged = this.xWing();
        if (!isChanged) isChanged = this.yWing();
    } while (isChanged);
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            _sudoku.changeCellValue(iCol, iRow, this.puzzle.cell[iCol][iRow].value)
        }
    }    
}

// hint
Solver.prototype.hint = function () {
    var isChanged;
    var iterations = 0;
    var hint = new Cell();
    this.reduceCandidates(true);
    do {
        isChanged = false;
        hint = this.nakedSingleHint();
        if (hint.value == 0) hint = this.hiddenSingleHint();
        if (hint.value > 0) isChanged = true;
        if (!isChanged) isChanged = this.nakedSet(this.pairs);
        if (!isChanged) isChanged = this.hiddenSet(this.pairs);
        if (!isChanged) isChanged = this.hiddenSet(this.trips);
        if (!isChanged) isChanged = this.nakedSet(this.quads);
        if (!isChanged) isChanged = this.hiddenSet(this.quads);
        if (!isChanged) isChanged = this.pointingSet();
        if (!isChanged) isChanged = this.boxLineReduction();
        if (!isChanged) isChanged = this.xWing();
        if (!isChanged) isChanged = this.yWing();
    } while (hint.value == 0 && iterations++ < 1000);
    if (hint.value > 0) {
        _sudoku.changeCellValue(hint.col, hint.row, hint.value);
        _sudoku.accentuateHint(hint.col, hint.row);
    } else {
        //alert('Sorry, there are no hints available at this time.');
        swal('Sorry', 'There are no hints available at this time', 'info');
    }
}

// reduceCandidates
Solver.prototype.reduceCandidates = function (initialRun) {
    initialRun = typeof initialRun !== 'undefined' ? initialRun : false;

    // Reset all filled cells' candidates to false
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var cell = this.puzzle.cell[iCol][iRow];
            if (cell.value > 0) {
                cell.clearCandidates();
            } else if (initialRun === true) {
                cell.fillCandidates();
            }
        }
    }

    // Re-calculate candidates for empty cells
    iCol = UNIT_SIZE;
    while (iCol--) {
        iRow = UNIT_SIZE;
        while (iRow--) {
            cell = this.puzzle.cell[iCol][iRow];
            if (cell.value != 0) {
                var theCol = this.puzzle.getCol(cell.col);
                var theRow = this.puzzle.getRow(cell.row);                
                var theBox = this.puzzle.getBox(cell.box);
                i = UNIT_SIZE;
                while (i--) {
                    theCol[i].candidate[cell.value - 1] = false;
                    theRow[i].candidate[cell.value - 1] = false;
                    theBox[i].candidate[cell.value - 1] = false;
                }
            }
        }
    }
}

// naked single
Solver.prototype.nakedSingle = function () {
    var isChanged2 = false;
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var cell = this.puzzle.cell[iCol][iRow];
            if (cell.candidateCount() != 1) {
                continue;
            }
            var i = UNIT_SIZE;
            while (i--) {
                if (!cell.candidate[i]) {
                    continue;
                }
                cell.value = (i + 1);
                console.log('NakedSingle - cell[' + cell.col + '][' + cell.row + '].value = ' + cell.value);
                this.reduceCandidates();
                isChanged2 = true;
            }
        }
    }
    return isChanged2;
}

// naked single hint
Solver.prototype.nakedSingleHint = function () {
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var cell = this.puzzle.cell[iCol][iRow];
            if (cell.candidateCount() !== 1) {
                continue;
            }
            var i = UNIT_SIZE;
            while (i--) {
                if (!cell.candidate[i]) {
                    continue;
                }
                cell.value = (i + 1);
                console.log('NakedSingleHint - cell[' + cell.col + '][' + cell.row + '].value = ' + cell.value);
                this.reduceCandidates();
                return cell;
            }
        }
    }
    return new Cell();
}

// hidden single
Solver.prototype.hiddenSingle = function () {
    var isChanged2 = false;
    var hsCol = new Array();
    var hsRow = new Array();
    var hsVal = new Array();
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var cell = this.puzzle.cell[iCol][iRow];
            if (cell.value != 0) {
                continue;
            }
            var iCand = UNIT_SIZE;
            while (iCand--) {
                if (cell.candidate[iCand] === false) {
                    continue;
                }
                if (!this.isCandidateUnique(this.puzzle.cloneCol(cell.col), iCand) &&
                    !this.isCandidateUnique(this.puzzle.cloneRow(cell.row), iCand) &&
                    !this.isCandidateUnique(this.puzzle.cloneBox(cell.box), iCand)) {
                    continue;
                }
                hsCol.push(cell.col);
                hsRow.push(cell.row);
                hsVal.push(iCand + 1);
                isChanged2 = true;
            }
        }
    }
    var i = hsVal.length;
    while (i--) {
        var cell = this.puzzle.cell[hsCol[i]][hsRow[i]];
        cell.value = hsVal[i];
        console.log('HiddenSingle - cell[' + cell.col + '][' + cell.row + '].value = ' + cell.value);
        this.reduceCandidates();         
    }
    return isChanged2;
}

// hidden single hint
Solver.prototype.hiddenSingleHint = function () {
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var cell = this.puzzle.cell[iCol][iRow];
            if (cell.value != 0) {
                continue;
            }
            var iCand = UNIT_SIZE;
            while (iCand--) {
                if (cell.candidate[iCand] === false) {
                    continue;
                }
                if (!this.isCandidateUnique(this.puzzle.cloneCol(cell.col), iCand) &&
                    !this.isCandidateUnique(this.puzzle.cloneRow(cell.row), iCand) &&
                    !this.isCandidateUnique(this.puzzle.cloneBox(cell.box), iCand)) {
                    continue;
                }
                cell.value = (iCand + 1);
                console.log('HiddenSingleHint - cell[' + cell.col + '][' + cell.row + '].value = ' + cell.value);
                this.reduceCandidates();
                return cell;
            }
        }
    }
    return new Cell();
}

// nakedSet
Solver.prototype.nakedSet = function (set) {
    var isChanged2 = false;
    var i = UNIT_SIZE;
    while (i--) {
        if (this.nakedSetUnitCheck(this.puzzle.cloneCol(i), set) ||
            this.nakedSetUnitCheck(this.puzzle.cloneRow(i), set) ||
            this.nakedSetUnitCheck(this.puzzle.cloneBox(i), set)) {
            isChanged2 = true;
        }
    }
    return isChanged2;
}

// nakedSetUnitCheck
Solver.prototype.nakedSetUnitCheck = function (unit, set) {
    var setText = '';
    if (set === this.singles) {
        setText = 'Single';
    } else if (set === this.pairs) {
        setText = 'Pair';
    } else if (set === this.trips) {
        setText = 'Triple';
    } else if (set === this.quads) {
        setText = 'Quad';
    }
    var isChanged3 = false;
    var setLength = set[0].length;
    var i = set.length;
    while (i--) {
        var combo = set[i];
        var theMatches = new Array();
        var j = UNIT_SIZE;
        while (j--) {
            var cell = unit[j];
            if (!this.containsOnlyMatches(cell, combo)) {
                continue;
            }
            theMatches.push(cell);
        }
        if (theMatches.length !== setLength) {
            continue;
        }
        j = UNIT_SIZE;
        while (j--) {
            var cell = unit[j];
            if (theMatches.indexOf(cell) !== -1) {
                continue;
            }
            var k = combo.length;
            while (k--) {
                var candidate = combo[k];
                if (cell.candidate[candidate]) {
                    this.puzzle.cell[cell.col][cell.row].candidate[candidate] = false;
                    console.log('Naked ' + setText + ' - cell[' + cell.col + '][' + cell.row + '].candidate[' + candidate + '] = false');
                    isChanged3 = true;
                }
            }
        }
    }
    return isChanged3;
}

// hiddenSet
Solver.prototype.hiddenSet = function (set) {
    var isChanged2 = false;
    var i = UNIT_SIZE;
    while (i--) {
        if (this.hiddenSetUnitCheck(this.puzzle.cloneCol(i), set) ||
            this.hiddenSetUnitCheck(this.puzzle.cloneRow(i), set) ||
            this.hiddenSetUnitCheck(this.puzzle.cloneBox(i), set)) {
            isChanged2 = true;
        }
    }
    return isChanged2;
}

// hiddenSetUnitCheck
Solver.prototype.hiddenSetUnitCheck = function (unit, set) {
    var setText = '';
    if (set === this.singles) {
        setText = 'Single';
    } else if (set === this.pairs) {
        setText = 'Pair';
    } else if (set === this.trips) {
        setText = 'Triple';
    } else if (set === this.quads) {
        setText = 'Quad';
    }
    var isChanged3 = false;
    var setLength = set[0].length;
    var i = set.length;
    while (i--) {
        var theMatches = new Array();
        var j = UNIT_SIZE;
        while (j--) {
            if (this.containsAtLeastOneMatch(unit[j], set[i])) {
                theMatches.push(unit[j]);
            }
        }
        if (theMatches.length !== setLength || !this.containsEveryMatch(theMatches, set[i])) {
            continue;
        }
        j = theMatches.length;
        while (j--) {
            var iCand = UNIT_SIZE;
            while (iCand--) {
                if (theMatches[j].candidate[iCand] === true && set[i].indexOf(iCand) === -1) {
                    this.puzzle.cell[theMatches[j].col][theMatches[j].row].candidate[iCand] = false;
                    console.log('Hidden ' + setText + ' - cell[' + theMatches[j].col + '][' + theMatches[j].row + '].candidate[' + iCand + '] = false');
                    isChanged3 = true;
                }
            }
        }
    }
    return isChanged3;
}

// pointingSet
Solver.prototype.pointingSet = function () {
    var iBox = UNIT_SIZE;
    while (iBox--) {
        var theBox = this.puzzle.cloneBox(iBox);
        var iCand = UNIT_SIZE;
        while (iCand--) {
            var theMatches = new Array();
            var theUnit = new Array();
            var i = UNIT_SIZE;
            while (i--) {
                if (this.containsAtLeastOneMatch(theBox[i], [iCand])) {
                    theMatches.push(theBox[i]);
                }
            }
            if (theMatches.length < 2) {
                continue;
            }
            var col = this.allInSameCol(theMatches) ? theMatches[0].col : null;
            var row = this.allInSameRow(theMatches) ? theMatches[0].row : null;
            if (col != null) {
                theUnit = this.puzzle.cloneCol(col);
            } else if (row != null) {
                theUnit = this.puzzle.cloneRow(row);
            } else {
                continue;
            }
            var isChanged2 = false;
            i = UNIT_SIZE;
            while (i--) {
                var cell = theUnit[i];
                var isFoundInMatches = false;
                var e = theMatches.length;
                while (e--) {
                    if (cell.col === theMatches[e].col && cell.row === theMatches[e].row)
                        isFoundInMatches = true;
                }
                if (isFoundInMatches || cell.candidate[iCand] === false) {
                    continue;
                }
                this.puzzle.cell[cell.col][cell.row].candidate[iCand] = false;
                console.log('Pointing Set - cell[' + cell.col + '][' + cell.row + '].candidate[' + iCand + '] = false');
                isChanged2 = true;
            }
            if (isChanged2) {
                return true;
            }
        }
    }
    return false;
}

// boxLineReduction
Solver.prototype.boxLineReduction = function () {
    var iLine = UNIT_SIZE;
    while (iLine--) {
        var theCol = this.puzzle.cloneCol(iLine);
        var theRow = this.puzzle.cloneRow(iLine);
        var iCand = UNIT_SIZE;
        while (iCand--) {
            var theColMatches = new Array();
            var theRowMatches = new Array();
            var i = UNIT_SIZE;
            while (i--) {
                if (this.containsAtLeastOneMatch(theCol[i], [iCand])) {
                    theColMatches.push(theCol[i]);
                }
                if (this.containsAtLeastOneMatch(theRow[i], [iCand])) {
                    theRowMatches.push(theRow[i]);
                }
            }
            if (theColMatches.length >= 2 && this.allInSameBox(theColMatches)) {
                var isChanged2 = false;
                var theBox = this.puzzle.cloneBox(theColMatches[0].box);
                i = UNIT_SIZE;
                while (i--) {
                    var cell = theBox[i];
                    if (theColMatches.indexOf(cell) == -1 && cell.candidate[iCand] === true) {
                        this.puzzle.cell[cell.col][cell.row].candidate[iCand] = false;
                        console.log('Box/Col Reduction - cell[' + cell.col + '][' + cell.row + '].candidate[' + iCand + '] = false');
                        isChanged2 = true;
                    }
                }
                if (isChanged2) {
                    return true;
                }
            }
            if (theRowMatches.length >= 2 && this.allInSameBox(theRowMatches)) {
                var isChanged2 = false;
                var theBox = this.puzzle.cloneBox(theRowMatches[0].box);
                var i = UNIT_SIZE;
                while (i--) {
                    var cell = theBox[i];
                    if (theRowMatches.indexOf(cell) == -1 && cell.candidate[iCand] === true) {
                        this.puzzle.cell[cell.col][cell.row].candidate[iCand] = false;
                        console.log('Box/Row Reduction - cell[' + cell.col + '][' + cell.row + '].candidate[' + iCand + '] = false');
                        isChanged2 = true;
                    }
                }
                if (isChanged2) {
                    return true;
                }
            }
        }
    }
    return false;
}
// x-wing
Solver.prototype.xWing = function () {
    var iCand = UNIT_SIZE;
    while (iCand--) {
        var iCol = UNIT_SIZE;
        while (iCol--) {
            var theCol = this.puzzle.cloneCol(iCol);
            if (this.unitMatchCount(theCol, iCand) != 2) {
                continue;
            }
            var theSampleMatch = this.getCandidateMatches(theCol, iCand);
            var subCol;
            for (subCol = (iCol + 1); subCol < UNIT_SIZE; subCol++) {
                var theSubCol = this.puzzle.getCol(subCol);
                if (this.unitMatchCount(theSubCol, iCand) != 2) {
                    continue;
                }
                var theTestMatch = this.getCandidateMatches(theSubCol, iCand);
                if (theSampleMatch[0].row == theTestMatch[0].row && theSampleMatch[1].row == theTestMatch[1].row) {
                    var isChanged2 = false;
                    var theTestMatchRow0 = this.puzzle.cloneRow(theTestMatch[0].row);
                    var i = UNIT_SIZE;
                    while (i--) {
                        var cell = theTestMatchRow0[i];
                        if (!cell.candidate[iCand] || cell == theSampleMatch[0] || cell == theTestMatch[0]) {
                            continue;
                        }
                        this.puzzle.cell[cell.col][cell.row].candidate[iCand] = false;
                        console.log('X-Wing (col/row)0 - cell[' + cell.col + '][' + cell.row + '].candidate[' + iCand + '] = false');
                        isChanged2 = true;
                    }
                    var theTestMatchRow1 = this.puzzle.cloneRow(theTestMatch[1].row);
                    i = UNIT_SIZE;
                    while (i--) {
                        var cell = theTestMatchRow1[i];
                        if (!cell.candidate[iCand] || cell == theSampleMatch[1] || cell == theTestMatch[1]) {
                            continue;
                        }
                        this.puzzle.cell[cell.col][cell.row].candidate[iCand] = false;
                        console.log('X-Wing (col/row)1 - cell[' + cell.col + '][' + cell.row + '].candidate[' + iCand + '] = false');
                        isChanged2 = true;
                    }
                    if (isChanged2) {
                        return true;
                    }
                }
            }
        }

        var iRow = UNIT_SIZE;
        while (iRow--) {
            var theRow = this.puzzle.cloneRow(iRow);
            if (this.unitMatchCount(theRow, iCand) != 2) {
                continue;
            }
            var theSampleMatch = this.getCandidateMatches(theRow, iCand);
            var subRow;
            for (subRow = (iRow + 1); subRow < UNIT_SIZE; subRow++) {
                var theSubRow = this.puzzle.cloneCol(subRow);
                if (this.unitMatchCount(theSubRow, iCand) != 2) {
                    continue;
                }
                var theTestMatch = this.getCandidateMatches(theSubRow, iCand);
                if (theSampleMatch[0].col == theTestMatch[0].col && theSampleMatch[1].col == theTestMatch[1].col) {
                    var isChanged2 = false;
                    var theTestMatchCol0 = this.puzzle.cloneCol(theTestMatch[0].col);
                    var i = UNIT_SIZE;
                    while (i--) {
                        var cell = theTestMatchCol0[i];
                        if (!cell.candidate[iCand] || cell == theSampleMatch[0] || cell == theTestMatch[0]) {
                            continue;
                        }
                        this.puzzle.cell[cell.col][cell.row].candidate[iCand] = false;
                        console.log('X-Wing (row/col)0 - cell[' + cell.col + '][' + cell.row + '].candidate[' + iCand + '] = false');
                        isChanged2 = true;
                    }
                    var theTestMatchCol1 = this.puzzle.cloneCol(theTestMatch[1].col);
                    i = UNIT_SIZE;
                    while (i--) {
                        var cell = theTestMatchCol1[i];
                        if (!cell.candidate[iCand] || cell == theSampleMatch[1] || cell == theTestMatch[1]) {
                            continue;
                        }
                        this.puzzle.cell[cell.col][cell.row].candidate[iCand] = false;
                        console.log('X-Wing (row/col)1 - cell[' + cell.col + '][' + cell.row + '].candidate[' + iCand + '] = false');
                        isChanged2 = true;
                    }
                    if (isChanged2) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}

// y-wing
Solver.prototype.yWing = function () {
    var iCol = UNIT_SIZE;
    while (iCol--) {
        var iRow = UNIT_SIZE;
        while (iRow--) {
            var hinge = this.puzzle.cell[iCol][iRow];
            if (hinge.candidateCount() !== 2) {
                continue;
            }
            var hingeCombo = hinge.getCandidates();
            var hingeCol = this.puzzle.cloneCol(hinge.col);
            var hingeRow = this.puzzle.cloneRow(hinge.row);
            var hingeBox = this.puzzle.cloneBox(hinge.box);

            // let's try this setup first
            var wing1Candidate = hingeCombo[0];
            var wing2Candidate = hingeCombo[1];

            // wing1 = column, wing2 = row
            var iHingeCol = UNIT_SIZE;
            while (iHingeCol--) {
                var wing1 = hingeCol[iHingeCol];
                if (wing1.candidateCount() !== 2 || wing1.candidate[wing1Candidate] === false || wing1.candidate[wing2Candidate] === true) {
                    continue;
                }
                var confluence = this.getNonMatchingCandidates(wing1, hingeCombo)[0];
                var iHingeRow = UNIT_SIZE;
                while (iHingeRow--) {
                    var wing2 = hingeRow[iHingeRow];
                    if (wing2.candidateCount() !== 2 || wing2.candidate[wing2Candidate] === false || wing2.candidate[confluence] === false) {
                        var isChanged2 = false;
                        var commonRelatives = this.getCommonRelatives(wing1, wing2);
                        var iCommonRelative = commonRelatives.length;
                        while (iCommonRelative--) {
                            var relative = commonRelatives[iCommonRelative];
                            if (relative.candidate[confluence] === true && relative != hinge && relative != wing1 && relative != wing2) {
                                this.puzzle.cell[relative.col][relative.row].candidate[confluence] = false;
                                console.log('Y-Wing (col/row) - cell[' + relative.col + '][' + relative.row + '].candidate[' + confluence + '] = false');
                                isChanged2 = true;
                            }
                        }
                        if (isChanged2 === true) {
                            return true;
                        }
                    }
                }
            }

            // wing1 = box, wing2 = column
            var iHingeBox = UNIT_SIZE;
            while (iHingeBox--) {
                var wing1 = hingeBox[iHingeBox];
                if (wing1.candidateCount() !== 2 || wing1.candidate[wing1Candidate] === false || wing1.candidate[wing2Candidate] === true) {
                    continue;
                }
                var confluence = this.getNonMatchingCandidates(wing1, hingeCombo)[0];
                var iHingeCol = UNIT_SIZE;
                while (iHingeCol--) {
                    var wing2 = hingeCol[iHingeCol];
                    if (wing2.candidateCount() !== 2 || wing2.candidate[wing2Candidate] === false || wing2.candidate[confluence] === false) {
                        var isChanged2 = false;
                        var commonRelatives = this.getCommonRelatives(wing1, wing2);
                        var iCommonRelative = commonRelatives.length;
                        while (iCommonRelative--) {
                            var relative = commonRelatives[iCommonRelative];
                            if (relative.candidate[confluence] === true && relative != hinge && relative != wing1 && relative != wing2) {
                                this.puzzle.cell[relative.col][relative.row].candidate[confluence] = false;
                                console.log('Y-Wing (box/col) - cell[' + relative.col + '][' + relative.row + '].candidate[' + confluence + '] = false');
                                isChanged2 = true;
                            }
                        }
                        if (isChanged2 === true) {
                            return true;
                        }
                    }
                }
            }

            // wing1 = box, wing2 = row
            var iHingeBox = UNIT_SIZE;
            while (iHingeBox--) {
                var wing1 = hingeBox[iHingeBox];
                if (wing1.candidateCount() !== 2 || wing1.candidate[wing1Candidate] === false || wing1.candidate[wing2Candidate] === true) {
                    continue;
                }
                var confluence = this.getNonMatchingCandidates(wing1, hingeCombo)[0];
                var iHingeRow = UNIT_SIZE;
                while (iHingeRow--) {
                    var wing2 = hingeRow[iHingeRow];
                    if (wing2.candidateCount() !== 2 || wing2.candidate[wing2Candidate] === false || wing2.candidate[confluence] === false) {
                        var isChanged2 = false;
                        var commonRelatives = this.getCommonRelatives(wing1, wing2);
                        var iCommonRelative = commonRelatives.length;
                        while (iCommonRelative--) {
                            var relative = commonRelatives[iCommonRelative];
                            if (relative.candidate[confluence] === true && relative != hinge && relative != wing1 && relative != wing2) {
                                this.puzzle.cell[relative.col][relative.row].candidate[confluence] = false;
                                console.log('Y-Wing (box/row) - cell[' + relative.col + '][' + relative.row + '].candidate[' + confluence + '] = false');
                                isChanged2 = true;
                            }
                        }
                        if (isChanged2 === true) {
                            return true;
                        }
                    }
                }
            }

            // now let's invert the wing candidates and try again
            wing1Candidate = hingeCombo[1];
            wing2Candidate = hingeCombo[0];

            // wing1 = column, wing2 = row
            var iHingeCol = UNIT_SIZE;
            while (iHingeCol--) {
                var wing1 = hingeCol[iHingeCol];
                if (wing1.candidateCount() !== 2 || wing1.candidate[wing1Candidate] === false || wing1.candidate[wing2Candidate] === true) {
                    continue;
                }
                var confluence = this.getNonMatchingCandidates(wing1, hingeCombo)[0];
                var iHingeRow = UNIT_SIZE;
                while (iHingeRow--) {
                    var wing2 = hingeRow[iHingeRow];
                    if (wing2.candidateCount() !== 2 || wing2.candidate[wing2Candidate] === false || wing2.candidate[confluence] === false) {
                        var isChanged2 = false;
                        var commonRelatives = this.getCommonRelatives(wing1, wing2);
                        var iCommonRelative = commonRelatives.length;
                        while (iCommonRelative--) {
                            var relative = commonRelatives[iCommonRelative];
                            if (relative.candidate[confluence] === true && relative != hinge && relative != wing1 && relative != wing2) {
                                this.puzzle.cell[relative.col][relative.row].candidate[confluence] = false;
                                console.log('Y-Wing (col/row)2 - cell[' + relative.col + '][' + relative.row + '].candidate[' + confluence + '] = false');
                                isChanged2 = true;
                            }
                        }
                        if (isChanged2 === true) {
                            return true;
                        }
                    }
                }
            }

            // wing1 = box, wing2 = column
            var iHingeBox = UNIT_SIZE;
            while (iHingeBox--) {
                var wing1 = hingeBox[iHingeBox];
                if (wing1.candidateCount() !== 2 || wing1.candidate[wing1Candidate] === false || wing1.candidate[wing2Candidate] === true) {
                    continue;
                }
                var confluence = this.getNonMatchingCandidates(wing1, hingeCombo)[0];
                var iHingeCol = UNIT_SIZE;
                while (iHingeCol--) {
                    var wing2 = hingeCol[iHingeCol];
                    if (wing2.candidateCount() !== 2 || wing2.candidate[wing2Candidate] === false || wing2.candidate[confluence] === false) {
                        var isChanged2 = false;
                        var commonRelatives = this.getCommonRelatives(wing1, wing2);
                        var iCommonRelative = commonRelatives.length;
                        while (iCommonRelative--) {
                            var relative = commonRelatives[iCommonRelative];
                            if (relative.candidate[confluence] === true && relative != hinge && relative != wing1 && relative != wing2) {
                                this.puzzle.cell[relative.col][relative.row].candidate[confluence] = false;
                                console.log('Y-Wing (box/col)2 - cell[' + relative.col + '][' + relative.row + '].candidate[' + confluence + '] = false');
                                isChanged2 = true;
                            }
                        }
                        if (isChanged2 === true) {
                            return true;
                        }
                    }
                }
            }

            // wing1 = box, wing2 = row
            var iHingeBox = UNIT_SIZE;
            while (iHingeBox--) {
                var wing1 = hingeBox[iHingeBox];
                if (wing1.candidateCount() !== 2 || wing1.candidate[wing1Candidate] === false || wing1.candidate[wing2Candidate] === true) {
                    continue;
                }
                var confluence = this.getNonMatchingCandidates(wing1, hingeCombo)[0];
                var iHingeRow = UNIT_SIZE;
                while (iHingeRow--) {
                    var wing2 = hingeRow[iHingeRow];
                    if (wing2.candidateCount() !== 2 || wing2.candidate[wing2Candidate] === false || wing2.candidate[confluence] === false) {
                        var isChanged2 = false;
                        var commonRelatives = this.getCommonRelatives(wing1, wing2);
                        var iCommonRelative = commonRelatives.length;
                        while (iCommonRelative--) {
                            var relative = commonRelatives[iCommonRelative];
                            if (relative.candidate[confluence] === true && relative != hinge && relative != wing1 && relative != wing2) {
                                this.puzzle.cell[relative.col][relative.row].candidate[confluence] = false;
                                console.log('Y-Wing (box/row)2 - cell[' + relative.col + '][' + relative.row + '].candidate[' + confluence + '] = false');
                                isChanged2 = true;
                            }
                        }
                        if (isChanged2 === true) {
                            return true;
                        }
                    }
                }
            }
        }
    }
    return false;
}

// isCandidateUnique
Solver.prototype.isCandidateUnique = function (myCells, myCandidate) {
    var theCount = 0;
    var i = myCells.length;
    while (i--) {
        if (myCells[i].candidate[myCandidate] === true) {
            theCount++;
        }
    }
    return (theCount == 1);
}

// containsOnlyMatches
Solver.prototype.containsOnlyMatches = function (myCell, myCombo) {
    if (myCell.candidateCount() < myCombo.length) {
        return false;
    }
    var i = UNIT_SIZE;
    while (i--) {
        if ((myCombo.indexOf(i) == -1) && (myCell.candidate[i] === true)) {
            return false;
        }
    }
    return true;
}

// containsAtLeastOneMatch
Solver.prototype.containsAtLeastOneMatch = function (myCell, myCombo) {
    if (myCell.candidateCount() < 2) {
        return false;
    }
    var i = UNIT_SIZE;
    while (i--) {
        if ((myCombo.indexOf(i) != -1) && (myCell.candidate[i])) {
            return true;
        }
    }
    return false;
}

// containsEveryMatch
Solver.prototype.containsEveryMatch = function (myMatches, myCombo) {
    var i = myCombo.length;
    while (i--) {
        var candidate = myCombo[i];
        var count = 0;
        var j = myMatches.length;
        while (j--) {
            if (myMatches[j].candidate[candidate]) {
                count++;
            }
        }
        if (count == 0) {
            return false;
        }
    }
    return true;
}

// allInSameCol
Solver.prototype.allInSameCol = function (myCells) {
    var thisCol = myCells[0].col;
    var i = myCells.length;
    while (i--) {
        if (myCells[i].col != thisCol) {
            return false;
        }
    }
    return true;
}

// allInSameRow
Solver.prototype.allInSameRow = function (myCells) {
    var thisRow = myCells[0].row;
    var i = myCells.length;
    while (i--) {
        if (myCells[i].row != thisRow) {
            return false;
        }
    }
    return true;
}

// allInSameBox
Solver.prototype.allInSameBox = function (myCells) {
    var thisBox = myCells[0].box;
    var i = myCells.length;
    while (i--) {
        if (myCells[i].box != thisBox) {
            return false;
        }
    }
    return true;
}

// unitMatchCount
Solver.prototype.unitMatchCount = function (myUnit, myCandidate) {
    var theCount = 0;
    var i = UNIT_SIZE;
    while (i--) {
        if (myUnit[i].candidate[myCandidate]) {
            theCount++;
        }
    }
    return theCount;
}

// getCandidateMatches
Solver.prototype.getCandidateMatches = function (myUnit, myCandidate) {
    var myMatches = new Array();
    var i = UNIT_SIZE;
    while (i--) {
        if (myUnit[i].candidate[myCandidate]) {
            myMatches.push(myUnit[i]);
        }
    }
    return myMatches;
}

// getNonMatchingCandidates
Solver.prototype.getNonMatchingCandidates = function (myCell, myCombo) {
    var theNonMatches = new Array();
    var i = UNIT_SIZE;
    while (i--) {
        if (myCell.candidate[i] === true && $.inArray(i, myCombo) === -1) {
            theNonMatches.push(i);
        }
    }
    return theNonMatches;
}

// getMatchingCandidates
Solver.prototype.getMatchingCandidates = function (myCell, myCombo) {
    var theMatches = new Array();
    var i = UNIT_SIZE;
    while (i--) {
        if (myCell.candidate[i] === true && $.inArray(i, myCombo) !== -1) {
            theMatches.push(i);
        }
    }
    return theMatches;
}

// getRelatives
Solver.prototype.getRelatives = function (myCell) {
    var count = 0;
    var theRelatives = new Array();
    var theCol = this.puzzle.cloneCol(myCell.col);
    var theRow = this.puzzle.cloneRow(myCell.row);
    var theBox = this.puzzle.cloneBox(myCell.box);
    var i = UNIT_SIZE;
    while (i--) {
        theRelatives[count++] = theBox[i];
        if (theCol[i].box != myCell.box) {
            theRelatives[count++] = theCol[i];
        }
        if (theRow[i].box != myCell.box) {
            theRelatives[count++] = theRow[i];
        }
    }
    return theRelatives;
}

// getCommonRelatives
Solver.prototype.getCommonRelatives = function (myCell1, myCell2) {
    var theCommonRelatives = new Array();
    var theCell1Relatives = this.getRelatives(myCell1);
    var theCell2Relatives = this.getRelatives(myCell2);
    var i1 = theCell1Relatives.length;
    while (i1--) {
        var relative1 = theCell1Relatives[i1];
        var i2 = theCell2Relatives.length;
        while (i2--) {
            var relative2 = theCell2Relatives[i2];
            if (relative1 !== relative2) {
                continue;
            }
            theCommonRelatives.push(relative2);
            break;
        }
    }
    return theCommonRelatives;
}
