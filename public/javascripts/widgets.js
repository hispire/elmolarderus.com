$(function() {
  $(".rslides").responsiveSlides({
    auto: true,             // Boolean: Animate automatically, true or false
    speed: 500,            // Integer: Speed of the transition, in milliseconds
    timeout: 8000,          // Integer: Time between slide transitions, in milliseconds
    pager: false,           // Boolean: Show pager, true or false
    nav: true,             // Boolean: Show navigation, true or false
    random: false,          // Boolean: Randomize the order of the slides, true or false
    pause: false,           // Boolean: Pause on hover, true or false
    pauseControls: true,    // Boolean: Pause when hovering controls, true or false
    prevText: "",   // String: Text for the "previous" button
    nextText: "",       // String: Text for the "next" button
    maxwidth: "",           // Integer: Max-width of the slideshow, in pixels
    navContainer: ".slideshow",       // Selector: Where controls should be appended to, default is after the 'ul'
    manualControls: "",     // Selector: Declare custom pager navigation
    namespace: "rslides",   // String: Change the default namespace used
    before: function(){},   // Function: Before callback
    after: function(){}     // Function: After callback
  });
});

$(document).ready(function() {
  $('.gallery__container').magnificPopup({
    delegate: 'a',
    type: 'image',
    gallery: { 
      enabled:true
      
    }
  });
  var logo_tag = "/images/logo-tag.png";
  var logo_tag__css = {'position': 'absolute', 'top': '0', 'left': '0', 'width': '9rem', 'margin-left': '0.75em'};
  $('#logo').attr("src", logo_tag);
  $('#logo').css(logo_tag__css);
  $( window ).scroll(function() {
     if($(window).scrollTop() > 200){
       $('#logo').attr("src", "/images/logo-el-molar.png");
     }else{
         $('#logo').attr("src", logo_tag);
	 $('#logo').css(logo_tag__css);
     }

});
}); 


