
var jsonObject;



/* getJSON way of doing API call
$.getJSON("https://opentdb.com/api.php?amount=10&category=17&difficulty=medium", function(json){
    
    resultQuestions(json);
    
});*/

//$("#pre-quiz").hide();
$("#quiz-section").hide();
$("#Finished").hide();

var resDiff = $("#difficulty").html();
var resNumQ = $("#questions").html();
var diffArray = ["easy", "medium", "hard"];
var curDiff;
var numberOfQ;
var diff;
var currentQ = 0;
var questions;
var correctAnswer;
var numCorrect = 0;
hoverUp();
adjustForWidth();


$(".diff").on("click", function(){
    console.log($(this).html());
    
    $("#difficulty").html($(this).html());
    diff = $(this).html();
    console.log(diff);
    curDiff = diffArray.indexOf(diff.toLowerCase());
    console.log("Current index: " + curDiff);
    if(($("#difficulty > .text").html() != "Choose Your Difficulty")&&($("#questions > .text").html() != "How Many Questions?")){
        console.log("Toggle!");
        toggleStartButton();
    }
});

$(".numQ").on("click", function(){
    console.log($(this).html());
   
    $("#questions").html($(this).html());
    numberOfQ = $(this).html();
    
    if(($("#difficulty > .text").html() != "Choose Your Difficulty")&&($("#questions > .text").html() != "How Many Questions?")){
        console.log("Toggle!");
        toggleStartButton();
    }
    
});

$("#start").on("click", function(){
    console.log("start button works!");
    fillObject(numberOfQ, diff);
    
});

$(document).on("click", ".answer", function(){
    console.log("Answer Clicked!");
    
    console.log("Your Answer: " + $(this).text() + " Correct Answer: " + correctAnswer);
    
    if($(this).text() == correctAnswer){
        console.log("correct!");
        numCorrect++;
    }
    else{
        console.log("Incorrect!");
    }
    
    if((currentQ + 1) >= (numberOfQ)){
        console.log("finished!");
        $("#quiz-section").hide();
        $("#Finished").show();
        var score = (numCorrect/(questions.length))*100;
        $("#outcome").html(score + "%");
    }
    else{
        currentQ++;
        generateQuestion(questions);
    }
});

$("#enough").on("click", function(){
    resetFullGame();
});

$("#next-level").on("click", function(){
    resetIncrementGame();
});


/* Function that monitors window width and adjusts items accordingly */
function adjustForWidth(){
    
    /* Called every time there is a change in window width */
    $(window).resize(function(){
        //console.log($(window).width());
        if($(window).width() <= 700){
            console.log("It's less!");
            $(".my-btn").css("font-size", "20px"); 
            $("#start").css("font-size", "20px");
            $(".text").css("font-size", "20px");
        }
        else if($(window).width() >= 700){
            console.log("It's more!");
            $(".my-btn").css("font-size", "40px");
            $("#start").css("font-size", "40px");
            $(".text").css("font-size", "40px");        }
    });

    /* Check screen width on launch */
    if($(window).width() <= 700){
            console.log("It's less!");
            $(".my-btn").css("font-size", "20px"); 
            $("#start").css("font-size", "20px");
            $(".text").css("font-size", "20px");
        }
    else if($(window).width() >= 700){
            console.log("It's more!");
            $(".my-btn").css("font-size", "40px");
            $("#start").css("font-size", "40px");
            $(".text").css("font-size", "40px");
    }

};


/* My favorite animation function! Creates a vertical hover animation for any image with the .hover-img class and position: absolute */
/* Two options visible here, one is commented out(setInterval method) */
function hoverUp() {
    console.log("hover!");
    
    //setInterval can be used, but it will give you a delay between animations
    /*setInterval(function(){
        $(".hover-img").animate({ top: "+=30px"})
    }, 5000);
    setInterval(function(){
        $(".hover-img").animate({ top: "-=30px"})
    }, 5000, hoverUp);*/
    
    /* Good ol' .animate method doing it's thing. This option chains together two .animate methods, the second one recusively calls this function in order to create a continuous animation. */
    $(".hover-img").animate({ top: "-=30px"}, "normal").animate({ top: "+=30px"}, "normal", hoverUp);
};



function toggleStartButton(){
    if($("#start").is(":disabled")){
        $("#start").prop("disabled",false);
        $("#start").addClass("active-start");
        $("#start").removeClass("inactive-start");
        
    }
    else{
        console.log("Already Enabled!");
    }
}

function fillObject(numQ, difficulty){
    
    $(".question-counter > h1").html((currentQ + 1) + "/" + numQ);
    
    $.ajax({
      url: "https://opentdb.com/api.php?amount=" + numQ + "&category=17&difficulty=" + difficulty.toLowerCase(),
      method: "GET"
    }).done(function(response) {
        console.log("https://opentdb.com/api.php?amount=" + numQ + "&category=17&difficulty=" + difficulty.toLowerCase());
        
      console.log(response);
      $("#pre-quiz").hide();
      $("#quiz-section").show();
      questions = response.results;
        console.log("Questions: " + questions);
      generateQuestion(questions);
    });
}

function generateQuestion(Qs){
    
    $(".question-counter > h1").html((currentQ + 1) + "/" + numberOfQ);
    var question = Qs[currentQ].question;
    console.log("This question:" + question);
    $("#question-box > h2").html(question);
    var preShuffleArray = [];
    var postShuffleArray = [];
    preShuffleArray.push(Qs[currentQ].correct_answer);
    
    correctAnswer = Qs[currentQ].correct_answer;
    Qs[currentQ].incorrect_answers.forEach(function(answer){
        preShuffleArray.push(answer);
    });
    $(".answer-list").empty();
    //console.log("Pre-Shuffled Array: " + preShuffleArray);
    postShuffleArray = shuffle(preShuffleArray);
    //console.log("Shuffled Array: " + postShuffleArray);
    postShuffleArray.forEach(function(answer){
        $(".answer-list").append($("<div></div>").addClass("row").append($("<div></div>").addClass("col-lg-12 answerCol text-center").append($("<button></button>").addClass("btn my-btn btn-primary answer").attr("type", "button").append($("<span></span>").addClass("text").html(answer)))));
        
    });
}

/* Function that shuffles any array that is entered as an argument */
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function resetFullGame(){
    $("#difficulty").html(resDiff);
    $("#questions").html(resNumQ);
    
    currentQ = 0;
    numCorrect = 0;
    numberOfQ = 0;
    
    $("#start").prop("disabled",true);
    $("#start").removeClass("active-start");
    $("#start").addClass("inactive-start");
    
    $("#pre-quiz").show();
    $("#quiz-section").hide();
    $("#Finished").hide();
}

function resetIncrementGame(){
    
    if(curDiff < diffArray.length-1){
        currentQ = 0;
        numCorrect = 0
        curDiff++;
        diff = diffArray[curDiff];
        console.log("Current Difficulty: " + (diff) + " " + curDiff);
        fillObject(numberOfQ, diff);
        $("#quiz-section").show();
        $("#Finished").hide();
    }
    else{
        console.log("maxed out difficulty!");
    }
    
}
