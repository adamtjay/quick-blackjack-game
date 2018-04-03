/*eslint-env jquery*/

$(document).ready(function() {


let activeDeck = [];
let retiredCards = [];
let remainingCoins = 10;
let currentBet = 0;
let turnCounter = 0;
let gameStarted = 0;
let roundWon = 0;


//Classes and objects

class Card {
  constructor(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
    }
  } // end Card class

function createDeck(){
    this.names = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'];
    this.suits = ['hearts','diamonds','spades','clubs'];
    let cards = [];

      for(var s = 0; s < this.suits.length; s++) {
          for(let n = 0; n < this.names.length; n++) {
            if (this.names[n] === 'Jack' || this.names[n] === 'Queen' || this.names[n] === 'King') {
              activeDeck.push(new Card(10, this.names[n], this.suits[s]));
            } else {
              activeDeck.push(new Card(n+1, this.names[n], this.suits[s]));
            }      }    }
      return cards;
  } // end function

function shuffle(cards) {   //using Fisher-Yates random algorithm

    let currentIndex = cards.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }   } // end function


function generateCard(thePlayer, cardValue, cardName, cardSuit) {
      console.log('generateCard');
      if (thePlayer === "House-AI") { // House-AI goes to a different card holder div on top
          let $cardHolder = $('.house-card-holder');
          let $genCard = $(`<div class="card"><div class="card-icon-${cardSuit}" data-value="${cardValue}"></div><br/><div class="cardContent">${cardName}</div></div>`);
          $cardHolder.append($genCard);
        //  house.checkFor17();
        //  house.checkForBust();
        //  house.checkForBlackjack();

      } else { // Human player goes to main card holder on bottom
          let $cardHolder = $('.player-card-holder');
          let $genCard = $(`<div class="card"><div class="card-icon-${cardSuit}" data-value="${cardValue}"></div><br/><div class="cardContent">${cardName}</div></div>`);
          $cardHolder.append($genCard);
          //player1.checkForBust();
        //  player1.checkForBlackjack();
          }    } // end function

class Player {
  constructor(num, name) {
      this.playerNum = num;
      this.playerName = name;

      this.playerHand = [];
      this.$handSum = 0;
  }
  dealCards(num) {
        // push specified # of cards from deck into temp array, then remove from deck
        let newCards = [];
        let thePlayer = this.playerName;
        for (let i=0; i<num; i++) {
          newCards.push(activeDeck[i]);
          let tempValue = activeDeck[i].value;
          let tempName = activeDeck[i].name;
          let tempSuit = activeDeck[i].suit;
          activeDeck.shift();
        }
        // callback function which sorts the new cards based on Value property
        function compareValues(a, b) {
              if (a.value < b.value) return -1;
              if (a.value > b.value) return 1;
              return 0;
            } // sort hand with the callback as arg
            newCards.sort(compareValues);

            // loop again through the now-sorted array, push to hand, run generateCard
              for (let i=0; i<newCards.length; i++) {
                let tempValue = newCards[i].value;
                let tempName = newCards[i].name;
                let tempSuit = newCards[i].suit;

                this.playerHand.push(newCards[i]);
                generateCard(thePlayer, tempValue, tempName, tempSuit);
                  }
                  //update player sum display

                  this.checkForBust();
                  this.checkForBlackjack();
                  if (this.playerName === "House-AI") {this.checkFor17()};

                updatePlayerSum();
                //console.log(`${this.playerName} hand: ${this.calcPlayerHand()}`);
              }; // end function


    checkForBlackjack() {
          let $name = this.playerName;
            //setTimeout seems to cause this.name to be undefined, so bind it to $name
          this.$handSum = 0;
          for (let i=0; i < this.playerHand.length; i++) {
            this.$handSum += this.playerHand[i].value;
          }
          if (this.$handSum === 21) {
            /*if ($name != "House-AI") { roundWon = 1};
            roundWon = 1;*/

            console.log(`${$name} has Blackjack!`);
            setTimeout(function(){alert(`${$name} has Blackjack!`)}, 200);

            if (this.playerName != "House-AI") {startDealerTurn()};
            if (this.playerName === "House-AI") {
            //  setTimeout(restartRound(), 500);
                setTimeout(player1.getBet(), 1200);
               }


            if (turnCounter === 1) {turnCounter = 2};
            if (turnCounter === 2) {turnCounter = 1};

            //house blackjack = prob won, but if player then house still has turn
            if ($name === "House-AI") {compareHands()};

                  }

            this.$handSum = 0;

          //startDealerTurn();

        } // end function *


    checkForBust() {
        let $name = this.playerName;
          //setTimeout seems to cause this.name to be undefined, so bind it to $name
          this.$handSum = 0;
          for (let i=0; i<this.playerHand.length; i++) {
            this.$handSum += this.playerHand[i].value;
          }
          if (this.$handSum > 21) {
            this.$handSum = 0;
              if (turnCounter === 2) {turnCounter = 1};
            //  turnCounter = 1;
            compareHands();

            setTimeout(function(){alert(`${$name} is bust over 21`)}, 200);
            //if (remainingCoins > 0) {setTimeout(restartRound(), 500)};
            setTimeout(player1.getBet(), 1200);
          }    } // end function

    checkFor17() {
          let $name = this.playerName;
            //setTimeout seems to cause this.name to be undefined, so bind it to $name
          let tempSum = 0;
          for (let i=0; i<this.playerHand.length; i++) {
            tempSum += this.playerHand[i].value;
          }
          if (tempSum > 17) {
            //  console.log(`${$name} has reached 17`);
              return true;
          }
        //  $this.handSum = 0;
          } // end function

    getNameAndBet() {

          restartRound();
          roundWon = 0;

          player1.playerHand.length = 0;
          house.playerHand.length = 0;

          //restart game mechanics
          remainingCoins = 10;

          let $modalContent = $('.modal-content-newgame');
          $modalContent.css('display', 'block');

          let $submit = $('.modal-newgame-submit');
          $submit.on('click', function(){

              let $name = $('.name-input').val();
              player1.playerName = $name;

              let $bet = parseInt($('.starting-bet-input').val());

              updatePlayerSum();
              updateBet($bet);

              gameStarted = 1;


              $('.starting-bet-input').val('').removeAttr('selected');
              $('.name-input').val('').removeAttr('selected');

              $modalContent.css('display', 'none');
            //  roundWon = 0;
              turnCounter = 1;

              takeTurns();
              hideFirstCard();
                  });  } // end function

    getBet() {

          restartRound();
          roundWon = 0;

          player1.playerHand.length = 0;
          house.playerHand.length = 0;

          gameStarted = 0;

          let $modalContent = $('.modal-content');
          $modalContent.css('display', 'block');

          let tempCoins = parseInt(remainingCoins) || 0;
          let $remCoinsMsg = $('.getbet-coins');
          $remCoinsMsg.text(`Coins remaining: ${tempCoins}`);

          let $submit = $('.modal-submit');
          $submit.on('click', function() {
              let $bet = parseInt($('.bet-input').val());
              updateBet($bet);
              $('.bet-input').val('').removeAttr('selected');

              $modalContent.css('display', 'none');

              gameStarted = 1;

              //roundWon = 0;
              turnCounter = 1;

            takeTurns();

            hideFirstCard();
            });      } // end function

  /*  checkGameStatus() {
          // out of coins, game over
          if (roundWon === (-1) && (remainingCoins === 0 || remainingCoins < 0)) {
            //roundWon = 0;
            turnCounter = 1;
            setTimeout(function(){alert('Out of coins, game over. Please try again')}, 500);
            setTimeout(function(){player1.getNameAndBet()}, 200);
          }
          // game just started
          if (gameStarted === 0) {
              setTimeout(function(){player1.getNameAndBet()}, 200);
          }
          // in-between rounds *** WAS INFINITE LOOPING **
          if (remainingCoins >= 0 && gameStarted === 1) {
            setTimeout(function(){player1.getBet()}, 200);
          }

          // in between rounds during game *** OLD BROKEN PART OF CHECKGAMESTATUS ***
        //  if (remainingCoins >= 0 && gameStarted != 0) {
        }     } // end function */

    calcPlayerHand() {
          let $handTotal = 0;
          for (let i=0; i<this.playerHand.length; i++) {
              $handTotal += this.playerHand[i].value;
          }
          return $handTotal;
        } // end function

  } // ***** END of Player class *****


// update coins if round was won, push to retiredCards and clear hand
function restartRound() {

      //console.log('restart roundwon: ' + roundWon);
      //let tempBet = parseInt(currentBet) || 0;
      //console.log('tempbet-' + tempBet);

      if (roundWon === 1) {
        remainingCoins = remainingCoins + (currentBet * 2);
        updateBet(currentBet);
          }

    /*  if (roundWon === (-1) && (remainingCoins === 0 || remainingCoins < 0)) {
        roundWon = 0;
        turnCounter = 1;
        setTimeout(function(){alert('Out of coins, game over. Please try again')}, 500);
      }*/

          //currentBet = 0;   // new *
          //updateBet(currentBet);
          //roundWon = 0;

      retiredCards.push(player1.playerHand);
      retiredCards.push(house.playerHand);

        // reset player hands, once other functions have run
        //  player1.playerHand.length = 0;
        //  house.playerHand.length = 0;

          updatePlayerSum();

          //clearBoard();


        } // ** end function


function clearBoard(){
      let $cardsOnBoard = $('.card');
      $cardsOnBoard.remove();
    } // end function

function restartGame() { // needs updating *** trigger from getNameAndBet
      } // ** end function


function startDealerTurn() {
        showFirstCard();
        // checks and can draw card multiple times, just to make sure it has enough cards
        if (house.checkFor17() === false) {
                  house.dealCards(1);
                }
            if (house.checkFor17() === false) {
                  house.dealCards(1);
                }
            if (house.checkFor17() === false) {
                  house.dealCards(1);
                }
            if (house.checkFor17() === false) {
                  house.dealCards(1);
                }
              // once dealer is done game is either already over, or you both stayed, so compare hands
            //  if (player1.calcPlayerHand() < 21 && house.calcPlayerHand() < 21) {

            setTimeout(function() {
                compareHands();

                      turnCounter = 1;

                      if (roundWon === (-1) && (remainingCoins === 0 || remainingCoins < 0)) {
                      //  roundWon = 0;
                        turnCounter = 1;
                        setTimeout(function(){alert('Out of coins, game over. Please try again')}, 500);
                        setTimeout(player1.getNameAndBet(), 1200);

                      } else {
                        setTimeout(player1.getBet(), 1200);
                      }

                    //  setTimeout(restartRound(), 500);

                    }, 300);
                    //  setTimeout(player1.getBet(), 1200);

                  } // ** end function

function compareHands() {
      let playersHand = player1.calcPlayerHand();
      let dealersHand = house.calcPlayerHand();
      //Reponse once a round winner is determined
    //  if ((playersHand > dealersHand && playersHand < 22) || (dealersHand > 21)) {
      if (playersHand < 22 && (playersHand > dealersHand)) {

          roundWon = 1;
          console.log(`${player1.playerName} wins the round!`);
          setTimeout(function(){alert(`${player1.playerName} wins the round!`)}, 350)
          //setTimeout(restartRound(), 800); // *** NEWLY added - helping?

        };

        //  setTimeout(player1.getBet(), 600);
          //setTimeout(restartRound, 500);
      //if ((dealersHand > playersHand && dealersHand < 22) || (playersHand > 21)) {
      if (dealersHand < 22 && (dealersHand > playersHand)) {
          roundWon = -1;
          console.log(`Dealer wins the round`);
          setTimeout(function(){alert(`Dealer wins the round`)}, 350)
          //setTimeout(restartRound(), 800); // *** NEWLY added - helping?
        };
          //setTimeout(player1.getBet(), 600)
        //  setTimeout(restartRound, 500);

        } // end function


function hideFirstCard() {
        let $firstInner = $('.cardContent').first();
        $firstInner.css('display', 'none');
        let $firstIcon = $('.cardContent').first().prev().prev();
        $firstIcon.css('display', 'none');
      } // end function

function takeTurns() {
      //setTimeout(function() {
                setTimeout(clearBoard(), 100);

                setTimeout(house.dealCards(2), 1800);
                hideFirstCard();

                setTimeout(player1.dealCards(2), 2000);

              // player turn ended, dealer turn starts
              /*if (roundWon === 0 && turnCounter === 2) {
                startDealerTurn();
              }       */      } // end function


// *** HIT button logic
$('.hit-button').on('click', function() {
    player1.dealCards(1);

    // ** needs fix now that hand gets cleared ** console.log('Player hit: ' + player1.playerHand[player1.playerHand.length-1].name);
    });

// *** STAY button logic
$('.stay-button').on('click', function() {
    turnCounter = 2;

    //takeTurns();
    startDealerTurn();
    //console.log('Stay clicked');

    });


function updateBet(num) { // updating coin display messages

      let newNum = parseInt(num) || 0;
      currentBet = parseInt(currentBet) || 0;
      remainingCoins = parseInt(remainingCoins) || 0;

      currentBet = newNum;

      //console.log('current bet-' + currentBet);
      if (gameStarted === 0) {remainingCoins -= currentBet};

      //console.log('remaining-' + remainingCoins);

      // bet display after adding to
      let $betDisplay = $('.bet-display');
      $betDisplay.text(`Bet: ${currentBet} Coins`);

      let $remCoins = $('.remaining-coins');
      $remCoins.text(`Remaining Coins: ${remainingCoins}`);
    } // end function

function showFirstCard() {
      let $firstCardInner = $('.cardContent').first();
      $firstCardInner.removeAttr('style');
      $firstCardInner.css('display' , 'block');
      let $firstCardIcon = $('.cardContent').first().prev().prev();
      $firstCardIcon.removeAttr('style');
      $firstCardIcon.css('display' , 'block');
    } // end function

function updatePlayerSum() {   // get player sum, update to .player-sum-display
      let $playerSum = player1.calcPlayerHand();
      let $playerSumDisplay = $('.player-sum-display');
      $playerSumDisplay.text(`${player1.playerName}'s Hand: ${$playerSum}`);
    } // end function


// *** for gameStart function - Executing the game flow ***

createDeck();
shuffle(activeDeck);

let house = new Player(0, "House-AI");
let player1 = new Player(1, "");

player1.getNameAndBet();
//hideFirstCard();



// ** Do not change below this **

// -- Wiggle cards on mouseover animation --
$('.card').on('mouseover', function() {
  $(this)
    .animate({'left':(-0.5)+'px'},400)
    .animate({'left':(+0.5)+'px'},400)}); // end Wiggle animation




  }); // end document rdy function
