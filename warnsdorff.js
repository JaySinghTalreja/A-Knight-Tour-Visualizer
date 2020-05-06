class WarnsdorffAlgorithm{
    constructor(rows = 8, cols = 8) {
        this.rows = rows;
        this.cols = cols;
        //Chess Board Prep using Canvas

        this.chessBoard = document.createElement('canvas');
        this.chessBoardContext = this.chessBoard.getContext('2d');
        this.chessTiles = [];

        //Set of Knight Moves
        this.moves = [
            [1, 2],
            [1, -2],
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
        //Initliaze Tiles in the board
        this.initChessBoard();
    
    }
    //Initializing Chess Board
    initChessBoard() {
        const (rows, cols, chessTiles) = this;
        const files = this.files;
        const ranks = this.ranks;
        var tileIndex=0;
        for(var i=0;i<this.rows;i++) {
            chessTiles.push([]);
            for(var j=0;j<this.cols;j++) {
                chessTiles[i][j] = {
                    id = tileIndex++,
                    position = [i, j],
                    validMoves = [],
                    label:'${files[j]}${ranks[i]}',
                    tileColor: j % 2 == i % 2 ? '#02b890' : '#134a3e', 
                };
                this.setValidMoves(chessTiles[i][j]);
            }
        }
    }

    //Set Valid Moves for every Tile
    setValidMoves(chessTile) {
        const {rows, cols, moves} = this;
        const [currentPosX, currentPosY] = chessTile.position;
        moves.filter(move => {
            const [varMoveX , varMoveY] = move;
            const newPosX = currentPosX + varMoveX;
            const newPosY = currentPosY + varMoveY;

            //Validating Position
            if(newPosX >=0 && newPosX < cols && newPosY >=0 && newPosY < rows) {
                chessTile.validMoves.push([newPosX, newPosY]);
            }
        });
    }   


}