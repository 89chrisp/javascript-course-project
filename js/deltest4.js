window.Deltest4 = (function() {
    "use strict";

    var deltest4 = {
    };
    /**
     * Public funtion starts the game by calling figureGame()
     */
    deltest4.init = function(myCont){
        figureGame(myCont);
    };
    deltest4.score = 0;

    var intro = "This test will be evaluating your visual perception and reading" +
        " comprehension. A number of different figures of varying shape and color" +
        " will be shown. You will get 15 seconds to click on each figure in the correct"+
        " order as presented by a list. ";



    var nextLink = document.getElementById("next");
    var counter = 0;
    var scoreKeeper = document.getElementById("score");
    /**
     * Public funtion that returns a string of text depending on the "next" clicks.
     */
    deltest4.getIntro = function(){
        var returnText = "";
        switch (counter) {
            case 0:
                returnText = intro;
                break;
            case 1:
                returnText = "";
                scoreKeeper.innerHTML = "score: " + deltest4.score;
                scoreKeeper.style.display = "block";
                break;
            default:

        }
        counter +=1;
        return returnText;
    };
    /**
     * Creates all shapes, moves them to random location, adds eventlisteners to shapes
     * , checks if the shape clicked was in the correct order, creates a table to
     * show the order, adds a 15 sek timer and also a countdown to show how long
     * time has passed.
     */
    function figureGame(cont){
        var shapes = [];
        var clicked = 0;
        timerFunc();
        var type =["circleR", "squareB", "triangleG", "rectangleY", "squareR",
                    "circleB", "rectangleB", "triangleR", "circleG", "squareY"];
        var listnames = ["The red circle", "The blue square", "The green triangle",
                        "The yellow rectangle", "The red square", "The blue circle",
                        "The blue rectangle", "The red triangle", "The green circle",
                        "The yellow square"];
        /**
         * Returns random int between min and max inclusive
         */
        function randInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        /** Moves an element by provided number of pixels*/
        function move(element, byX, byY) {
            element.style.left = byX +"px";
            element.style.top = byY +"px";
        }
        /** Creates all shapes, moves them and adds eventlisteners*/
        for (var i = 0; i < 10; i++) {
            shapes[i] = document.createElement("div");
            shapes[i].className = type[i];
            shapes[i].id = type[i];
            move(shapes[i], randInt(0,850), randInt(0,400));
            cont.appendChild(shapes[i]);
            addClick(i);
        }

        countDown();

        /**Adde eventlistener to element of index ind in the shapes array */
        function addClick(ind){
            var elem = shapes[ind];
            elem.addEventListener("click", function(){
                clicked += 1;
                checkOrder(ind);

            });
        }

        var facit = document.getElementById("facit");
        /** Checks if the clicked shape was in the correct order*/
        function checkOrder(ind){
            var elem = shapes[ind];
            console.log(clicked);
            if (clicked > 10) {
                facit.style.display = 'block';
                facit.className = "facitF2";
                facit.innerHTML = "Wait...";
            } else if (elem.id == type[clicked-1]) {
                facit.style.display = 'block';
                facit.className = "facitR2";
                facit.innerHTML = "Correct!";
                deltest4.score += 1;
                nameBox[clicked-1].style.fontWeight = "normal";
                if (clicked < 10) {
                    nameBox[clicked].style.fontWeight = "bold";
                }

            }else {
                facit.style.display = 'block';
                facit.className = "facitF2";
                facit.innerHTML = "Wrong!";
                nameBox[clicked-1].style.fontWeight = "normal";
                if (clicked < 10) {
                    nameBox[clicked].style.fontWeight = "bold";
                }

            }
            scoreKeeper.innerHTML = "score: " + deltest4.score;
        }

        var orderBox = document.createElement("table");
        orderBox.classList.add("orderbox");
        orderBox.id = "orderbox2";
        var myContent = document.getElementById("content");
        myContent.appendChild(orderBox);

        /**
         * This funtion creates a table representing the list of the shapes in
         * the order they should be clicked
         * @param {HTML-element} cont - element used to append content
         *
         */
        var nameBox = [];
        function createTable2(cont){
            var row = [];
            for (var i = 0; i < 4; i++) {
                row[i] = document.createElement("tr");
            }
            var c = 0;
            for ( i = 0; i < 10; i++) {
                nameBox[i] = document.createElement("td");
                nameBox[i].classList.add("orderboxtd2");
                nameBox[i].innerHTML = i+1 + ". " + listnames[i];
                row[c].appendChild(nameBox[i]);
                c += 1;
                if ((i)%3 === 0 && i>0) {
                        c = 0;
                }
            }
            for ( i = 0; i < 4; i++) {
                orderBox.appendChild(row[i]);
            }
            cont.appendChild(orderBox);
        }
        createTable2(myContent);
        nameBox[0].style.fontWeight = "bold";
        /** Makes all the figures unclickable or clickable */
        function toggleClickable(){
    		for (var i = 0; i < 10; i++){
    			if (shapes[i].style.pointerEvents === 'none'){
    				shapes[i].style.pointerEvents = '';
    			}
    			else {
    				shapes[i].style.pointerEvents = 'none';
    			}
    		}
    	}
        var timeEle = document.createElement("div");
        timeEle.classList.add("timer");
        myContent.appendChild(timeEle);
        timeEle.id = "timer";
        timeEle.innerHTML = 1;
        /** Creates a timer that shows how many seconds have gone */
        function timerFunc(){
            var timedCounter = 2;
            var timer = window.setInterval(function(){
                timeEle.innerHTML = timedCounter;
                timedCounter++;
                if (timedCounter == 17){
                    window.clearInterval(timer);
                    nextLink.style.display = 'block';
                    timeEle.style.display = "none";
                }
            }, 1000);
        }
        /** Ends test after 15 sec. */
        function countDown(){
            window.setTimeout(function(){
                toggleClickable();
                nextLink.style.display = 'block';
                facit.className = "facitF2";
                facit.innerHTML = "Time's up!";
                console.log("Time's up!");
            }, 15000);
        }

    }
    /**
     * Public funtion that is used in reseting the test.
     */
    deltest4.reset = function(){
        deltest4.score = 0;
        counter = 0;
        var t = document.getElementById("timer");
        t.parentNode.removeChild(t);
        nextLink.style.display = 'block';

    };
    return deltest4;
})();
