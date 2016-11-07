window.Deltest3 = (function() {
    "use strict";

    var deltest3 = {
    };

    var box = [];
    /**
     * Funtion that creates a table to house the flags.
     */
    function createTable(cont){
        var table = document.createElement("table");
        var row = [];

        for (var i = 0; i < 3; i++) {
            row[i] = document.createElement("tr");

        }
        var c = 0;
        for ( i = 0; i < 9; i++) {
            box[i] = document.createElement("td");
            row[c].appendChild(box[i]);
            if ((i+1)%3 === 0) {
                table.appendChild(row[c]);
                c += 1;
            }
        }
        cont.appendChild(table);

    }
    var intro = "This test will be evaluating your memory. You will be shown a" +
        " number of flags <br> and your task is to memorize their positions." +
        " After 5 seconds you can click the <br> now hidden flags in the correct order.";
    var counter = 0;
    /**
     * Public funtion that returns a string of text depending on the "next" clicks.
     */
    deltest3.getIntro = function(){
        var returnText = "";
        switch (counter) {
            case 0:
                returnText = intro;
                break;
            case 1:
                returnText = "";
                break;
            default:

        }
        counter +=1;
        return returnText;
    };

    /**
     * Public funtion that calls createTable and starts the "game" by calling the
     * function flagGame().
     */
    deltest3.init = function(content){
        this.content3 = content;
        createTable(this.content3);
        flagGame();
    };
    deltest3.score = 0;
    ////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    /**
     * Function that creates the flags, adds actionlisteners, timer, checks for
     * correct flag etc.
     */
    function flagGame(){
        var nrOfBlocks = 9,
    	boxes = document.getElementsByTagName('td'),
    	Flagcounter = 0,
        takenBoxes = [],
        takenFlags = [],
        flagElements = [];


        // Flag object with properties for class and subclass(es)
        var flag = {
            class1: "flag",
            subclass1: "",
            subclass2: "",
            subclass3: "",
            subclass4: "",
        };

        /** Init function to the flag object to alter classes and subclasses*/
        flag.init = function(class1, subclass1, subclass2, subclass3, subclass4){
            this.class1 = class1;
            this.subclass1 = subclass1;
            this.subclass2 = subclass2;
            this.subclass3 = subclass3;
            this.subclass4 = subclass4;
        };

        // Creating flagobjects and putting them in array with 2 flags of each type
        var flagObjects = [];
        for (var i = 0; i < 9; i++) {
            flagObjects[i] = Object.create(flag);
            flagObjects[i].init("flag" + Number(i+1), "part1", "part2", "part3", "part4");
            }

        /** Creates the HTML elements for the flag objects. Draws flags*/
        function drawFlag(flag1, target, num){
            // console.log("Drawing flag");
            var elem = document.createElement("div");
            elem.setAttribute("class", flag1.class1);
            var subelem = document.createElement("div");
            subelem.setAttribute("class", flag1.subclass1);
            elem.appendChild(subelem);
            if (flag1.subclass2 !== "") {
                var subelem2 = document.createElement("div");
                subelem2.setAttribute("class", flag1.subclass2);
                elem.appendChild(subelem2);
            }
            if (flag1.subclass3 !== "") {
                var subelem3 = document.createElement("div");
                subelem3.setAttribute("class", flag1.subclass3);
                elem.appendChild(subelem3);
            }
            if (flag1.subclass4 !== "") {
                var subelem4 = document.createElement("div");
                subelem4.setAttribute("class", flag1.subclass4);
                elem.appendChild(subelem4);
            }

            target.appendChild(elem);
            var ind = takenBoxes[num];  // Get the right index
            // console.log(ind);
            var ind2 = takenFlags[num];
            elem.id = ind2;
            flagElements[ind] = elem;
        }


        /** Makes all the boxes unclickable or clickable */
        function toggleClickable(){
    		var box = document.getElementsByTagName('td');
    		for (var i = 0; i < nrOfBlocks; i++){
    			if (box[i].style.pointerEvents === 'none'){
    				box[i].style.pointerEvents = '';
    			}
    			else {
    				box[i].style.pointerEvents = 'none';
    			}
    		}
    	}
        /** Creates html elements for all flagobjects in random order,
        * draws all flags to their boxes, adds eventlisteners to boxes*/
        function addFlags(){
            var target = randomBox(),
            rndFlag = randomFlag();
    		for (var i = 0; i < nrOfBlocks; i++){
                drawFlag(rndFlag, target, i);
                target = randomBox();
                rndFlag = randomFlag();
    		}
    	}

        addFlags();
        toggleClickable();
        timedHide();

        /** Helper function to return a random box*/
        function randomBox(){
            var randNr = Math.floor((Math.random() * 9) +1);
            while(takenBoxes.length < 9){
                // console.log(randNr);
                if (takenBoxes.indexOf(randNr-1)<0){
                    takenBoxes.push(randNr-1);
                    return boxes[randNr-1];
                }else{
                    randNr = Math.floor((Math.random() * 9) +1);
                }
            }

        }
        /** Helper function to return a random flag*/
        function randomFlag(){
            var randNr = Math.floor((Math.random() * 9) +1);
            while(takenFlags.length < 9){
                // console.log(randNr);
                if (takenFlags.indexOf(randNr-1)<0){
                    takenFlags.push(randNr-1);
                    return flagObjects[randNr-1];
                }else{
                    randNr = Math.floor((Math.random() * 9) +1);
                }
            }

        }
        /** Hides flag and adds eventlistener to a box thagt shows a flag ehen clicked*/
        function showHide(index){
            var ind = takenBoxes[index];    // Getting the right index
            var flagElem = flagElements[ind];
            flagElem.style.display = 'none';
            boxes[ind].addEventListener("click", function(){
                flagElem.style.display = 'block';
                flagElem.onclick = function(){ window.alert('You have to choose another flag'); };
        		Flagcounter++;
        		checkMatch(ind);
            });
        }
        /**Waits 5 sec and then calls showHide on all flags to hide them */
        function timedHide(){
            window.setTimeout(function () {
                for (var i = 0; i < nrOfBlocks; i++) {
                    showHide(i);
                }
                toggleClickable();
            }, 5000);
        }


        var score = 0;
        var facit = document.getElementById("facit");
        var nextLink = document.getElementById("next");
        var scoreKeeper = document.getElementById("score");
        scoreKeeper.innerHTML = "score: " + deltest3.score;
        scoreKeeper.style.display = "block";

        /**Checks wheter the box clicked was in the correct order and otherwise ends test*/
    	function checkMatch(currId){
            if (Number(flagElements[currId].id)+1 == flagorder[Flagcounter-1]){
                // console.log("TJOHO!");
                score +=1;
                facit.style.display = 'block';
                facit.className = "facitR2";
                facit.innerHTML = "Correct!";
                deltest3.score += 1;
                if (score == 9) {
                    nextLink.style.display = 'block';
                    facit.innerHTML = "Wow, full points!";
                }
            }else {
                // console.log("Wrong");
                toggleClickable();
                nextLink.style.display = 'block';
                facit.style.display = 'block';
                facit.className = "facitF2";
                facit.innerHTML = "Wrong!";
            }
            scoreKeeper.innerHTML = "score: " + deltest3.score;

    	}

        var flagorderNames = ["Sweden", "Japan","Germany", "Thailand","Norway",
                        "Denmark", "Finland", "Iceland", "France"];
        var flagorder = [6,7,2,5,8,3,9,4,1];

        var orderBox = document.createElement("table");
        orderBox.classList.add("orderbox");
        orderBox.id = "orderbox";
        var myCont = document.getElementById("content");
        myCont.appendChild(orderBox);

        var nameBox = [];
        /** Creates a table to show the order the flags should be clicked in */
        function createTable2(cont){
            var row = [];
            for (var i = 0; i < 3; i++) {
                row[i] = document.createElement("tr");
            }
            var c = 0;
            for ( i = 0; i < 9; i++) {
                nameBox[i] = document.createElement("td");
                nameBox[i].classList.add("orderboxtd");
                nameBox[i].innerHTML = i+1 + ". " + flagorderNames[flagorder[i]-1];
                row[c].appendChild(nameBox[i]);
                c += 1;
                if ((i+1)%3 === 0) {
                    c = 0;
                }
            }
            for ( i = 0; i < 3; i++) {
                orderBox.appendChild(row[i]);
            }
            cont.appendChild(orderBox);
        }
        createTable2(myCont);

    }

    /**
     * Public funtion that is used in reseting the test.
     */
    deltest3.reset = function(){
        deltest3.score = 0;
        counter = 0;


    };



    return deltest3;
})();
