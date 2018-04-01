/*eslint-env jquery*/

$(document).ready(function() {

let activeDeck = [];
let retiredCards = [];
let remainingCoins = 5;
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
      if (thePlayer === "House-AI") { // House-AI goes to a different card holder div on top
          let $cardHolder = $('.house-card-holder');
          let $genCard = $(`<div class="card"><div class="card-icon-${cardSuit}" data-value="${cardValue}"></div><br/><div class="cardContent">${cardName}</div></div>`);
          $cardHolder.append($genCard);
          house.checkFor17();
          house.checkForBust();
          house.checkForBlackjack();

      } else { // Human player goes to main card holder on bottom
          let $cardHolder = $('.player-card-holder');
          let $genCard = $(`<div class="card"><div class="card-icon-${cardSuit}" data-value="${cardValue}"></div><br/><div class="cardContent">${cardName}</div></div>`);
          $cardHolder.append($genCard);
          player1.checkForBust();
          player1.checkForBlackjack();
          }    } // end function

class Player {
  constructor(num, name) {
      this.playerNum = num;
      this.playerName = name;

      this.remainingCoins = 5;
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
                updatePlayerSum();
                console.log(`${this.playerName} hand: ${this.calcPlayerHand()}`);
              }; // end function


    checkForBlackjack() {
          let $name = this.playerName;
            //setTimeout seems to cause this.name to be undefined, so bind it to $name
          this.$handSum = 0;
          for (let i=0; i < this.playerHand.length; i++) {
            this.$handSum += this.playerHand[i].value;
          }
          if (this.$handSum === 21) {

            roundWon = 1;

            console.log(`${$name} has Blackjack!`);
            setTimeout(function(){alert(`${$name} has Blackjack!`)}, 200);
            setTimeout(restartRound(), 500);
            setTimeout(player1.getBet(), 1200);

            if (turnCounter === 1) {turnCounter = 2};

            //house blackjack = prob won, but if player then house still has turn
            if ($name === "House-AI") {compareHands()};
          } else {
            this.$handSum = 0;
          }

        } // end function


    checkForBust() {
        let $name = this.playerName;
          //setTimeout seems to cause this.name to be undefined, so bind it to $name
          this.$handSum = 0;
          for (let i=0; i<this.playerHand.length; i++) {
            this.$handSum += this.playerHand[i].value;
          }
          if (this.$handSum > 21) {
            this.$handSum = 0;
            turnCounter = 1;
            compareHands();

            setTimeout(function(){alert(`${$name} is bust over 21`)}, 200);
            setTimeout(restartRound(), 500);
            setTimeout(player1.getBet(), 1200);
          }    } // end function

    checkFor17() {
          let $name = this.playerName;
            //setTimeout seems to cause this.name to be undefined, so bind it to $name
          this.$handSum = 0;
          for (let i=0; i<this.playerHand.length; i++) {
            this.$handSum += this.playerHand[i].value;
          }
          if (this.$handSum > 17) {
              console.log(`${$name} has reached 17`);
              return true;
          }    } // end function

    getNameAndBet() {
          //restart game mechanics
          remainingCoins = 5;

          let $modalContent = $('.modal-content-newgame');
          $modalContent.css('display', 'block');

          let $submit = $('.modal-newgame-submit');
          $submit.on('click', function(){
              gameStarted = 1;

              let $name = $('.name-input').val();
              player1.playerName = $name;

              let $bet = parseInt($('.starting-bet-input').val());

              updatePlayerSum();
              updateBet($bet);

              $modalContent.css('display', 'none');
              roundWon = 0;
              turnCounter = 1;

              takeTurns();
              hideFirstCard();
                  });  } // end function

    getBet() {

          gameStarted = 0;

          let $modalContent = $('.modal-content');
          $modalContent.css('display', 'block');

          let $submit = $('.modal-submit');
          $submit.on('click', function() {
              let $bet = parseInt($('.bet-input').val());
              updateBet($bet);
              $('.bet-input').val('').removeAttr('selected');

              $modalContent.css('display', 'none');

              roundWon = 0;
              turnCounter = 1;

            takeTurns();

            hideFirstCard();
            });      } // end function

    checkGameStatus() {
          // out of coins, game over
          if (roundWon === (-1) && (remainingCoins === 0 || remainingCoins < 0)) {
            roundWon = 0;
            turnCounter = 1;
            setTimeout(function(){alert('Out of coins, game over. Please try again')}, 500);
            setTimeout(function(){player1.getNameAndBet()}, 200);
          }
          // game just started
          if (gameStarted === 0) {
              setTimeout(function(){player1.getNameAndBet()}, 200);
          }
          // in-between rounds *** CURRENTLY INFINITE LOOPING **
          if (remainingCoins >= 0 && gameStarted === 1) {
            setTimeout(function(){player1.getBet()}, 200);
          }

          // in between rounds during game *** OLD BROKEN PART OF CHECKGAMESTATUS ***
        /*  if (remainingCoins >= 0 && gameStarted != 0) {
          }   */   } // end function

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
      if (roundWon === 1) {
        remainingCoins += currentBet;
          }

          currentBet = 0;   // new *
          updateBet(currentBet);
          roundWon = 0;

      retiredCards.push(player1.playerHand);
      retiredCards.push(house.playerHand);

      setTimeout(function removeCardsOnBoard(){
          let $cardsOnBoard = $('.card');
          $cardsOnBoard.remove()  }, 500);

        // reset player hands, once other functions have run
          player1.playerHand = [];
          house.playerHand = [];

          updatePlayerSum();


        } // ** end function


function restartGame() { // needs updating *** trigger from getNameAndBet
      } // ** end function


function startDealerTurn() {
        showFirstCard();
        // checks and can draw card multiple times, just to make sure it has enough cards
            if (house.checkFor17() === true) {
                } else {
                  house.dealCards(1);
                }
            if (house.checkFor17() === true) {
                } else {
                  house.dealCards(1);
                }
            if (house.checkFor17() === true) {
                } else {
                  house.dealCards(1);
                }
            if (house.checkFor17() === true) {
                } else {
                  house.dealCards(1);
                }
              // once dealer is done game is either already over, or you both stayed, so compare hands
              if (player1.calcPlayerHand() < 21 && house.calcPlayerHand() < 21) {
                compareHands();
                    }
                    turnCounter = 1;
                  } // ** end function

function compareHands() {
      let playersHand = player1.calcPlayerHand();
      let dealersHand = house.calcPlayerHand();
      //Reponse once a round winner is determined
      if ((playersHand > dealersHand && playersHand < 22) || (dealersHand > 21)) {
          roundWon = 1;
          console.log(`${player1.playerName} wins the round!`);
          setTimeout(function(){alert(`${player1.playerName} wins the round!`)}, 350)};

        //  setTimeout(player1.getBet(), 600);

          //setTimeout(restartRound, 500);
      if ((dealersHand > playersHand && dealersHand < 22) || (playersHand > 21)) {
          roundWon = -1;
          console.log(`Dealer wins the round`);
          setTimeout(function(){alert(`Dealer wins the round`)}, 350)};

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
      hideFirstCard();

        // start of new game, turncounter 0
        setTimeout(function() {
            /*  if (roundWon === 0 && turnCounter === 0) {
                gameStarted = 1;
                house.dealCards(2);
                player1.dealCards(2);
                hideFirstCard();
              }*/
              if (roundWon === 0 && turnCounter === 1) {
                gameStarted = 1;
                house.dealCards(2);
                player1.dealCards(2);
                hideFirstCard();
              }
              // player turn ended, dealer turn starts
              if (roundWon === 0 && turnCounter === 2) {
                startDealerTurn();
              }           }, 100)  } // end function


// *** HIT button logic
$('.hit-button').on('click', function() {
    player1.dealCards(1);

    // ** needs fix now that hand gets cleared ** console.log('Player hit: ' + player1.playerHand[player1.playerHand.length-1].name);
    });

// *** STAY button logic
$('.stay-button').on('click', function() {
    turnCounter += 1;

    startDealerTurn();
    console.log('Stay clicked');
    });


function updateBet(num) { // updating coin display messages
      currentBet = num;
      remainingCoins = remainingCoins - num;

      // bet display after adding to
      let $betDisplay = $('.bet-display');
      $betDisplay.text(`Bet: ${currentBet} Coins`);

      let $remainingCoins = $('.remaining-coins');
      $remainingCoins.text(`Remaining Coins: ${remainingCoins}`);
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

player1.checkGameStatus();
hideFirstCard();



// ** Do not change below this **

// -- Wiggle cards on mouseover animation --
$('.card').on('mouseover', function() {
  $(this)
    .animate({'left':(-0.5)+'px'},400)
    .animate({'left':(+0.5)+'px'},400)}); // end Wiggle animation




  }); // end document rdy function
