class Piece {
  constructor(x, y, isWhite, letter, pic) {
    this.matrixPosition = createVector(x, y);
    this.pixelPosition = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);

    this.taken = false;
    this.white = isWhite;
    this.letter = letter;
    this.pic = pic;
    this.movingThisPiece = false;
    this.value = 0;
  }

  //needs to extend these
  show() {
    if (!this.taken) {

      // textSize(40);
      // strokeWeight(5);
      // if(this.white){
      //   fill(255);
      //   stroke(0);
      // }else{
      //   fill(30);
      //   stroke(255);
      // }
      // textAlign(CENTER,CENTER);
      imageMode(CENTER);
      if (this.movingThisPiece) {
        // text(this.letter, mouseX,mouseY);
        image(this.pic, mouseX, mouseY, tileSize * 1.5, tileSize * 1.5);

      } else {
        // text(this.letter, this.pixelPosition.x,this.pixelPosition.y);
        image(this.pic, this.pixelPosition.x, this.pixelPosition.y, tileSize,
          tileSize);

      }
    }
  }


  generateNewBoards(currentBoard) {
    var boards = []; //all boards created from moving this piece
    var moves = this.generateMoves(currentBoard); //all the posible moves this piece can do ,as vectors
    for (var i = 0; i < moves.length; i++) { //for each move
      boards[i] = currentBoard.clone(); //create a new board
      boards[i].move(this.matrixPosition, moves[i]); //move this piece to the mvoe location
    }
    return boards;
  }


  withinBounds(x, y) {

    if (x >= 0 && y >= 0 && x < 4 && y < 4) {
      return true;
    }
    return false;

  }



  move(x, y, board) {
    var attacking = board.getPieceAt(x, y);
    if (attacking != null) {
      attacking.taken = true;
    }
    this.matrixPosition = createVector(x, y);
    this.pixelPosition = createVector(x * tileSize + tileSize / 2, y * tileSize + tileSize / 2);

  }
  attackingAllies(x, y, board) {
    var attacking = board.getPieceAt(x, y);
    if (attacking != null) {
      if(this.letter=='K' && attacking.letter=='P'){
        return true;
      }
      if(this.letter=='R' && attacking.letter=='K'){
        return true;
      }
      if(this.letter=='P' && attacking.letter=='R'){
        return true;
      }
      if (attacking.white == this.white) {
        //if they are of the same player
        return true;
      }
    }
    return false;
  }
  canMove(x, y, board) {
    if (!this.withinBounds(x, y)) {
      return false;
    }
    return true;
  }

  moveThroughPieces(x, y, board) {
    var stepDirectionX = x - this.matrixPosition.x;
    if (stepDirectionX > 0) {
      stepDirectionX = 1;
    } else if (stepDirectionX < 0) {
      stepDirectionX = -1;
    }
    var stepDirectionY = y - this.matrixPosition.y;
    if (stepDirectionY > 0) {
      stepDirectionY = 1;
    } else if (stepDirectionY < 0) {
      stepDirectionY = -1;
    }
    var tempPos = createVector(this.matrixPosition.x, this.matrixPosition.y);
    tempPos.x += stepDirectionX;
    tempPos.y += stepDirectionY;
    while (tempPos.x != x || tempPos.y != y) {

      if (board.getPieceAt(tempPos.x, tempPos.y) != null) {
        return true;
      }
      tempPos.x += stepDirectionX;
      tempPos.y += stepDirectionY;
    }
    return false;
  }
}



class King extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = "K";
    if (isWhite) {
      this.pic = images[0];

    } else {
      this.pic = images[3];
    }
    //this.value = 99;
    this.value = 1;
  }

  clone() {
    var clone = new King(this.matrixPosition.x, this.matrixPosition.y, this.white);
    clone.taken = this.taken;
    return clone;

  }



  canMove(x, y, board) {
    if (board.getPieceAt(x, y) != null && board.getPieceAt(x, y).letter=='P') {
      return false;
    }
    if (!this.withinBounds(x, y)) {
      return false;
    }
    if (this.attackingAllies(x, y, board)) {
      return false;
    }


    if ((abs(x - this.matrixPosition.x)==1 && y == this.matrixPosition.y) || (abs(y - this.matrixPosition.y)==1 && x == this.matrixPosition.x)){
      if (this.moveThroughPieces(x, y, board)) {
        return false;
      }

      return true;
    }
    return false;
  }

  generateMoves(board) {
    var moves = [];
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (abs(i+j)==1){
          var x = this.matrixPosition.x + i;
          var y = this.matrixPosition.y + j;
          if (this.withinBounds(x, y)) {
            if (i != 0 || j != 0) {
              if (!this.attackingAllies(x, y, board)) {
                moves.push(createVector(x, y))
              }
            }
          }
        }  
      }
    }
    return moves;
  }
}

class Rook extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = "R";
    if (isWhite) {
      this.pic = images[1];

    } else {
      this.pic = images[4];
    }
    this.value = 1;

  }
  canMove(x, y, board) {
    if (board.getPieceAt(x, y) != null && board.getPieceAt(x, y).letter=='K') {
      return false;
    }

    if (!this.withinBounds(x, y)) {
      return false;
    }
    if (this.attackingAllies(x, y, board)) {
      return false;
    }


    /*if (x == this.matrixPosition.x || y == this.matrixPosition.y) {
      if (this.moveThroughPieces(x, y, board)) {
        return false;
      }

      return true;
    }*/
    if ((abs(x - this.matrixPosition.x)==1 && y == this.matrixPosition.y) || (abs(y - this.matrixPosition.y)==1 && x == this.matrixPosition.x)){
      if (this.moveThroughPieces(x, y, board)) {
        return false;
      }

      return true;
    }
    return false;
  }

  generateMoves(board) {
   var moves = [];
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (abs(i+j)==1){
          var x = this.matrixPosition.x + i;
          var y = this.matrixPosition.y + j;
          if (this.withinBounds(x, y)) {
            if (i != 0 || j != 0) {
              if (!this.attackingAllies(x, y, board)) {
                moves.push(createVector(x, y))
              }
            }
          }
        }  
      }
    }
    return moves;
  }

  clone() {
    var clone = new Rook(this.matrixPosition.x, this.matrixPosition.y, this.white);
    clone.taken = this.taken;
    return clone;

  }
}

class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite);
    this.letter = "P";
    this.firstTurn = true;
    if (isWhite) {
      this.pic = images[2];

    } else {
      this.pic = images[5];
    }
    this.value = 1;

  }

  canMove(x, y, board) {
    if (board.getPieceAt(x, y) != null && board.getPieceAt(x, y).letter=='R') {
      return false;
    }
    if (!this.withinBounds(x, y)) {
      return false;
    }
    if (this.attackingAllies(x, y, board)) {
      return false;
    }


    if ((abs(x - this.matrixPosition.x)==1 && y == this.matrixPosition.y) || (abs(y - this.matrixPosition.y)==1 && x == this.matrixPosition.x)){
      if (this.moveThroughPieces(x, y, board)) {
        return false;
      }

      return true;
    }
    return false;
  }

  generateMoves(board) {
    var moves = [];
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (abs(i+j)==1){
          var x = this.matrixPosition.x + i;
          var y = this.matrixPosition.y + j;
          if (this.withinBounds(x, y)) {
            if (i != 0 || j != 0) {
              if (!this.attackingAllies(x, y, board)) {
                moves.push(createVector(x, y))
              }
            }
          }
        }  
      }
    }
    return moves;
  }

  clone() {
    var clone = new Pawn(this.matrixPosition.x, this.matrixPosition.y, this.white);
    clone.taken = this.taken;
    return clone;
  }
}
