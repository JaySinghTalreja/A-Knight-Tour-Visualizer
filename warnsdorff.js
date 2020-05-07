class WarnsdorffAlgorithm {
    constructor(rows = 8, cols = 8) {
        this.rows = rows;
        this.cols = cols;
        //Chess Board Prep using Canvas

        this.chessBoard = document.createElement('canvas');
        this.chessBoardContext = this.chessBoard.getContext('2d');
        this.chessTiles = [];
        this.sqTileSize = null;
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


        //Object Bindings
        this.drawChessBoardBase = this.drawChessBoardBase.bind(this); //Chess Board with two extra white blocks 
        //Initliaze Tiles in the board
        this.initChessBoard();


    }
    //Initializing Chess Board
    initChessBoard() {
        const {rows, cols, chessTiles} = this;
        const files = this.files;
        const ranks = this.ranks;
        var tileIndex=0;
        for(var i=0;i<this.rows;i+=1) {
            chessTiles.push([]);
            for(var j=0;j<this.cols;j+=1) {
                chessTiles[i][j] = {
                    id : tileIndex++,
                    position : [i, j],
                    validMoves : [],
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
            
            //Test 
            //console.log("MX"+ newPosX);
            //console.log("MY"+ newPosY);

            //Validating Position
            if(newPosX >=0 && newPosX < cols && newPosY >=0 && newPosY < rows) {
                chessTile.validMoves.push([newPosX, newPosY]);
            }
        });
    }

    renderBoard({sqTileSize, container}) {
        this.sqTileSize = sqTileSize;
        const chessBoardWidth = (this.cols + 2) * sqTileSize;
        const chessBoardHeight = (this.rows + 2) * sqTileSize;
        Object.assign(this.chessBoard, {
            width: chessBoardWidth,
            height: chessBoardHeight,
        });
        container.appendChild(this.chessBoard);
        //Board Draw Function Here
        this.drawChessBoard();
    }

    drawChessBoard() {
        const { sqTileSize, chessTiles, rows, cols, drawChessBoardBase } = this;
        const chessBoardBaseX = cols + 2;  //Extra 2 for Margin
        const chessBoardBaseY = rows + 2;

        this.drawChessBoardBase(0, 0, chessBoardBaseX * sqTileSize, chessBoardBaseY * sqTileSize);

        for(var i =0;i<=this.cols;i++) {
            const offsetCols = i * sqTileSize;
            if(i > 1 && i < chessBoardBaseX) {
                
            }
        }
    }

    drawChessBoardBase(x, y, width, height) {
        const { chessBoardContext } = this;
        chessBoardContext.fillStyle = '#FF5733';
        chessBoardContext.fillRect(x, y, width, height);
    }
}