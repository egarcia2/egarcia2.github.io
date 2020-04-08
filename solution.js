shuffleImages();

function showImage(cellNum) {
    'use strict';
    var cell = $('#' + cellNum); //selects the cell selector
    cell.attr('src', getImage(cellNum));
    console.log("showing "+ cellNum);
}

function hideImage(cellNum) {
    'use strict';
    var cell = $('#' + cellNum);
    cell.attr('src', "images/blank.jpg");
    console.log("hiding " + cellNum);
}

//global variables defined
var firstClick = 1; //1 if its the first click, 2 if its the second click
var firstClickedId = "";
var firstClickedCell = ""; 
var urlClicked = "";
var tries = 0;
var matches = 0;

function processClick(cellNum) {
    'use strict';
    showImage(cellNum);
    var imgUrl = getImage(cellNum);

    if(matches == 8){ //if the game is over, do not allow any more clicks
        return;
    }
    if (firstClick == 1) {
        firstClick = 2;
        firstClickedId = cellNum;
        urlClicked = imgUrl;
        firstClickedCell = cellNum;
    } else {
        if(cellNum == firstClickedCell){ //if the same cell was clicked twice ignore click
            console.log("click ignored, invalid click");
            return;
        }
        if (urlClicked != imgUrl) { //if the images don't match
            setTimeout(function () {hideImage(cellNum); }, 1000);
            setTimeout(function () {hideImage(firstClickedId); }, 1000);
            $("#msg").text("No match!");
        } else if (urlClicked == imgUrl){ //if the images do match
            matches += 1;
            if (matches < 8) {
                $("#msg").text("Match!");
            } else {
                $("#msg").text("Done! Game over!");
            }
        }

        $("#tries").text(tries);
        $("#matches").text(matches);
        tries += 1;
        firstClick = 1; //reset

        if (matches < 8){
            setTimeout(function () { //deletes the messages
                $("#msg").text("");
            }, 1000);
        }
    }
    

}

//add the event handlers to all the cells 
cells = document.querySelectorAll('[src="images/blank.jpg"]'); //selects all cells
cellsList = [].slice.call(cells); //turns the nodes list into an Array 

cellsList.forEach(function (element) {
    element.addEventListener('click', function (event) {
        event.preventDefault();
        processClick(element["id"]);  // non-local var
      });
});

function startNewGame() {
    shuffleImages();
    firstClick = 1; //1 if its the first click, 2 if its the second click
    firstClickedId = ""; 
    urlClicked = "";
    tries = 0;
    matches = 0;
    $("#tries").text(tries);
    $("#matches").text(matches);
    $("#msg").text("");
    //reset all the image back to blank 
    cellsList.forEach(function (element) {
        element.setAttribute("src", "images/blank.jpg");
    });
}

$("#startNewGameButton").click(startNewGame);