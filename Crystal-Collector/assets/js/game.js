
var wins = 0;
var losses = 0;

var gameValues = {
    goal: 0,
    current: 0,
    assignRandCrystals: function(){
        var number = Math.floor((Math.random() * 12) + 1);
        return number;
    },
    assignRandGoal: function(){
        var number = Math.floor((Math.random() * 120) + 19);
        return number;
    },
    resetValues: function(){
        fire_crystal = this.assignRandCrystals();
        ice_crystal = this.assignRandCrystals();
        dark_crystal = this.assignRandCrystals();
        plasma_crystal = this.assignRandCrystals();
        this.current = 0;
        
    }
};

hoverUp();

gameValues.goal = gameValues.assignRandGoal();
var ice_crystal = gameValues.assignRandCrystals();
var fire_crystal = gameValues.assignRandCrystals();
var dark_crystal = gameValues.assignRandCrystals();
var plasma_crystal = gameValues.assignRandCrystals();

console.log("Current Goal: " + gameValues.goal);
$("#target-score").text(gameValues.goal);
console.log(ice_crystal, fire_crystal, plasma_crystal, dark_crystal);


$(document).on("click", "button", function(event){
    
    /* Add the proper value to the current user score depending on which crystal was clicked */
    
    if($(this).hasClass("fire")){
        console.log("fire!");
        gameValues.current += fire_crystal;
        console.log(gameValues.current);
    }
    
    else if($(this).hasClass("ice")){
        console.log("ice!");
        gameValues.current += ice_crystal;
        console.log(gameValues.current);
    }
    
    else if($(this).hasClass("dark")){
        console.log("dark!");
        gameValues.current += dark_crystal;
        console.log(gameValues.current);
    }
    
    else if($(this).hasClass("plasma")){
        console.log("plasma!");
        gameValues.current += plasma_crystal;
        console.log(gameValues.current);
    }
    
    if(gameValues.current > gameValues.goal){
        console.log("You Lose!");
        losses++;
        $("#losses").text(losses);
        gameValues.resetValues();
        gameValues.goal = gameValues.assignRandGoal();
        console.log("New Goal: " + gameValues.goal);
    }
    else if(gameValues.current == gameValues.goal){
        console.log("You Win!");
        wins++;
        $("#wins").text(wins);
        gameValues.resetValues();
        gameValues.goal = gameValues.assignRandGoal();
        console.log("New Goal: " + gameValues.goal);
    }
    
    $("#score").text(gameValues.current);
    $("#target-score").text(gameValues.goal);
});

var target = $(".small-row-5").offset().top;

$(window).scroll(function(){
    if($(window).scrollTop() + $(window).height() >= target){
        
    $("#cur-score").addClass("fixed").animate;
}
else{
   $("#cur-score").removeClass("fixed");
}
});

//Infinite hover loop for any image

function hoverUp() {
    console.log("hover!");
    
    //setInterval can be used, but it will give you a delay between animations
    /*setInterval(function(){
        $(".hover-img").animate({ top: "+=30px"})
    }, 5000);
    setInterval(function(){
        $(".hover-img").animate({ top: "-=30px"})
    }, 5000, hoverUp);*/
    //setInterval
    $(".hover-img").animate({ top: "-=30px"}, "normal").animate({ top: "+=30px"}, "normal", hoverUp);
};

function getVertMargin(smallElem, parentElem){
    var largeHeight = parseInt($(parentElem).css("height"));
    var smallHeight = parseInt($(smallElem).css("height"));
    var marginAvail = largeHeight-smallHeight;
    console.log("Available: " + marginAvail);
    var marginToSet = (marginAvail/2);
    
    return marginToSet;
}
