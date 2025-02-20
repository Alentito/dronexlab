$('.main-scene').on('mousemove', function (page) {
    var sensibility = 0.5;
    var offX = sensibility - page.pageX / $(window).width();
    var offY = sensibility - page.pageY / $(window).height();

    $(".parallax").each(function (i, element) {
      var offset = parseInt($(element).data('offset'));
      var translateProperty = "translate3d(" + getTranslateValue(offX, offset) + "px," + getTranslateValue(
        offY, offset) + "px, 0px)";

      $(element).css({
        '-webkit-transform': translateProperty,
        'moz-transform': translateProperty,
        'transform': translateProperty,
      });
    });
  });

  function getTranslateValue(axisOffset, generalOffset) {
    return Math.round(axisOffset * generalOffset);
  }

  // curson butto light var pos = document.documentElement;
 
  $('.hdbtn').on('mousemove', function (e) {
    // Get the dimensions and position of the button
    var buttonOffset = $(this).offset();
    var buttonWidth = $(this).width();
    var buttonHeight = $(this).height();
  
    // Calculate mouse position relative to the button
    var mouseX = e.pageX - buttonOffset.left;
    var mouseY = e.pageY - buttonOffset.top;
  
    // Constrain the light's position within the button boundaries
    var translateX = Math.max(0, Math.min(mouseX, buttonWidth));
    var translateY = Math.max(0, Math.min(mouseY, buttonHeight));
  
    // Move the light element
    $('#light').css({
      transform: `translate3d(${translateX}px, ${translateY}px, 0px)`,
    });
  });
  
  // Optional: Reset light position when the mouse leaves the button
  $('.hdbtn').on('mouseleave', function () {
    $('#light').css({
      transform: 'translate3d(50%, 50%, 0px)', // Center the light
    });
  });
  
  // A fork of this pen (cdpn.io/rkcjt).

var DrawEye = function(eyeball, pupil, eyeposx, eyeposy){
  // Initialise core variables
  var r = $(pupil).width()/2;
  var center = {
    x: $(eyeball).width()/2 - r, 
    y: $(eyeball).height()/2 - r
  };
  var distanceThreshold = $(eyeball).width();
  var mouseX = 0, mouseY = 0;
  
  // Listen for mouse movement
  $(window).mousemove(function(e){ 
    var d = {
      x: e.pageX - r - eyeposx - center.x,
      y: e.pageY - r - eyeposy - center.y
    };
    var distance = Math.sqrt(d.x*d.x + d.y*d.y);
    if (distance < distanceThreshold) {
      mouseX = e.pageX - eyeposx - r;
      mouseY = e.pageY - eyeposy - r;
    } else {
      mouseX = d.x / distance * distanceThreshold + center.x;
      mouseY = d.y / distance * distanceThreshold + center.y;
    }
  });
  
  // Update pupil location
  var pupil = $(pupil);
  var xp = 0, yp = 0;
  var loop = setInterval(function(){
    // change 1 to alter damping/momentum - higher is slower
    xp += (mouseX - xp) / 1;
    yp += (mouseY - yp) / 1;
    pupil.css({left:xp, top:yp});    
  }, 5);
};

var eye = new DrawEye("#iris", "#pupil", 0, 0);


  