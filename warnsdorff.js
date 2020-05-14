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
            [2, 1],
            [1, -2],
            [2, -1],
            [-1, 2],
            [-2, 1],
            [-1, -2],
            [-2, -1],
        ];

        this.files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        this.ranks = [8, 7, 6, 5, 4, 3, 2, 1];
        this.totalNumberOfTiles = this.cols * this.rows;
        
        
        //Tour Settings
        this.running = false;
        this.animTour=[];
        this.animPoints=[];
        this.animCount = 0;
        this.time = Date.now();
        this.increment = 0;

        //Object Bindings
        this.drawChessBoardBase = this.drawChessBoardBase.bind(this); //Chess Board with two extra white blocks 
        this.toggleWarnsdorff = this.toggleWarnsdorff.bind(this); //Toggle Binding
        this.stopTour = this.stopTour.bind(this);
        this.draw = this.draw.bind(this);
        this.filterSquare = this.filterSquare.bind(this);
        this.transformLabel = this.transformLabel.bind(this);
        this.goOnTour = this.goOnTour.bind(this);
        this.filterSquare = this.filterSquare.bind(this);
        //this.drawPoints = this.drawPoints.bind(this);

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
        if(xCord >= 0 && xCord < width && yCord>=0 && yCord < height) {
            var tileLabel;
            chessTiles.map(row => row.filter(col => {
                const [px, py] = col.position;
                const cx = px * sqTileSize;
                const cy = py * sqTileSize;
                if(xCord >= cx && xCord < cx + sqTileSize && yCord >= cy && yCord < cy + sqTileSize) {
                    tileLabel = col.label;
                }
            }));
            if(chessTour.length === totalNumberOfTiles) {
                this.resetTour();
            }
            else{
                this.initSquare(tileLabel);
                this.startTour();
                //To Be Written Here
            }
            
        }

    }
    filterSquare(square) {
        this.chessTiles.map(row => row.map(col =>
            col.validMoves.filter((move, i) => {
                if(move[0] === square[0] && move[1] === square[1]) {
                    col.validMoves.splice(i, 1);
                }
            return false;
        })));
    }

    goOnTour(knightInitialPosition) {
        const {chessTiles, chessTour, totalNumberOfTiles, filterSquare, goOnTour} = this;
        const startTile = chessTiles[knightInitialPosition[1]][knightInitialPosition[0]];
        const nextSquares = [];
        const nextMoves = [];
        let nextSquare;

        startTile.validMoves.map(move => {
            nextSquare = chessTiles[move[1]][move[0]];
            //console.log("Next Square:"+nextSquare);
            nextSquares.push(nextSquare);
            //console.log("NS:"+nextSquare.validMoves);
            nextMoves.push(nextSquare.validMoves.length);
            return false;
        });

        nextSquares.filter(next => {
            if(next.validMoves.length === Math.min(...nextMoves)) {
                nextSquare = next;
            }
            return false;
        });

        filterSquare(knightInitialPosition);
        chessTour.push(startTile.position);
        if(chessTour.length === totalNumberOfTiles) {
            return;
        }
        console.log("FINAL:"+nextSquare.position);
        goOnTour(nextSquare.position);
    }

    initSquare(tileLabel) {
        const knightInitialPosition = this.transformLabel(tileLabel);
        //To Be Done
        this.goOnTour(knightInitialPosition);
        return this;

    }


    transformLabel(tileLabel) {
        const file = tileLabel.substr(0, 1);
        const rank = tileLabel.substring(1);
        //console.log("DM"+file+" "+rank);
        const square = [file, rank];
        //console.log(square);
        const files = this.files.slice(0, this.cols);
        const ranks = this.ranks.slice(this.ranks.length - this.rows);
        const x = files.indexOf(file);
        const y = ranks.indexOf(parseInt(rank, 10));
        console.log(x, y);
        if(x < 0 || y < 0 || square.length !== 2) {
            throw new Error(`${label} , Apparently not a valid tile`);
        }
        return [x, y];
    }


    startTour() {
        this.running = true;
        //Left here
        this.draw();
    }

    stopTour() {
        this.running = false;
        cancelAnimationFrame(this.draw);
        //Left Here
    }

    resetTour() {
        this.stopTour();
        this.chessTiles = [];
        this.chessTour = [];
        this.animTour = [];
        this.animPoints = [];
        this.time = Date.now();
        this.increment =0;
        this.animCount = 0;
        //To Be Done here
        this.initChessBoard();
        this.chessBoardContext.clearRect(0 ,0, this.chessBoard.width, this.chessBoard.height);
        this.drawChessBoard();
    }

    drawPoints(points) {
        const { sqTileSize, drawChessBoardBase } = this;
        const [startX, startY] = points;
        const color = 'rgba(120, 120, 244, 0.4)';
        if(points.length) {
           drawChessBoardBase(
            sqTileSize + (startX * sqTileSize),
            sqTileSize + (startY * sqTileSize),
            sqTileSize,
            sqTileSize,
            sqTileSize,
            color);
           points.map(point => {
               const [x, y] = point;
               return drawChessBoardBase(
                   sqTileSize + (x * sqTileSize),
                   sqTileSize + (y * sqTileSize),
                   sqTileSize,
                   sqTileSize,
                   sqTileSize,
                   color);
           });
        }
    }

    draw() {
        const {running, draw, totalNumberOfTiles, chessBoard, chessBoardContext, chessTour, animTour, animPoints } = this;
        requestAnimationFrame(draw);
        if(!running) {
            return;
        }
        const dateNow = Date.now();
        const delta = dateNow - this.time;
        const interval = 1000 / 60;
        
        if(delta > interval) {
            this.time = dateNow - (delta % interval);
            chessBoardContext.clearRect(0, 0, chessBoard.width, chessBoard.height);
            this.drawChessBoard();
            if( this.animCount < chessTour.length ) {
                const [startX, startY] = chessTour[this.animCount];
                const [endX, endY] = chessTour[this.animCount + 1] ? chessTour[this.animCount + 1] : chessTour[this.animCount];
                if(this.increment === 0 && this.animCount === 0) {
                    animPoints.push(chessTour[this.animCount]);
                }
                this.increment += 0.05;
                animTour.push([
                    startX + ((endX - startX) * this.increment),
                    startY + ((endY - startY) * this.increment),
                ]);
                this.drawPoints(animPoints);            //To Be Written
                this.drawPath(animTour);                //To Be Written
                this.moveKnight([
                    startX + ((endX - startX) * this.increment),
                    startY + ((endY - startY) * this.increment),
                ]);
                if(this.increment > 1) {
                    this.increment = 0;
                    this.animCount += 1;
                    if(this.animCount !== totalNumberOfTiles) {
                        animPoints.push(chessTour[this.animCount]);
                    }
                }
                else {
                    this.drawPoints(animPoints);
                    this.drawPath(animTour);
                    this.moveKnight(chessTour[this.animCount -1]);
                    this.stopTour();
                }
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
                    id : tileIndex += 1,
                    position : [j, i],
                    validMoves : [],
                    label:`${files[j]}${ranks[i]}`,
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
        return moves.filter(move => {
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
            return this;
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