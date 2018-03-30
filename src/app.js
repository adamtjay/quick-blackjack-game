/*eslint-env jquery*/

$(document).ready(function() {

  // will these inits work in a Game state class?

let activeDeck = [];
let retiredCards = [];
let remainingCoins = 5;
let currentBet = 0;
let turnCounter = 0;
let gameStarted = 0;
let gameWon = -1; // 0 means game has started


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
            }
          }
      }
      return cards;
  }

function shuffle(cards) {   //using Fisher-Yates random algorithm

    let currentIndex = cards.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }}


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

  } // put the first card face-down, by making it all white
    function hideFirstCard() {
        let $firstInner = $('.cardContent').first();
        $firstInner.css('display', 'none');
        let $firstIcon = $('.cardContent').first().prev().prev();
        $firstIcon.css('display', 'none');
      }
    hideFirstCard();
    }

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

        // run check Functions
    //    this.checkForBust();
    //    this.checkForBlackjack();
        // if Dealer check if they've reached 17
        //if (this.playerName === "House-AI") {
        //  this.checkFor17()};
        }
      /*  if (this.playerName === "House-AI") {
          this.checkFor17();
        }
        this.checkForBust();
        this.checkForBlackjack();*/
      };

  listHand() { // log or get names of cards in hand
    console.log(`\*\* ${this.playerName}'s hand: `);
    for (let i=0; i< this.playerHand.length; i++) {
      console.log(this.playerHand[i].name);
          }
        }

    checkForBlackjack() {
      let $name = this.playerName;
        //setTimeout seems to cause this.name to be undefined, so bind it to $name
      this.$handSum = 0;
      for (let i=0; i < this.playerHand.length; i++) {
        this.$handSum += this.playerHand[i].value;
      }
      if (this.$handSum === 21) {
        if ($name != "House-AI") {
          gameWon = 1;
          }
        turnCounter += 1;
        console.log(`${$name} has Blackjack!`);
        setTimeout(function(){alert(`${$name} has Blackjack!`)}, 200);
      } else {
        //console.log(`${$name} does not have Blackjack`);
        this.$handSum = 0;
        //player1.checkGameStatus();
      }
    }


    checkForBust() {
      let $name = this.playerName;
        //setTimeout seems to cause this.name to be undefined, so bind it to $name
        this.$handSum = 0;
        for (let i=0; i<this.playerHand.length; i++) {
          this.$handSum += this.playerHand[i].value;
        }
        if (this.$handSum > 21) {
        //  gameWon = -1;
          turnCounter = 0;
          //gameStarted = 0;
          setTimeout(function(){alert(`${$name} is bust over 21`)}, 200);

          if ($name != "House-AI") {
            restartRound();
          }

          //player1.checkGameStatus();

        }
        //player1.checkGameStatus();
      }



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
      }
    }

    getNameAndBet() {
        //let $modal = $('.modal');
        //$modal.css('display', 'block');

        //restart game mechanics
        remainingCoins = 5;

        let $modalContent = $('.modal-content-newgame');
        $modalContent.css('display', 'block');

        let $submit = $('.modal-newgame-submit');
        $submit.on('click', function(){
            let $name = $('.name-input').val();
            player1.playerName = $name;

            let $bet = parseInt($('.bet-input').val(), 10);
            /*currentBet -= $bet;
            this.remainingCoins -= $bet;*/
            updateBet($bet);

            $modalContent.css('display', 'none');
            gameWon = 0;
            turnCounter = 1;

      });

        }

    getBet() {
        //let $modal = $('.modal');
        //$modal.css('display', 'block');
        let $modalContent = $('.modal-content');
        $modalContent.css('display', 'block');

        let $submit = $('modal-submit');
        $submit.on('click', function() {
            let $bet = parseInt($('.bet-input').val(), 10);
            /*currentBet -= $bet;
            this.remainingCoins -= $bet;*/
            updateBet($bet);

            $modalContent.css('display', 'none');

            restartRound();

          });
        }

    checkGameStatus() {
      // out of coins, game over
      if (remainingCoins === 0 || remainingCoins < 0) {
        setTimeout(function(){alert('Out of coins, game over. Please try again')}, 200);
        setTimeout(function(){player1.getNameAndBet()}, 200);
      }
      // game just started
      if (gameStarted === 0) {
          setTimeout(function(){player1.getNameAndBet()}, 200);
      }
      // in between rounds during game
      if (remainingCoins > 0 && gameStarted != 0) {
        setTimeout(function(){player1.getBet()}, 200);
      }
    }

  } // ---- end Player class


// clears board + pushes to retiredCards, update coins, get new bet, start round again
function restartRound() { // needs updating *** trigger from getBet

  //compareHands();

  if (gameWon === 1) {
    remainingCoins += currentBet;
  } else {remainingCoins -= currentBet};

  retiredCards.push(player1.playerHand);
  retiredCards.push(house.playerHand);

  player1.checkGameStatus();

}

function restartGame() { // needs updating *** trigger from getNameAndBet
  if (gameWon === 1) {
    remainingCoins += currentBet;
  } else {remainingCoins -= currentBet};

  retiredCards.push(player1.playerHand);
  retiredCards.push(house.playerHand);

  player1.checkGameStatus();

}


function startDealerTurn() {
  // checks and can draw card multiple times, just to make sure it has enough cards
      if (house.checkFor17() === true) {
            //console.log('Dealer has 17');
            return true;
          } else {
            house.dealCards(1);
          }
      if (house.checkFor17() === true) {
            //console.log('Dealer has 17');
            return true;
          } else {
            house.dealCards(1);
          }
      if (house.checkFor17() === true) {
            //console.log('Dealer has 17');
            return true;
          } else {
            house.dealCards(1);
          }
      if (house.checkFor17() === true) {
            //console.log('Dealer has 17');
            return true;
          } else {
            house.dealCards(1);
          }
    // once dealer is done, game is either over(!), or you compare hands
  compareHands();
}

function compareHands() {
    let playersHand = 0;
    let dealersHand = 0;
    //Sum values of both their hands separately
    for (let i=0; i<player1.playerHand.length; i++) {
      playersHand += player1.playerHand[i].value;
        }
    for (let i=0; i<house.playerHand.length; i++) {
      dealersHand += house.playerHand[i].value;
    }
    //Reponse once a round winner is determined
    if (playersHand > dealersHand && playersHand < 22) {
      gameWon = 1;
      console.log(`${player1.playerName} wins the round!`)};
    if (dealersHand > playersHand && dealersHand < 22) {
      gameWon = -1;
      console.log(`Dealer wins`)};
      }


// Turn Taking logic

function takeTurns() {
  //check for Player turn
  player1.checkGameStatus();

  if (gameWon === -1 && turnCounter === 0) {
    gameStarted = 1;
    house.dealCards(2);
    player1.dealCards(2);
  }
  if (gameWon === 0 && turnCounter === 2) {
    console.log('Start dealer turn');
    startDealerTurn();

    restartRound();
  //  compareHands();
  }

}


// *** HIT button logic
$('.hit-button').on('click', function() {
    player1.dealCards(1);

    console.log('Player hit: ' + player1.playerHand[player1.playerHand.length-1].name);
    });

// *** STAY button logic
$('.stay-button').on('click', function() {
    turnCounter += 1;

    startDealerTurn();
    console.log('Stay clicked');
    });


// ** Updating the coin display msgs

function updateBet(num) {
  currentBet += num;
  remainingCoins -= num;

  // bet display after adding to
  let $betDisplay = $('.bet-display');
  $betDisplay.text(`Current Bet: ${currentBet} Coins`);

  // total coins display (should include current bet or no?)
  let $remainingCoins = $('.total-coins');
  $remainingCoins.text(`Remaining Coins: ${remainingCoins}`);
  }




// *** for gameStart function - Execute game flow ***

createDeck();
shuffle(activeDeck);

let house = new Player(0, "House-AI");
let player1 = new Player(1, "Name");

//updateBet(2);

//house.dealCards(2);
//player1.dealCards(2);

house.listHand();

//player1.getNameAndBet();
takeTurns();


//player1.listHand();
//console.log(activeDeck);



// ** Do not delete below this **

// -- Wiggle cards on mouseover animation --
$('.card').on('mouseover', function() {
  $(this)
    .animate({'left':(-0.5)+'px'},400)
    .animate({'left':(+0.5)+'px'},400)}); // end Wiggle animation




  }); // end document rdy function
