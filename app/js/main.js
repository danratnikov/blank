(function(){

  var $dragBoxes = $('.drag'),
      $opacityField = $('#opacity-field'),
      $opacity = $('#opacity'),
      $opacityVal = $('#opacity-val'),
      $xVal = $('#xVal'),
      $yVal = $('#yVal'),
      $backgroundURL = $('#backgroundURL'),
      $watermarkURL = $('#watermarkURL');
      
  var updateCoord = function(e, ui){
    console.log(ui);
    $xVal.text(ui.position.left  + 1);
    $yVal.text(ui.position.top + 1);
  };


  var init = function(){
    $opacityVal.text($('.drag').css('opacity'));
    $dragBoxes.draggable({
      cursor: 'move',
      snap: '.result',
      drag: updateCoord
    });
    $backgroundURL.text($('#bg__img').attr('src'));
    $watermarkURL.text($('#drag__img').attr('src'));
  };


  $opacity.on('change', function(e){
    var opacity = $(e.target).val() / 100; 
    $dragBoxes.css({
      'opacity': opacity
    });
    $opacityVal.text(opacity);
  });

  init();

  
}())

