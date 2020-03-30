var test;
var temp;
var moving = false;

var tileSize = 100;
var movingPiece;
var whitesMove = true;
var moveCounter = 10;
var images = [];
var whiteAI = true;
var blackAI = false;

var depthPara;
var depthPlus;
var depthMinus;
var tempMaxDepth = 10;

var strat_button=false;
var input_piece=false;

let input, initiative, gote, greeting, twoP, rule, inputPiece, setPiece;

var steps=1;

function setup() {
  createCanvas(400, 400);
  htmlStuff();
  print("Start game!");

  //alert("Please choose Initiative or Gote. \nIf you don't choose, it will be played by two persons!")


  inputPiece = createElement('h2', 'Input specific pieces: ');
  inputPiece.position(500,20);

  input = createInput('AB+YCZ+BCZCX+Z+Y');
  input.position(500, 80);
  //print(input.value().charAt(1));

  setPiece = createButton('Submit')
  setPiece.position(650, 80)
  setPiece.mousePressed(SetPiece);

  initiative = createButton('Initiative');
  initiative.position(500, 180);
  initiative.mousePressed(Initiative);

  gote = createButton('Gote ');
  gote.position(600, 180); 
  gote.mousePressed(Gote);

  twoP = createButton('TwoP ');
  twoP.position(680, 180); 
  twoP.mousePressed(TwoP);


  greeting = createElement('h2', 'Initiative or Gote?');
  greeting.position(500, 100);

  rule = createElement('h3', '(Rule: A>>XY, B>>YZ, C>>ZX; X>>AB, Y>>BC, Z>>CA)');
  rule.position(500, 130);

  for (var i = 1; i < 7; i++) {
    images.push(loadImage("assets/" + i + ".png"));
  }
  /*for (var i = 1; i < 10; i++) {
    images.push(loadImage("assets/2000px-Chess_Pieces_Sprite_0" + i + ".png"));
  }
  for (var i = 10; i < 13; i++) {
    images.push(loadImage("assets/2000px-Chess_Pieces_Sprite_" + i + ".png"));
  }*/
  
  //test = new Board();
}

function Initiative() {
  whiteAI=false;
  blackAI=true;
  //initiative.hide();
  gote.hide();
  twoP.hide();
  //greeting.hide();
  strat_button = true;
}
function Gote() {
  whiteAI=true;
  blackAI=false;
  initiative.hide();
  twoP.hide();
  //gote.hide();
  //greeting.hide();
  strat_button = true;
}
function TwoP() {
  whiteAI=true;
  blackAI=true;
  initiative.hide();
  gote.hide();
  //greeting.hide();
  strat_button = true;
}
function SetPiece(){
  input_piece=true;
  test = new Board();
}

function draw() {
 
  background(100);
  showGrid();
  if(input_piece){
    test.show();
    if(strat_button){
      if(steps<=20){
        runAIs();
      }   
    }
  }
  
}

function runAIs() {
  maxDepth = tempMaxDepth;
  if (!test.isDead() && !test.hasWon()) {
    if (blackAI) {
      if (!whitesMove) {
        if (moveCounter < 0) {
          temp = test;
          test = maxFunAB(test, -400, 400, 0);
          //test = maxFun(test, 0);


          for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
              if(temp.getPieceAt(i,j) && !temp.getPieceAt(i,j).white && test.getPieceAt(i,j)==null){
                if(temp.getPieceAt(i,j))
                switch(temp.getPieceAt(i,j).letter){
                  case 'K':
                    print("Steps: ",steps);
                    print("blackMove: X move fm:",i,j);
                    steps++;
                    break;
                  case 'R':
                    print("Steps: ",steps);
                    print("blackMove: Y move fm:",i,j);
                    steps++;
                    break;
                  case 'P':
                    print("Steps: ",steps);
                    print("blackMove: Z move fm:",i,j);
                    steps++;
                    break; 
                }
              }  
              if((temp.getPieceAt(i,j)==null || temp.getPieceAt(i,j).white) && test.getPieceAt(i,j) && !test.getPieceAt(i,j).white){
                if(test.getPieceAt(i,j))
                switch(test.getPieceAt(i,j).letter){
                  case 'K':
                    print("blackMove: X move to:",i,j);
                    break;
                  case 'R':
                    print("blackMove: Y move to:",i,j);
                    break;
                  case 'P':
                    print("blackMove: Z move to:",i,j);
                    break; 
                }
              }    
            }
          }

          whitesMove = true;
          moveCounter = 10;
        } else {
          moveCounter--;
        }
      }
    }
    if (whiteAI) {
      if (whitesMove) {
        if (moveCounter < 0) {
          temp = test;
          test = minFunAB(test, -400, 400, 0);
          //test = minFun(test, 0);

          for(var i=0; i<4; i++){
            for(var j=0; j<4; j++){
              if(temp.getPieceAt(i,j) && temp.getPieceAt(i,j).white && test.getPieceAt(i,j)==null){
                if(temp.getPieceAt(i,j))
                switch(temp.getPieceAt(i,j).letter){
                  case 'K':
                    print("Steps: ",steps);
                    print("whiteMove: A move fm:",i,j);
                    steps++;
                    break;
                  case 'R':
                    print("Steps: ",steps);
                    print("whiteMove: B move fm:",i,j);
                    steps++;
                    break;
                  case 'P':
                    print("Steps: ",steps);
                    print("whiteMove: C move fm:",i,j);
                    steps++;
                    break;
                } 
              }
              if((temp.getPieceAt(i,j)==null || !temp.getPieceAt(i,j).white) && test.getPieceAt(i,j) && test.getPieceAt(i,j).white){
                if(test.getPieceAt(i,j))
                switch(test.getPieceAt(i,j).letter){
                  case 'K':
                    print("whiteMove: A move to:",i,j);
                    break;
                  case 'R':
                    print("whiteMove: B move to:",i,j);
                    break;
                  case 'P':
                    print("whiteMove: C move to:",i,j);
                    break;
                } 
              }
            }
          }

          whitesMove = false;
          moveCounter = 10;
        } else {
          moveCounter--;
        }
      }
    }
  }
}

function showGrid() {
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      if ((i + j) % 2 == 1) {
        fill(0);
      } else {
        fill(240);
      }
      noStroke();
      rect(i * tileSize, j * tileSize, tileSize, tileSize);

    }
  }
}

var tempx, tempy;

function mousePressed() {
  var x = floor(mouseX / tileSize);
  var y = floor(mouseY / tileSize);

  if(input_piece && strat_button){
    
    if (!test.isDone()) {
      if (!moving) {
        movingPiece = test.getPieceAt(x, y);
        if (movingPiece != null && movingPiece.white == whitesMove) {
          movingPiece.movingThisPiece = true;
          tempx = x, tempy = y
        } else {
          return;
        }
        
      } else {
        if (movingPiece.canMove(x, y, test)) {
          movingPiece.move(x, y, test);          
          print("Steps: ",steps);
          steps++;
          if(movingPiece.letter=='K' && whitesMove){
            print("whiteMove: A move fm:",tempx,tempy);
            print("whiteMove: A move to:",x,y);
          }
          if(movingPiece.letter=='R' && whitesMove){
            print("whiteMove: B move fm:",tempx,tempy);
            print("whiteMove: B move to:",x,y);
          }
          if(movingPiece.letter=='P' && whitesMove){
            print("whiteMove: C move fm:",tempx,tempy);
            print("whiteMove: C move to:",x,y);
          }
          if(movingPiece.letter=='K' && !whitesMove){
            print("blackMove: X move fm:",tempx,tempy);
            print("blackMove: X move to:",x,y);
          }
          if(movingPiece.letter=='R' && !whitesMove){
            print("blackMove: Y move fm:",tempx,tempy);
            print("blackMove: Y move to:",x,y);
          }
          if(movingPiece.letter=='P' && !whitesMove){
            print("blackMove: Z move fm:",tempx,tempy);
            print("blackMove: Z move to:",x,y);
          }
          movingPiece.movingThisPiece = false;
          whitesMove = !whitesMove;
        } else {
          movingPiece.movingThisPiece = false;
        }
      }
      moving = !moving;
    }
  }
}
//---------------------------------------------------------------------------------------------------------------------
function htmlStuff() {
  createP(
    ""
  )
  depthPara = createDiv("Thinking " + maxDepth + " moves ahead");
  depthMinus = createButton("-");
  depthPlus = createButton('+');

  depthPlus.mousePressed(plusDepth);
  depthMinus.mousePressed(minusDepth);

}

function minusDepth() {
  if (tempMaxDepth > 1) {
    tempMaxDepth -= 1;
    depthPara.html("Thinking " + tempMaxDepth + " moves ahead");
  }
}

function plusDepth() {
  if (tempMaxDepth < 10) {
    tempMaxDepth += 1;
    depthPara.html("Thinking " + tempMaxDepth + " moves ahead");
  }
}
