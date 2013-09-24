$(document).ready(function() {
  p1_finished = false
  p2_finished = false

  //Show login screen
  //After users are logged in create new names database
  //hide login, 
  //Label tracks with player names or display these on screen
  //Show start button
  //When start button is clicked create new game & save players
  //Hide start button and display countdown
  //Start race - log Time.now (save to database)
  //End race - log Time.now (save to database)
  //Calculate race duration and save this to database
  //Create URL (bitly style)
  //Output Winner name, race duration, URL

$('.start-button').on('submit', function(event){
  // event.preventDefault();
  $event.post('/start', function(response) {
   console.log('TEST');
   console.log(response);
   });
  });



  $(document).on('keyup', function(event){

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
