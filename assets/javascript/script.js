



$(document).ready(function(){
    
    
    checkLoggedIn();
   
    var signupButton = $(".signup-login");
    var leaderBoardButton = $(".ldrboards");
    var logo = $(".brand-logo-col");
    
    
    
    
    var centeredMargin = getVertMargin(signupButton, logo);
    
    getHorzMargin(logo, window);
    //console.log(centeredMargin);
    signupButton.css("margin-top", centeredMargin);
    signupButton.css("margin-bottom", centeredMargin);
    
    leaderBoardButton.css("margin-top", centeredMargin);
    leaderBoardButton.css("margin-bottom", centeredMargin);
});


/* Centers small Element vertically in comparison to a large element, both are taken as arguments. RETURNS: a margin that can be used for top and bottom.  */
function getVertMargin(smallElem, parentElem){
    var largeHeight = parseInt($(parentElem).css("height"));
    var smallHeight = parseInt($(smallElem).css("height"));
    var marginAvail = largeHeight-smallHeight;
    console.log(marginAvail);
    var marginToSet = (marginAvail/2);
    
    return marginToSet;
}

function getHorzMargin(Elem){
    var elementWidth = parseInt($(Elem).css("width"));
    var windowWidth = parseInt($(window).width());
    
    console.log("Window width: " + windowWidth);
}

function checkLoggedIn(){
    if(sessionStorage.getItem("userID") != null){
        $(".signup-login").text("Logout");
    }
}

