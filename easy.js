// distance: number of pixels a puzzle piece will move
const DISTANCE = 100;

/**********************************
// STEP 1 - Create puzzlePieces data structure.
// I suggest using an array of objects but feel free to change that
// An example of a puzzle piece object could be: { name: ".box1", x: 0, y: 0 }
**********************************/

//Setting up the puzzle pieces according to their coordinates
const puzzlePieces = [{name: ".box1", x: 0, y:0},
                      {name: ".box2", x: 100, y:0},
                      {name: ".box3", x: 200, y:0},
                      {name: ".box4", x: 300, y:0},
                      {name: ".box5", x:0, y:100},
                      {name: ".box6", x:100, y:100},
                      {name: ".box7", x: 200, y:100},
                      {name: ".box8", x:300, y:100},
                      {name: ".box9", x:0, y:200},
                      {name: ".box10", x:100, y:200},
                      {name: ".box11", x:200, y:200},
                      {name: ".box12", x:300, y:200},
                      {name: ".box13", x:0, y:300},
                      {name: ".box14", x:100, y:300},
                      {name: ".box15", x:200, y:300}];

//This blankSpace is the blank space which will be used later

let blankSpace = { x: 300, y: 300, order: 16 };

const puzzle = {
  pieces: puzzlePieces,
  distance: DISTANCE,
  blankSpace,
  currentPiece: null,
  directionToMove: "",
  initialize: function(e) {
    puzzle.slide(e);

    /************************************     
    // STEP 2 - Implement initialize function such that it
    // attache click event handlers for each piece
    // and within that, invokes the slide function
    ***************************************/

    //This function displays the puzzles sequencily
    
  },
  display: function() {
    // initialize pieces to their proper order
    this.pieces.forEach(piece => {
      const pieceDOM = document.querySelector(piece.name);
      TweenLite.set(pieceDOM, { x: piece.x, y: piece.y });
    });
  },

  
  //This function slides the puuzzle pieces according to the click

  slide: function(e) {
    // call isMoveable to find out direction to move

    //This calls the function isMoveable() according to the event which returns the direction of puzzle to go
     puzzle.directionToMove = puzzle.isMoveable(e);
     puzzle.currentPiece = puzzle.pieces[e.target.dataset.idx]; 
     
     //This switch code makes the puzzle move according to the direction returned

     switch(puzzle.directionToMove){


      case "Down":

      //When the case returns down it moves the puzzle piece
              
        TweenMax.to(e.target,0.17, { x: puzzle.blankSpace.x, y: puzzle.blankSpace.y});
   
        
       
        TweenMax.to( puzzle.blankSpace, 0.17,{ x:puzzle.currentPiece.x, y:puzzle.currentPiece.y});
          puzzle.currentPiece.x = puzzle.blankSpace.x;
          puzzle.currentPiece.y = puzzle.blankSpace.y;
        
        
        break;
      case "Up":

            //When the case returns up it moves the puzzle piece up

               
        TweenMax.to(e.target,0.17, { x: puzzle.blankSpace.x, y: puzzle.blankSpace.y});
        TweenMax.to( puzzle.blankSpace,1, { x:puzzle.currentPiece.x, y:puzzle.currentPiece.y});
        puzzle.currentPiece.x = puzzle.blankSpace.x;
        puzzle.currentPiece.y = puzzle.blankSpace.y;
        

      
        break;
      case "Right":

            //When the case returns right it moves the puzzle piece right

          
                
        TweenMax.to(e.target,0.17, { x:blankSpace.x, y:blankSpace.y});
        TweenMax.to(puzzle.blankSpace,1, { x:puzzle.currentPiece.x, y:puzzle.currentPiece.y});
        puzzle.currentPiece.x = puzzle.blankSpace.x;
        puzzle.currentPiece.y = puzzle.blankSpace.y;
      
        break;
      case "Left":
         
            //When the case returns left it moves the puzzle piece left

                
        TweenMax.to(e.target,0.17, { x:blankSpace.x, y:blankSpace.y});
        TweenMax.to(puzzle.blankSpace,1, { x:puzzle.currentPiece.x, y:puzzle.currentPiece.y});
        puzzle.currentPiece.x = puzzle.blankSpace.x;
        puzzle.currentPiece.y = puzzle.blankSpace.y;
      
        break; 
      default:

            //When the case returns nothing it does nothing to the puzzle

        console.log("");

    }
    // remember to adjust coordinates including adjusting blank piece's coordinates
    /************************************
    // STEP 4 - Implement slide function so that you set x,y coordinates of appropriate puzzle piece(s)
    *********************************/

    // Now animate current puzzle piece now that x, y coordinates have been set above

    //This sets the correct posotion of the current piece

    TweenMax.to(this.currentPiece, 0.17, {
      x: puzzle.pieces[puzzle.currentPiece.dataset.idx].x,
      y: puzzle.pieces[puzzle.currentPiece.dataset.idx].y,
      ease: Power0.easeNone
    }
    );
  },
  isMoveable: function(e) {

    //This selects the targeted piece and find its coordinates

    var data = (e.target.style.transform);    
    var dataResultY = data.replace("matrix(", "");
    var dataR = dataResultY.replace(")", "");
 
    var dataResultX = dataR.split(", ");

    //The following statements returns the directions according to the position of the puzzle
    
      if(dataResultX[4]==(blankSpace.x)||dataResultX[5]==(blankSpace.y))
      {

        if(Math.abs(blankSpace.y-(dataResultX[5]))==100&& (blankSpace.y>(dataResultX[5]))){
         
          return "Down";
         
        }

        else if(Math.abs(blankSpace.y-(dataResultX[5]))==200&& (blankSpace.y>(dataResultX[5]))){

          return "two down";
        }

        else if(Math.abs(dataResultX[5]-blankSpace.y)==100&& (blankSpace.y<(dataResultX[5]))){
          return "Up";
        }

        else if(Math.abs(dataResultX[4]-blankSpace.x)==100&& (blankSpace.x<(dataResultX[4]))){
          return "Left";
        }

        else if(Math.abs(dataResultX[4]-blankSpace.x)==100&& (blankSpace.x>(dataResultX[4]))){
          
          return "Right";
        }
       
      }
      else{
        return "";
      }

    /********************************************
    // STEP 3 - Implement isMoveable function to find out / return which direction to move
    // Is the clicked piece movable?
    // If yes, then return a direction to one of: "up", "down", "left", "right"
    // If no, then return a direction of ""
     ******************************************/
  }
};

//This block of code selects all the puzzle pieces and create events on them
var pieces = document.querySelectorAll('div');
puzzle.display();

for(var i=0;i<pieces.length;i++)
{
  pieces[i].addEventListener('click', puzzle.initialize);
 
}



/* 
STEP 5 - Comment each function implemented
STEP 6 - Submit to github
STEP 7 - host on web server
*/
