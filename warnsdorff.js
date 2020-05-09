class WarnsdorffAlgorithm {
    constructor(rows = 8, cols = 8) {
        this.rows = rows;
        this.cols = cols;
        //Chess Board Prep using Canvas

        this.chessBoard = document.createElement('canvas');
        this.chessBoardContext = this.chessBoard.getContext('2d');
        this.chessTiles = [];
        this.chessTour = [];
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
        this.toggleWarnsdorff = this.toggleWarnsdorff.bind(this); //Toggle Binding
        //Initliaze Tiles in the board
        this.initChessBoard();
        this.chessBoard.addEventListener('click', this.toggleWarnsdorff); //Function Needed to be added

    }


    toggleWarnsdorff(event) {
        const {sqTileSize, rows, cols, chessTiles, chessTour, totalNumberOfTiles } = this;
        const offsetX = event.target.offsetLeft + sqTileSize;
        const offsetY = event.target.offsetTop + sqTileSize;
        //console.log("OffsetX :"+offsetX+" OffsetY"+offsetY);  //Did Binding the reproduce the issue
        //const x = 
        const xCord = event.clientX - offsetX;
        const yCord = event.clientY - offsetY;
        //console.log("XCORD:"+xCord+"YCORD"+yCord);
        const width = cols * sqTileSize;
        const height = rows * sqTileSize;
        if(xCord >= 0 && xCord<width && yCord>=0 && yCord< height) {
            var tileLabel;
            chessTiles.map(row => row.filter(col => {
                const [px, py] = col.position;
                const cx = px * sqTileSize;
                const xy = px * sqTileSize;
                if(xCord >= cx && xCord < cx + sqTileSize && y >= cy && y < cy + sqTileSize) {
                    tileLabel = col.label;
                }
            }));
            if(chessTour.length === totalNumberOfTiles) {
                
            }
            
        }

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

        this.drawChessBoardBase(0, 0, chessBoardBaseX * sqTileSize, chessBoardBaseY * sqTileSize, '#FFFFFF');

        for(var i = 0;i<=cols + 1;i++) {
            const offsetCols = i * sqTileSize;
            if(i > 1 && i < chessBoardBaseX) {
                this.drawChessBoardLabel('File', sqTileSize / 2, offsetCols, i);
            }
        }

        for(let j=0;j<=rows + 1;j+=1) {
            const offsetRows = j * sqTileSize;
            if(j > 1 && j < chessBoardBaseY) {
                this.drawChessBoardLabel('rank', sqTileSize / 2 , offsetRows, j);
            }
        }
        chessTiles.map(row=>row.map( col => {
            const offsetX = sqTileSize + (col.position[0] * sqTileSize);
            const offsetY = sqTileSize + (col.position[1] * sqTileSize);
            drawChessBoardBase(offsetX, offsetY, sqTileSize, sqTileSize, col.tileColor);
            return false;
        }));
        
    }

    //Make a Seperate Function for Border
    drawChessBoardBase(x, y, width, height, color) {
        const { chessBoardContext } = this;
        chessBoardContext.fillStyle = color;
        chessBoardContext.fillRect(x, y, width, height);
        
    }
    
    drawText(value, x, y) {
        const { chessBoardContext } = this;
        const font = '16px sans-serif'
        chessBoardContext.font = font;
        chessBoardContext.textAlign = 'center';
        chessBoardContext.textBaseline = 'middle';
        chessBoardContext.fillStyle = '#000';
        chessBoardContext.fillText(value, x, y);
        
    }

    //Method to Draw Label
    drawChessBoardLabel(type, center, offset, count) {
        const { sqTileSize, cols, rows } = this;
        const size = sqTileSize;
        const width = cols * size;
        const height = rows * size;
        const files = this.files.slice(0, cols);
        const ranks = this.ranks.slice(this.ranks.length - rows);
        //console.log("length - rows" + ranks);
        const double = size * 2;
        const right = double + (width - center);
        const bottom = double + (height - center);
        const align = offset - center;
        const file = files[count - 2];
        const rank = ranks[count - 2];
        if(type === 'File') {
            this.drawText(file, align, center);
            this.drawText(file, align, bottom);
            //console.log("Align , Bottom & Center:"+align+" "+bottom+" "+center);
        } 
        else if(type === 'rank') {
            this.drawText(rank, center, align);
            this.drawText(rank, right, align);
            //console.log("Align , right & Center:"+align+" "+right+" "+center);
        }
    }
}