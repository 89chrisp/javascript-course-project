window.Deltest1 = (function() {
    "use strict";

    var deltest1 = {
        "intro": ""
    };
    deltest1.score = 0;
    var counter = 0;
    var radiobuttons = [];
    var correctAnswer = [1,2,0];
    var facit = document.getElementById("facit");
    var scoreKeeper = document.getElementById("score");

    var intro = "This test involves answering three questions in turn, "+
                "each with three alternatives to choose from. Each correct answer" +
                " will be awarded 3 points.";

    var question1 = "What of the following alternatives has something to do with tribology?" +
                    "<br>1. Fossils 1 <br>X. Ball bearing X <br>2. Hypothenuse 2";

    var question2 = "How do you write the number 73 in the binary numeral system?" +
                    "<br>1. 1001000 <br>X. 1000110 <br>2. 1001001";

    var question3 = "How far did Christian Taylor jump last year at the world championships" +
                    " in the triple jump?" +
                    "<br>1. 18.21 m <br>X. 18.29m<br>2. 18.09m";

    /**
     * Funtion that retrieves different strings depending on how many times "next"
     * was clicked. Also creates radiobuttions and calls buttonFunction and toggleClickable
     */
    deltest1.introText = function(content) {
        var returnText = "";
        switch (counter) {
            case 0:
                returnText = intro;
                break;
            case 1:
                for (var i = 0; i < 3; i++) {
                    radiobuttons[i] = document.createElement("input");
                    radiobuttons[i].setAttribute("type", "radio");
                    radiobuttons[i].setAttribute("name", "answer");
                    radiobuttons[i].classList.add("button");
                    switch (i) {
                        case 0:
                            var t1 = document.createTextNode(i+1);
                            content.appendChild(t1);
                            break;
                        case 1:
                            var t2 = document.createTextNode("X");
                            content.appendChild(t2);
                            break;
                        case 2:
                            var t3 = document.createTextNode("     " + i);
                            content.appendChild(t3);
                            break;
                        default:
                    }
                    content.appendChild(radiobuttons[i]);
                }
                buttonFunction(radiobuttons, "event");
                scoreKeeper.style.display = "block";
                scoreKeeper.innerHTML = "score: " + deltest1.score;
                returnText = question1;
                break;
            case 2:
                facit.style.display = 'none';
                buttonFunction(radiobuttons, "reset");
                toggleClickable();
                returnText = question2;
                break;
            case 3:
                facit.style.display = 'none';
                buttonFunction(radiobuttons, "reset");
                toggleClickable();
                returnText = question3;
                break;
            default:

        }
        counter += 1;
        return returnText;
    };

    var answered = 0;
    var nextLink = document.getElementById("next");
    /**
     * Funtion that checks wheter the clicked button was the correct one, compares
     * with the variable correctAnswer;
     */
    function checkAnswer(){
        var num = buttonFunction(radiobuttons, "checked");
        if(correctAnswer[answered] == num){
            // console.log("Right!");
            facit.className = "facitR";
            facit.innerHTML ="Correct!";
            facit.style.display = 'block';
            deltest1.score += 3;
        }else {
            // console.log("Wrong! Buuuu!");
            facit.className = "facitF";
            facit.innerHTML ="Wrong!";
            facit.style.display = 'block';
        }
        // console.log(num + ", " + correctAnswer[answered] + ", " + answered);
        answered +=1;
        nextLink.style.display = 'block';
        toggleClickable();
        scoreKeeper.style.display = "block";
        scoreKeeper.innerHTML = "score: " + deltest1.score;
    }

    /**
     * Funtion that does different things with the buttons-element depending
     * on the command provided.
     *
     */
    function buttonFunction(buttons, command){
        for (var i = 0; i < buttons.length; i++) {
            if(command == "reset"){
                if (buttons[i].checked){
                    buttons[i].checked = false;
                }
            }else if (command == "event") {
                buttons[i].addEventListener("click", function(){
                    checkAnswer();
                });
            }else if (command == "checked") {
                if (buttons[i].checked){
                    return i;
                }
            }
        }
    }

    /**
     * Funtion that either makes the buttons clickable or not.
     */
    function toggleClickable(){
        for (var i = 0; i < 3; i++){
            if (radiobuttons[i].style.pointerEvents === 'none'){
                radiobuttons[i].style.pointerEvents = '';
            }
            else {
                radiobuttons[i].style.pointerEvents = 'none';
            }
        }
    }
    /**
     * Public funtion that is used in reseting the test.
     */
    deltest1.reset = function(){
        deltest1.score = 0;
        counter = 0;
        answered = 0;

    };

    return deltest1;
})();
