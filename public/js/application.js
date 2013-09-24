1. GET PLAYERS NAMES (CREATE PLAYERS / SAVE THIS INFO TO DATABASE)
2. START GAME (CREATE GAME / START TIMER)
3. END GAME (SAVE END TIME / UPDATE GAME)
4. DECLARE WINNER (SAVE WINNER TO DATABASE)

$(document).ready(function() {
  p1_finished = false
  p2_finished = false
  console.log('just begun')

$('.start').on('submit', function(event){
    console.log('just hit the start button')
    event.preventDefault();
    console.log('JS has taken over')

    $('div.start').css({'visibility':'hidden'});
  // event.preventDefault();
  console.log('just hid the start div')
  var url = $(this).attr('submit');//action may need to be submit
  var data = $(this).serialize();

  console.log(url);
  console.log(data);
    $('div.game-play').show();
  $.post(url, data, function(response) {
    console.log('POST STUFF');
    console.log(response);
    // $('div.game-play').show();
  });


  //Start game play
  $('.center-div').on('keyup', function(event){
      if (event.keyCode == 81) {
        pl1 = $('#player1_strip').find('td:not([class]):first').length
        if (pl1 == 1 && p2_finished == false) {
          $('#player1_strip').find('td.active').addClass('passive').removeClass('active');
          $('#player1_strip').find('td:not([class]):first').addClass('active');
        } else if (pl1 == 0) {

            p1_finished = true
            p2_finished = true
          $('.game-finish').css('visibility', 'visible');
          $('#winner').html('Player 1 is the winner!'); 
       }
     }
      if (event.keyCode == 80) {
        pl2 = $('#player2_strip').find('td:not([class]):first').length
        if (pl2 == 1 && p1_finished == false) {
          $('#player2_strip').find('td.active').addClass('passive').removeClass('active');
          $('#player2_strip').find('td:not([class]):first').addClass('active');
        } else if (pl2 == 0) {

            p1_finished = true
            p2_finished = true
          $('.game-finish').css('visibility', 'visible');
          $('#winner').html('Player 2 is the winner!'); 
       }
      }
    });

    //Reset Game
    resetBoard();
  });




function resetBoard(){
    $('#reset').on('click', function(e) {
    e.preventDefault();
    $('.game-finish').css('visibility','hidden');
    $('td').each(function(){
      $(this).removeAttr("class")
    });

    $('tr').each(function(){
      $(this).find('td:first').addClass('active')
    });

    p1_finished = false
    p2_finished = false
  });
});