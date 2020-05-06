class WarnsdorffAlgorithm{
    constructor(rows = 8, cols = 8) {
        this.rows = rows;
        this.cols = cols;
        //Chess Board Prep using Canvas

        
        this.chessBoard = document.createElement('canvas');
        this.chessBoardContext = this.chessBoard.getContext('2d');


        //Set of Knight Moves
        this.moves = [
            [1,2],
            [1,-2],
            [2, 1],
            [2, -1],
            [-1, 2],
            [-1, -2],
            [-2, 1],
            [-2, -2],
        ];

        this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.ranks = [8, 7, 6, 5, 4, 3, 2, 1];
        this.totalNumberOfTiles = this.cols * this.rows;
    }
    initChessBoard() {

    }
}