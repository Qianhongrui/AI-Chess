class Board {
  constructor() {
    this.whitePieces = [];
    this.blackPieces = [];
    this.score = 0;
    this.setupPieces();


  }

  setupPieces() {
    for (var i=0; i<16; i++){
    	//print(input.value().charAt(i));
    	var x=int(i%4), y=int(i/4);
    	if(input.value().charAt(i)=='A'){
    		this.whitePieces.push(new King(x, y, true));
    	}else if(input.value().charAt(i)=='B'){
    		this.whitePieces.push(new Rook(x, y, true));
    	}else if(input.value().charAt(i)=='C'){
    		this.whitePieces.push(new Pawn(x, y, true));
    	}else if(input.value().charAt(i)=='X'){
    		this.blackPieces.push(new King(x, y, false));
    	}else if(input.value().charAt(i)=='Y'){
    		this.blackPieces.push(new Rook(x, y, false));
    	}else if(input.value().charAt(i)=='Z'){
    		this.blackPieces.push(new Pawn(x, y, false));
    	}
  	}
  }

  show() {
    for (var i = 0; i < this.whitePieces.length; i++) {
      this.whitePieces[i].show();
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      this.blackPieces[i].show();
    }
  }

  isPieceAt(x, y) {
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x ==
        x && this.whitePieces[i].matrixPosition.y == y) {
        return true;
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x ==
        x && this.blackPieces[i].matrixPosition.y == y) {
        return true;
      }
    }
    return false;
  }

  getPieceAt(x, y) {
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (!this.whitePieces[i].taken && this.whitePieces[i].matrixPosition.x ==
        x && this.whitePieces[i].matrixPosition.y == y) {
        return this.whitePieces[i];
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (!this.blackPieces[i].taken && this.blackPieces[i].matrixPosition.x ==
        x && this.blackPieces[i].matrixPosition.y == y) {
        return this.blackPieces[i];
      }
    }
    return null;
  }


  generateNewBoardsWhitesTurn() {
    var boards = [];
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (!this.whitePieces[i].taken) {
        var tempArr = this.whitePieces[i].generateNewBoards(this);
        for (var j = 0; j < tempArr.length; j++) {
          boards.push(tempArr[j]);
        }
      }
    }
    return boards;
  }
  generateNewBoardsBlacksTurn() {
    var boards = [];
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (!this.blackPieces[i].taken) {
        var tempArr = this.blackPieces[i].generateNewBoards(this);
        for (var j = 0; j < tempArr.length; j++) {
          boards.push(tempArr[j]);
        }
      }
    }
    return boards;
  }

  setScore() {
    this.score = 0;
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (!this.whitePieces[i].taken) {
        this.score -= this.whitePieces[i].value;
        //print(this.score);
      } else {
        //print("something");
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (!this.blackPieces[i].taken) {
        this.score += this.blackPieces[i].value;
        //print(this.score);
      } else {
        //print("something");
      }
    }
    //print(this.score);
  }

  move(from, to) {
    var pieceToMove = this.getPieceAt(from.x, from.y);
    if (pieceToMove == null) {
      print("shit");
      return;
    }
    // if (pieceToMove.canMove(to.x, to.y, this)) {
    pieceToMove.move(to.x, to.y, this);
    // }
  }


  clone() {
    var clone = new Board();
    for (var i = 0; i < this.whitePieces.length; i++) {
      clone.whitePieces[i] = this.whitePieces[i].clone();
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      clone.blackPieces[i] = this.blackPieces[i].clone();
    }
    return clone;
  }

  isDone() {
    //return this.whitePieces[0].taken || this.blackPieces[0].taken;
    if(this.whitePieces.length==0 || this.blackPieces.length==0)
    	return ture;
    else 
    	return false;
  }
  isDead() {
    if (whiteAI && whitesMove) {
      //return this.whitePieces[0].taken;
      if (this.whitePieces.length==0)
      	return ture;
    }
    if (blackAI && !whitesMove) {
      //return this.blackPieces[0].taken;
      if (this.blackPieces.length==0)
      	return ture;
    }

    return false;
  }

  hasWon() {
    if (whiteAI && whitesMove) {
      //return this.blackPieces[0].taken;
       if (this.blackPieces.length==0)
      	return ture;
    }
    if (blackAI && !whitesMove) {
      //return this.whitePieces[0].taken;
      if (this.whitePieces.length==0)
      	return ture;
    }

    return false;
  }
}
