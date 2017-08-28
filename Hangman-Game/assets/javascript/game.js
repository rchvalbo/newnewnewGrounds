
/* game.js javascript file */

var game_ans;
var yourPos = [];
var numWords = 0;
var numCharacters;
var guessesLeft = 12;
var wins = 0;
var losses = 0;
var numCorrect = 0;
var guessList = [];
console.log("Number of characters in mystery word: " + numCharacters);
RandomWord();
var mystery_word = document.getElementById("current-word");


/* Monitor user decision... */
 document.onkeyup = function(event) {
     if(mystery_word.innerHTML != "LOADING..."){
     var userGuess = event.key;
     /* Only run actions if user has guesses remaining */
     if(guessesLeft > 0){

         /* Continue if the user's guess has not been chosen yet */
        if(guessList.indexOf(userGuess) < 0){
            
             console.log("User guessed: " + userGuess);
             guessList.push(userGuess);
             if((game_ans.indexOf(userGuess) >= 0)){
                 var currentGuess = "";
                 console.log("It works");
                 for(var i=0;i<game_ans.length;i++){
                     if(game_ans.charAt(i) === userGuess){
                         console.log("Found " + userGuess + " at index: " + i);
                         numCorrect++;
                         yourPos[i] = userGuess;
                         
                         console.log("Progress: " + yourPos);
                     }
                 }
                 yourPos.forEach(function(thing){
                    currentGuess += thing;
                 });
                     
                 
                 mystery_word.innerHTML = currentGuess;
                 
             }
             else{
                 
                guessesLeft--;
                document.getElementById("guesses-left").innerHTML = guessesLeft;
                 
                 if(guessesLeft<12 && guessesLeft>=8){
                    document.getElementById("guesses-left").style.color = "#ffff99";
                 }
                 else if(guessesLeft<8 && guessesLeft>=4){
                    document.getElementById("guesses-left").style.color = "#ff6600";
                 }
                 else if(guessesLeft<4){
                    document.getElementById("guesses-left").style.color = "#ff0000";
                 }
                 
                 if(guessesLeft == 0){
                     losses++;
                     document.getElementById("losses").innerHTML = losses;
                     resetValues();
                 }
             }
            
            document.getElementById("used-letters").innerHTML = guessList;
            console.log("Guess List: " + guessList + "\nGuesses Left: " + guessesLeft + "\nCorrect Guesses: ");
        }
         
         if(numCorrect == numCharacters){
             wins++; document.getElementById("wins").innerHTML = wins;
             resetValues();
         }
     
 }
     else{
         losses++;
         document.getElementById("losses").innerHTML = losses;
         resetValues();
     }
 }
 };

function RandomWord() {
        var requestStr = "http://setgetgo.com/randomword/get.php?len=8";
        $.ajax({
            url: requestStr,
            method: "GET"
        }).done( function(response){
          console.log(response);
            game_ans = response;
            
            numCharacters = game_ans.length;
            console.log("Number of characters in mystery word: " + numCharacters);
            
            mystery_word.innerHTML = "";

            for(var i=0;i<numCharacters;i++){  
                mystery_word.innerHTML += "_"; 
                yourPos.push("_");
            }

            var currentProgress = mystery_word.innerHTML;
        });
    }


function resetValues(){
    guessesLeft = 12;
    numCorrect = 0;
    guessList = [];
    yourPos = [];
    mystery_word.innerHTML = "LOADING...";
    document.getElementById("guesses-left").innerHTML = guessesLeft;
    document.getElementById("used-letters").innerHTML = "";
    document.getElementById("guesses-left").style.color = "white";
    RandomWord();
    
}