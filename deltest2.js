window.Deltest2 = (function() {
    "use strict";

    var deltest2 = {
    };


    deltest2.score = 0;
    var counter = 0;
    var intro = "This test consists of finishing a sequence of the game Fizz Buzz." +
                "<br>The game shows a sequence of numbers. Any numbers " +
                "divisible by 3 are replaced with the word Fizz<br>and 5 with the word Buzz. " +
                "If the number is divisible by both 3 and 5 both words are" +
                " used as replacement.";

    /**
     * Funtion that generates and returns a sequence of Fizz Buzz from "start" to "stop".
     */
    function fizzBuzz(start, stop) {
        var rangeText ="";
        for (var i = start; i <= stop; i++) {
            if (i%3 === 0 && i%5 === 0) {
                rangeText += " Fizz Buzz";
            }else if (i%3 === 0) {
                rangeText += " Fizz";
            }else if (i%5 === 0) {
                rangeText += " Buzz";
            }else if (i%3 !== 0 && i%5 !== 0) {
                rangeText += " " + i;
            }
            if (i == stop) {
                rangeText += ", ...";
            }else {
                rangeText += ",";
            }
        }
        return rangeText;
    }

    var someButtons = [];
    /**
     * Function that creates the buttons and cals clicklistener on them.
     */
    function createButtons(content){
        content.style.display = 'block';
        content.className = "buttons2";
        for (var i = 0; i < 4; i++) {
            someButtons[i] = document.createElement("button");
            switch (i) {
                case 0:
                    someButtons[i].innerHTML = 20;
                    break;
                case 1:
                    someButtons[i].innerHTML ="Fizz";
                    break;
                case 2:
                    someButtons[i].innerHTML ="Buzz";
                    break;
                case 3:
                    someButtons[i].innerHTML ="Fizz Buzz";
                    break;
                default:

            }
            someButtons[i].classList.add("button2");
            someButtons[i].value = i;
            // var aButton = someButtons[i];
            clickListener(i);
            content.appendChild(someButtons[i]);
        }
    }
    /**
     * Funtion adding evventlistener on click for element of index ind.
     */
    function clickListener(ind){
        var elem = someButtons[ind];
        elem.addEventListener("click", function(){
            checkAnswer(ind);
        });
    }

    var nextLink = document.getElementById("next");
    var scoreKeeper = document.getElementById("score");
    var facit = document.getElementById("facit");

    /**
     * Funtion that checks wheter the answer was the correct one.
     */
    function checkAnswer(ind1){

        var ele = someButtons[ind1];
        if (ele.value == 1) {
            facit.className = "facitR";
            facit.innerHTML ="Correct!";
            facit.style.display = 'block';
            deltest2.score += 3;
        }else {
            facit.className = "facitF";
            facit.innerHTML ="Wrong!";
            facit.style.display = 'block';
        }
        toggleClickable();
        scoreKeeper.innerHTML = "score: " + deltest2.score;
        scoreKeeper.style.display = "block";
        nextLink.style.display = 'block';
    }

    /**
     * Public funtion that returns a string of text depending on the "next" clicks.
     * Also calls createbuttons with the in-parameter being the element they append to.
     */
    deltest2.getIntro = function(content){
        var returnText = "";
        switch (counter) {
            case 0:
                returnText = intro;
                break;
            case 1:
                returnText = fizzBuzz(4, 20);
                createButtons(content);
                scoreKeeper.innerHTML = "score: " + deltest2.score;
                scoreKeeper.style.display = "block";
                break;
            default:

        }
        counter +=1;
        return returnText;
    };
    /**
     * Funtion that either makes the buttons clickable or not.
     */
    function toggleClickable(){
        for (var i = 0; i < 4; i++){
            if (someButtons[i].style.pointerEvents === 'none'){
                someButtons[i].style.pointerEvents = '';
            }
            else {
                someButtons[i].style.pointerEvents = 'none';
            }
        }
    }
    /**
     * Public funtion that is used in reseting the test.
     */
    deltest2.reset = function(){
        deltest2.score = 0;
        counter = 0;
    };

    return deltest2;
})();
