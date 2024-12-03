var minVal = -5000,
    maxVal = 5000;

class Agent {
    constructor(player) {
        this.player = player;
    }

    createMove = async function (board) {
        this.currentBoard = board;
        this.goodMoves = [];

        this.minimax(0, 1);

        if (!this.goodMoves.length) return;

        await board.setPosition(this.bestMove().move, this.player);

        return board;
    };

    checkMoves = function () {
        var board = this.currentBoard.getBoard(),
            possibleMoves = [];

        for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
                if (board[row][col] == 0) {
                    possibleMoves.push([row, col]);
                }
            }
        }

        return possibleMoves;
    };

    minimax = function (depth, turn) {
        var possibleMoves = this.checkMoves();
        var scores = [];

        var winner = this.currentBoard.getWinner();

        if (winner === "O") {
            return 10 - depth;
        } else if (winner === "X") {
            return depth - 10;
        } else if (!possibleMoves.length) {
            return 0;
        }

        for (var i = 0, ii = possibleMoves.length; i < ii; i++) {
            if (turn === 1) {
                this.currentBoard.setPosition(possibleMoves[i], this.player);

                var score = this.minimax(depth + 1, -1);
                scores.push(score);

                if (depth === 0) {
                    this.goodMoves.push({ move: possibleMoves[i], score: score });
                }
            } else {
                this.currentBoard.setPosition(possibleMoves[i], this.player === "O" ? "X" : "O");
                scores.push(this.minimax(depth + 1, 1));
            }

            this.currentBoard.removePosition(possibleMoves[i]);
        }

        return turn == 1 ? this.maxMove(scores) : this.minMove(scores);
    };

    maxMove = function (scores) {
        var max = minVal;
        var index = -1;

        for (var i = 0; i < scores.length; i++) {
            if (scores[i] > max) {
                max = scores[i];
                index = i;
            }
        }
        return scores[index];
    };

    minMove = function (scores) {
        var min = maxVal;
        var index = -1;

        for (var i = 0; i < scores.length; i++) {
            if (scores[i] < min) {
                min = scores[i];
                index = i;
            }
        }

        return scores[index];
    };

    bestMove = function () {
        var max = minVal;
        var index = -1;

        for (var i = 0; i < this.goodMoves.length; i++) {
            if (max < this.goodMoves[i].score) {
                max = this.goodMoves[i].score;
                index = i;
            }
        }

        return this.goodMoves[index];
    };
}

self.Agent = Agent;