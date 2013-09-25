var Player = function (nickname, stripDomID) {
  this.nickname = nickname;
  this.finished = false;
  this.stripDomID = stripDomID;
}

var Game = function (players) {
  this.players = players;
  this.startTime = new Date();

  this.start = function() {
    $(document).on('keyup',function(event){
      if (event.keyCode == 81) {
        pl1 = $('#player1_strip').find('td:not([class]):first').length
        if (pl1 == 1 && p2_finished == false) {
          $('#player1_strip').find('td.active').addClass('passive').removeClass('active');
          $('#player1_strip').find('td:not([class]):first').addClass('active');
        } else if (pl1 == 0) {
            p1_finished = true
            p2_finished = true
          sendWinner('player1');              
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
          sendWinner('player2');  
          $('.game-finish').css('visibility', 'visible');
          $('#winner').html('Player 2 is the winner!'); 
       }
      }
      resetBoard();  
    });
  }
}

function gameStart () {
  $('.start').on('submit', function(event){
    event.preventDefault();
    var playerData  = $(this).serializeArray();
    var players = [];
  

    $.each(playerData, function(i, value){  
      var stripDomID = '#player' + (i + 1) + '_strip';
      players.push(new Player(value.value, stripDomID));
    });
    var game = new Game(players);
    // game.start();
  });

}


$(document).ready(function() {
  p1_finished = false
  p2_finished = false

  gameStart();
  

  // function gameStart() {
  //   $('.start').on('submit', function(event){
  //     event.preventDefault();
  //     var url = $(this).attr('action');//action may need to be submit
  //     var playerNames = $(this).serialize();

  //     console.log(url);
  //     // .data(playerNames)
  //     // console.log(data("player1");
  //     $.post(url, playerNames, function(response) {
  //       console.log(response);
  //       $(document).html(response);
  //       $('div.game-play').css({'visibility': 'visible'});  
  //       $('div.start-div').hide();
  //       gamePlay();
  //     });
  //   });
  // };

  function resetBoard() {
    console.log('Just started resetBoard');
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
        $('div.start-div').show();
    });
  };  


// 1. GET PLAYERS NAMES (CREATE PLAYERS / SAVE THIS INFO TO DATABASE)
// 2. START GAME (CREATE GAME / START TIMER)
// 3. END GAME (SAVE END TIME / UPDATE GAME)
// 4. DECLARE WINNER (SAVE WINNER TO DATABASE)

  function sendWinner(player) {
    console.log("In the sendWinner function");
    $.post('/winner', player, function(){
      console.log(player);
    });
  }
});
