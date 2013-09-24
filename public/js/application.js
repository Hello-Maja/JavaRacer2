$(document).ready(function() {
  p1_finished = false
  p2_finished = false

  gameStart();
  

  function gameStart() {
    console.log('just begun');

    $('.start').on('submit', function(event){
      console.log('just hit the start button')
      event.preventDefault();
      console.log('JS has taken over?');

      $('div.start-div').css({'visibility':'hidden'});
      event.preventDefault();

      console.log('just hid the start div');
      var url = $(this).attr('action');//action may need to be submit
      var data = $(this).serialize();
      console.log(url);
      console.log(data);

      $.post(url, data, function(response) {
        console.log('POST STUFF');
        console.log(response);
        $('div.container').html(response);
        $('div.game-play').css({'visibility': 'visible'});  
        $('div.start-div').hide();
        console.log("Should be starting gameplay")
        gamePlay();
      });
    });
  };

  function resetBoard() {
    console.log('Just started resetBoard');
    $('#reset').on('click', function(e) {
      console.log('Resetting board triggered by click')
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
  };  

function gamePlay() {
  // $('form.new-button').on('submit', function(event){
    // $('form').on('click', function(e){
    console.log('Gameplay started');
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
      resetBoard();  
    });
 }; 
// 1. GET PLAYERS NAMES (CREATE PLAYERS / SAVE THIS INFO TO DATABASE)
// 2. START GAME (CREATE GAME / START TIMER)
// 3. END GAME (SAVE END TIME / UPDATE GAME)
// 4. DECLARE WINNER (SAVE WINNER TO DATABASE)




});
