
var Player = function (nickname, stripDomID) {
  this.nickname = nickname;
  this.finished = false;
  this.stripDomID = stripDomID;
  this.won = false;
}

var Game = function (players) {
  this.players = players;
  this.startTime = new Date();

  this.movePlayer = function(thisPlayer, otherPlayer){
    var playerDomEl = $(thisPlayer.stripDomID);
    var progress = playerDomEl.find('td:not([class]):first').length

    if (progress == 1 && otherPlayer.finished == false) {
      playerDomEl.find('td.active').addClass('passive').removeClass('active');
      playerDomEl.find('td:not([class]):first').addClass('active');
    } else if (progress == 0) {
      this.endGame(thisPlayer, otherPlayer);
   }
  }

  this.endGame = function(winner, loser) {
    winner.finished = true;
    loser.finished = true;
    winner.won = true;
    $('.game-finish').css('visibility', 'visible');
    $('#winner').html(winner.nickname + ' is the winner!'); 
  }

  this.start = function() {
    var self = this;
    $(document).on('keyup',function(event){
      if (event.keyCode == 81) {
        self.movePlayer(self.players[0], self.players[1]);
      }
      if (event.keyCode == 80) {
        self.movePlayer(self.players[1], self.players[0]);
      }
    });
  }

  this.saveGame = function() {
    $.post('/winner', player, function(){
      console.log(player);
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
    game.start();
  });
}

$(document).ready(function() {
  gameStart();

  // function resetBoard() {
  //   $('#reset').on('click', function(e) {
  //     e.preventDefault();
  //     $('.game-finish').css('visibility','hidden');
  //     $('td').each(function(){  
  //     $(this).removeAttr("class")
  //     });
  //     $('tr').each(function(){
  //     $(this).find('td:first').addClass('active')
  //     });
  //       p1_finished = false
  //       p2_finished = false
  //       $('div.start-div').show();
  //   });
  // };  

// 1. GET PLAYERS NAMES (CREATE PLAYERS / SAVE THIS INFO TO DATABASE)
// 2. START GAME (CREATE GAME / START TIMER)
// 3. END GAME (SAVE END TIME / UPDATE GAME)
// 4. DECLARE WINNER (SAVE WINNER TO DATABASE)
});
