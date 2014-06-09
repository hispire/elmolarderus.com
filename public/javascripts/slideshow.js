/*
 * setInterval delay must be ALWAYS greater than animation delay.
 *
 * ul class= slideshow  postion: relative, padding: 0, overflow: hidden
 * li class= slideshow__item  position: relative, float: left, disdplay: block
 */


$(document).ready(function(){
  var timer = null;

  var items = $('.slideshow__item');
  items.wrapAll('<div class="slideshow__inner"></div>');


  var current = 0;



  var slideshow__inner = $('.slideshow__inner');
  var slideshow_width = 102;
  slideshow__inner.css('width', items.length * slideshow_width + '%');

  slideshow__inner.css('margin-left', ((current * slideshow_width) * -1) + '%')


  function go_to(pos) {
    

    //console.log(items[pos])

    
    s_stop()

    offset = ((pos * slideshow_width) * -1) + '%';
    
    if (current == pos) {
      offset = (current * slideshow_width);
    }

    current = pos
    slideshow__inner.animate(
      {'margin-left': offset},
      {
	duration: 1000,
	queue: false,
	complete: s_play()
      }    
    )
  }

  function s_forward() {

    next = current + 1
    if (typeof items[next] == 'undefined') {
      next = 0
    }
    
    go_to(next)

  }

  function s_backward() {

    prev = current - 1
    if (typeof items[prev] == 'undefined') {
      prev = items.length - 1;
    }
    //console.log(prev)

    go_to(prev);

  }

  function s_next() {

    s_forward();	
	  
  }

  function s_prev() {
    s_backward();
  }

  function s_play() {

    timer = setInterval(s_next, 2000);

  }

  function s_stop() {
    clearInterval(timer);
  }


  $('.button--next').click(s_next);
  $('.button--prev').click(s_prev);
  $('.button--stop').click(s_stop);
  $('.button--play').click(s_play);
  s_play();
});