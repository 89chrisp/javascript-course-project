(function(){
    'use strict';
    /*global Deltest1, Deltest2, Deltest3, Deltest4, Deltest5 */
    var myContent = document.getElementById('content'),
    uppgift = document.createElement("div"),    //Creates an area used for most of the tests
    header = document.getElementById('header'),
    nextCounter = 0;
    uppgift.classList.add("intro");
    var text = "This intelligence test will present a number of different tests.<br>" +
                " Each test will begin with instructions on how to solve the given" +
                " problem. <br> The test as a whole will have no time constraint, however" +
                " some of the tests whitin will. <br> Good luck!";

    uppgift.innerHTML = text;
    myContent.appendChild(uppgift);


    var nextLink = document.getElementById("next");
    myContent.appendChild(nextLink);

    // Creates an area 'housing' buttons
    var buttons = document.createElement("div");
    buttons.classList.add("buttons");
    myContent.appendChild(buttons);


    var facit = document.getElementById("facit");
    var scoreKeeper = document.getElementById("score");
    scoreKeeper.style.display = "none";
    var test = 0;

    nextLink.addEventListener("click", function(){
            testFunc();
    });

    /**
     * This is the main test funtion that calls different modules and functions
     * depending on how many times the link "next" has been clicked.
     *
     */
    function testFunc(){
        if (nextCounter < 4){
            // Test1
            if (nextCounter >= 1) {
                nextLink.style.display = 'none';
            }
            header.innerHTML = "Test1";
            uppgift.innerHTML = Deltest1.introText(buttons);
            test = 1;
        }else if (nextCounter < 6){
            // Test2
            if (nextCounter == 4) {
                buttons.style.display = 'none';
                facit.style.display = 'none';
                scoreKeeper.style.display = "none";
                removeC(buttons);

            } else if (nextCounter == 5) {
                nextLink.style.display = 'none';
            }
            header.innerHTML = "Test2";
            uppgift.innerHTML = Deltest2.getIntro(buttons);
            test = 2;
        }else if (nextCounter <8){
            // Test3
            header.innerHTML = "Test3";
            uppgift.innerHTML = Deltest3.getIntro();
            test = 3;
            if (nextCounter == 6) {
                removeC(buttons);
                scoreKeeper.style.display = "none";
                facit.style.display = 'none';
            } else if (nextCounter == 7) {
                // facit.style.display = 'none';
                myContent.className = "content2";
                Deltest3.init(uppgift);
                nextLink.style.display = 'none';
            }
        } else if (nextCounter <10){
            // Test4
            header.innerHTML = "Test4";
            uppgift.innerHTML = Deltest4.getIntro();
            test = 4;
            if (nextCounter == 8) {
                scoreKeeper.style.display = "none";
                facit.style.display = 'none';
                myContent.className = "content";
                // Deltest3.init(uppgift);
                removeC(document.getElementById("orderbox"));
            }else if (nextCounter == 9) {
                myContent.className = "content2";
                nextLink.style.display = 'none';
                Deltest4.init(uppgift);
            }
        } else if (nextCounter < 12) {
            // Test5
            header.innerHTML = "Test5";
            uppgift.innerHTML = Deltest5.getIntro();
            test = 5;
            if (nextCounter == 10) {
                facit.style.display = 'none';
                myContent.className = "content";
                scoreKeeper.style.display = "none";
                // Deltest3.init(uppgift);
                removeC(document.getElementById("orderbox2"));
            }else if (nextCounter == 11) {
                // myContent.className = "content2";
                nextLink.style.display = 'none';
                Deltest5.init(uppgift);
            }
        } else if (nextCounter > 11) {
            // Results
            header.innerHTML = "Results";
            facit.style.display = 'none';
            scoreKeeper.style.display = "none";
            results();
            nextLink.style.display = 'none';
        }
        nextCounter +=1;
    }

    /**
     * Funtion that removes all childNodes from the specified element
     *
     * @param {HTML-element} element - element used to remove children
     *
     */
    function removeC(element){
        while (element.firstChild) {
        element.removeChild(element.firstChild);
        }
    }
    /**
     * Funtion that retrieves the score of each test and evaluates the result
     *
     */
    function results(){
        var max = 9+3+9+10+6;
        var total = Deltest1.score+Deltest2.score+Deltest3.score+Deltest4.score+
                    Deltest5.score;
        var res = "Test 1: " + Deltest1.score +"<br>Test 2: " + Deltest2.score +
                    "<br>Test 3: " + Deltest3.score + "<br>Test 4: " +
                    Deltest4.score + "<br>Test 5: " + Deltest5.score +"<br><br>"+
                    "Which gives you a score of " + total + " out of a maximum "+
                    max +". " + grade(total);
        uppgift.innerHTML = "The results from your intelligence test read:<br><br>" +
                            res;
        function grade(tot){
            var rtext = "";
            if (tot === max) {
                rtext = "Wow, perfect score!";
            }else if (tot > 32) {
                rtext = "Great score!";
            }else if (tot > 29) {
                rtext = "Good score!";
            }else if (tot > 25) {
                rtext = "Fair score!";
            }else if (tot > 21) {
                rtext = "Not bad.";
            }else if (tot > 18) {
                rtext = "Could be better.";
            }else if (tot <= 18) {
                rtext = "Poor effort.";
            }
            return rtext;
        }
    }
    /** Public function reachable from command-line. Used to reset the test
    * currently currently being taken.
    */
    window.reset = function(){
        switch (test) {
            case 1:
                nextCounter = 0;
                Deltest1.reset();
                removeC(buttons);
                nextLink.style.display = "block";
                facit.style.display = "none";
                testFunc();
                break;
            case 2:
                nextCounter = 4;
                Deltest2.reset();
                removeC(buttons);
                nextLink.style.display = "block";
                // Deltest2.init(facit);
                testFunc();
                break;
            case 3:
                nextCounter = 6;
                Deltest3.reset();
                myContent.className = "content";
                var ob = document.getElementById("orderbox");
                ob.parentNode.removeChild(ob);
                testFunc();
                break;
            case 4:
                nextCounter = 8;
                Deltest4.reset();
                var ob2 = document.getElementById("orderbox2");
                ob2.parentNode.removeChild(ob2);

                testFunc();
                break;
            case 5:
                nextCounter = 10;
                Deltest5.reset();
                nextLink.style.display = 'block';
                testFunc();
                break;
            default:

        }
    };


})();
