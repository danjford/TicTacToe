class Board {
    constructor() {
        this.createBoard();
    }

    setState(board) {
        this.board = board;
    }

    /**
     * Creates the a 9 square TicTacToe board
     * @return {Void}, doesn't return anything
     */
    createBoard() {
        this.board = [];

        for (var i = 0, ii = 3; i < ii; i++) {
            this.board.push([0, 0, 0]);
        }
    }

    /**
     * Checks the rows to see if there is a winner
     * @return {String|Boolean}, returns the player or false if nobody has one
     */
    checkRows = function () {
        for (var i = 0, ii = this.board.length; i < ii; i++) {
            if (this.board[i][0] + this.board[i][1] + this.board[i][2] === -3) {
                return "X";
            } else if (this.board[i][0] + this.board[i][1] + this.board[i][2] === 3) {
                return "O";
            }
        }

        return false;
    };

    /**
     * Checks the columns to see if there is a winner
     * @return {String|Boolean}, returns the player or false if nobody has one
     */
    checkColumns = function () {
        for (var i = 0, ii = this.board.length; i < ii; i++) {
            if (this.board[0][i] + this.board[1][i] + this.board[2][i] === -3) {
                return "X";
            } else if (this.board[0][i] + this.board[1][i] + this.board[2][i] === 3) {
                return "O";
            }
        }

        return false;
    };

    /**
     * Checks the diagonals to see if there is a winner
     * @return {String|Boolean}, returns the player or false if nobody has one
     */
    checkDiagonals = function () {
        if (this.board[0][0] + this.board[1][1] + this.board[2][2] === -3 || this.board[0][2] + this.board[1][1] + this.board[2][0] === -3) {
            return "X";
        } else if (this.board[0][0] + this.board[1][1] + this.board[2][2] === 3 || this.board[0][2] + this.board[1][1] + this.board[2][0] === 3) {
            return "O";
        }

        return false;
    };

    /**
     * Gets a position on the board.
     * @return {Integer}, returns the player i.e. -1 or 1
     */
    getPosition = function (position) {
        return this.board[position[0]][position[1]];
    };

    /**
     * Sets a player to the position on the board if the space is not taken.
     * @param {Array} position, 'The coordinate at which the move should be set [row, col]'
     * @param {String} player, 'X' or 'O'
     * @return {Promise}
     */
    setPosition = function (position, player) {
        var _this = this;

        return new Promise(function (resolve, reject) {
            if (_this.board[position[0]][position[1]] !== 0) {
                return reject(new Error("This place is already taken."));
            } else if (player === "X") {
                _this.board[position[0]][position[1]] = -1;
            } else {
                _this.board[position[0]][position[1]] = 1;
            }

            return resolve(_this.getBoard());
        });
    };

    removePosition = function (position) {
        this.board[position[0]][position[1]] = 0;
    };

    /**
     * Checks the board if it is in stale made
     * @return {Boolean}, false if it is not in Stale Mate, else true.
     */
    staleMate = function () {
        for (var i = 0, ii = 3; i < ii; i++) {
            for (var j = 0, jj = 3; j < jj; j++) {
                if (this.board[i][j] === 0) {
                    return false;
                }
            }
        }

        return true;
    };

    /**
     * Gets a 'clone' of the board, modifying it won't affect the origianl
     * @return {Array}, An array of coordinates i.e. the board
     */
    getBoard = function () {
        return structuredClone(this.board);
    };

    /**
     * Returns the winner of the board or False.
     * @return {String|Boolean}, Returns 'X', 'O' or false.
     */
    getWinner = function () {
        return this.checkRows() || this.checkColumns() || this.checkDiagonals();
    };
}


self.Board = Board;