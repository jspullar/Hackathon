(function( $ ){
    function getRandomColor() {
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

  $.fn.superBlink = function( ) {
    return this.each(function() { 
        
        var randomColor;
        
        $(this).hover(
            function() {
                // If div is not clicked the set the background to randomColor
                if (!$(this).data('clicked')) {
                    randomColor = getRandomColor();
                    $(this).css( 'background-color', randomColor );
                }
            },
            function() {
                if (!$(this).data('clicked')) {
                    $(this).css( 'background-color', '#fff' );
                }
            }
        );
        
        $(this).click(function() {
            if ($(this).data('clicked')) {
                $(this).css('background-color', '#fff').data('clicked', false);
            }
            else { 
                $(this).css('background-color', randomColor).data('clicked', true);
            }
        });        
    });
  };
})( jQuery );

$(function() {
    // Display helpful message and fade it to clear
    $(document.body).append($('<div id=overlay><p>try clicking around...</p></div>'));
    
    // Fade overlay when overlay is clicked
    var fadeOutTime = 2000;
    
    $('#overlay').click(function() {
        $(this).fadeOut(fadeOutTime);
    });
    
    // Populate body with a #container div
    $(document.body).append($('<div id="container"></div>'));
    
    // Declare window height and width here to allow variable to be used
    // in determining amountX and amountY
    var newWindowHeight;
    var newWindowWidth;
    
    $(document).ready(function() {
        // Set container to current document height and width
        $('#container').height($(window).height());
        $('#container').width($(window).width());
     
        //If the User resizes the window, adjust the #container height and width
        $(window).bind('resize', resizeWindow);
        function resizeWindow() {
            newWindowHeight = $('#container').height($(window).height());
            
            newWindowWidth = $('#container').width($(window).width());
            
            console.log(newWindowHeight);
            console.log(newWindowWidth);
    
        }
    });
    
    console.log(newWindowHeight);
    console.log(newWindowWidth);
    
    var divCircle = drawCircle();
    
    // Appends .circle to #container
    // Returns height of .circle
    function drawCircle() {
        divCircle = $('#container').append($('<div>').addClass('circle'));
        this.divHeight = divCircle.height();
        return this.divHeight;
    }
    
    // Double the amounts to account for halved dimensions from class 'circle'
    var amountX = ($(window).width() / divCircle) + 1;
    var amountY = ($(window).height() / divCircle) + 1;
    var numberOfDivs = Math.round(amountX * amountY);
    
    // Write out the divs to fill the screen
     while (numberOfDivs >= 0) {
        $('#container').append($('<div>').addClass('circle'));
        numberOfDivs--;
    }
    
    // Fade overlay when any .cirlce div is clicked
    $('.circle').click(function() {
        $('#overlay').fadeOut(fadeOutTime);
    });

    $('.circle').superBlink();
});