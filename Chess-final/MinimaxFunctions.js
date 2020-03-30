var maxDepth = 10;


/*function minFun(board, depth) {
  if (depth >= maxDepth) {
    board.setScore();
    return board.score;
  }

  var boards = board.generateNewBoardsWhitesTurn();
  var lowestBoardNo = 0;
  var lowestScore = 100000;
  for (var i = 0; i < boards.length; i++) {
    if (!boards[i].isDead()) {
      var score = maxFun(boards[i], depth + 1);
      if (score < lowestScore) {
        lowestBoardNo = i;
        lowestScore = score;
      }
    }
  }
  return lowestScore;
}

function maxFun(board, depth) {
  if (depth >= maxDepth) {
    board.setScore();
    return board.score;
  }


  var boards = board.generateNewBoardsBlacksTurn();
  if (depth == 0) {
    //////print(boards);
  }
  var topBoardNo = 0;
  var topScore = -100000;
  for (var i = 0; i < boards.length; i++) {
    var score = minFun(boards[i], depth + 1);
    if (score > topScore) {
      topBoardNo = i;
      topScore = score;
    }
  }

  if (depth == 0) {
    ////print(topScore);
    return boards[topBoardNo];
  }
  return topScore;
}*/

/*const gpuMatMult = gpu.createKernel(function (A, B) {
        var sum = 0;
        for (var i = 0; i < 512; i++) {
            sum += A[this.thread.y][i] * B[i][this.thread.x];
        }
        return sum;
})
.setDimensions([A.length, B.length])
.setOutputToTexture(true);*/

//const minFunAB = gpu.createKernel(function (board, alpha, beta, depth) {
function minFunAB(board, alpha, beta, depth) {

  if (depth >= maxDepth || depth+steps==21) {
    board.setScore();
    //print("!!!",board.score);
    return board.score;
  }


  if (board.isDead()) {
    if (whiteAI && whitesMove) {
      return 200;
    }
    if (blackAI && !whitesMove) {
      return -200;
    }
  }

  if (board.hasWon()) {

    if (whiteAI && whitesMove) {
      return -200;
    }
    if (blackAI && !whitesMove) {
      return 200;
    }
  }

  var boards = board.generateNewBoardsWhitesTurn();
  var lowestBoardNo = 0;
  var lowestScore = 300;
  var len = boards.length;
  for (var i = 0; i < len; i++) {

    var score = maxFunAB(boards[i], alpha, beta, depth + 1);
    if (depth == 0) {
      print(score, i, boards[i]);
    }
    if (score < lowestScore) {
      lowestBoardNo = i;
      lowestScore = score;
    } else {
      if (depth == 0 && score == lowestScore) {
        //print("same as so i do what i want", i);
        //if (random(1) < 0.1) {
          //lowestBoardNo = i;
        //}
      }
    }
    if (score < alpha) {
      //print("lowestScore!!!", lowestScore);
      return lowestScore;
    }
    if (score < beta) {
      beta = score;
    }

  }

  if (depth == 0) {
    print("lowestscore: ", boards[lowestBoardNo].score);
    return boards[lowestBoardNo];
  }
  ////print("ohNo");
  ////print(lowestScore);
  return lowestScore;
}//).setOutput([512]);
//---------------------------------------------------------------------------------------
function maxFunAB(board, alpha, beta, depth) {
  if (depth >= maxDepth || depth+steps==21) {
    board.setScore();
    return board.score;
  }

  if (board.isDead()) {
    if (whiteAI && whitesMove) {
      return 200;
    }
    if (blackAI && !whitesMove) {
      return -200;
    }
  }

  if (board.hasWon()) {
    if (whiteAI && whitesMove) {
      return -200;
    }
    if (blackAI && !whitesMove) {
      return 200;
    }
  }

  var boards = board.generateNewBoardsBlacksTurn();
  if (depth == 0) {
    //print(boards);
  }
  var topBoardNo = 0;
  var topScore = -300;
  var len = boards.length;
  for (var i = 0; i < len; i++) {

    var score = minFunAB(boards[i], alpha, beta, depth + 1);
    if (score > topScore) {
      topBoardNo = i;
      topScore = score;
    } else {
      if (depth == 0 && score == topScore) {
        //if (random(1) < 0.1) {
          //topBoardNo = i;
        //}
        //print("topScore!!!", topScore)
      }
    }
    if (score > beta) {
      return topScore;
    }
    if (score > alpha) {
      alpha = score;
    }

  }

  if (depth == 0) {
    print("topscore: ", boards[topBoardNo].score);
    return boards[topBoardNo];
  }
  return topScore;
}
