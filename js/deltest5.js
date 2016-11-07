window.Deltest5 = (function() {
    "use strict";

    var deltest5 = {
    };
    /**
     * Public funtion starts the game by calling figureGame()
     */
    deltest5.init = function(myCont){
        figureGame(myCont);
    };

    var intro = "This test will be evaluating your perception. You will be shown a" +
        " figure <br> and your task is to click it if it meets the correct criteria. A correct" +
        " click will yield 1 point<br>whereas an incorrect click will subtract 1 point from" +
        " your score. The figure will be" +
        " visible for 1 second <br> and the criteria is to click all figures which are:<br>" +
        "<br>1. Not red. <br>2. Not square." +
        "<br>3. Red and square.  ";
    var text2 = "Click on any figure that is:<br><br>1. Not red. <br>2. Not square." +
                "<br>3. Red and square.  ";
    var counter = 0;
    /**
     * Public funtion that returns a string of text depending on the "next" clicks.
     */
    deltest5.getIntro = function(){
        var returnText = "";
        switch (counter) {
            case 0:
                returnText = intro;
                break;
            case 1:
                returnText = text2;
                break;
            default:

        }
        counter +=1;
        return returnText;
    };

    deltest5.score = 0;
    /**
     * Creates all shapes, adds eventlisteners to shapes, checks if the shape
     * clicked was correct, adds timerfunction to show and hide shapes every 1
     * second-
     */

    function figureGame(cont){
        var shapes = [];
        var type =["circleR", "squareB", "triangleG", "rectangleY", "squareR",
                    "squareY", "rectangleB", "triangleR", "circleG", "circleB"];

        var key = [false, false, true, true, true, false, true, false, true, true];

        /** Creates all shapes*/
        for (var i = 0; i < 10; i++) {
            shapes[i] = document.createElement("div");
            shapes[i].className = type[i];
            shapes[i].id = type[i];
            shapes[i].classList.add("center");
            cont.appendChild(shapes[i]);
            showHide(i);
            addClick(i);
        }
        /** Adds eventlistener to shapes on click*/
        function addClick(ind){
            var elem = shapes[ind];
            elem.addEventListener("click", function(){
                checkOrder();

            });
        }

        var facit = document.getElementById("facit");
        var scoreKeeper = document.getElementById("score");
        scoreKeeper.innerHTML = "score: " + deltest5.score;
        scoreKeeper.style.display = "block";
        /** Checks to see if the clicked shape was correct compared to the array key*/
        function checkOrder(){

            // var elem = shapes[ind];
            if (key[shapeCounter]) {
                facit.style.display = 'block';
                facit.className = "facitR2";
                facit.innerHTML = "Correct!";
                deltest5.score += 1;

            }else {
                facit.style.display = 'block';
                facit.className = "facitF2";
                facit.innerHTML = "Wrong!";
                deltest5.score += -1;

            }
            scoreKeeper.innerHTML = "score: " + deltest5.score;
        }
        /** Hides shape if index ind in shapes array*/
        function showHide(ind){
			shapes[ind].classList.toggle("hide");
    	}

        var shapeCounter = 0;
        /** Either shows or hides a shape every 1 second. */
        function timedFunc(){
            var timedCounter = 0;
            var nextLink = document.getElementById("next");
            var timer = window.setInterval(function(){
                if (timedCounter%2 === 0 ) {
                    facit.style.display = 'none';
                    showHide(shapeCounter);
                }else {

                    showHide(shapeCounter);
                    shapeCounter++;
                }
                timedCounter++;
                if (timedCounter == 20){
                    window.clearInterval(timer);
                    nextLink.style.display = 'block';
                }
            }, 1000);
        }
        timedFunc();
    }
    /**
     * Public funtion that is used in reseting the test.
     */
    deltest5.reset = function(){
        deltest5.score = 0;
        counter = 0;

    };

    return deltest5;
})();
