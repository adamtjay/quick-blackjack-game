/*eslint-env jquery*/

$(document).ready(function() {

let activeDeck = [];
let retiredCards = [];
let remainingCoins = 5;
let currentBet = 0;

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
              activeDeck.push(new Card(n+1, this.names[n], this.suits[s]));
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
  } else { // Human player goes to main card holder on bottom
    let $cardHolder = $('.player-card-holder');
    let $genCard = $(`<div class="card"><div class="card-icon-${cardSuit}" data-value="${cardValue}"></div><br/><div class="cardContent">${cardName}</div></div>`);
    $cardHolder.append($genCard);
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
      }};

  listHand() { // log or get names of cards in hand
    console.log(`\*\* ${this.playerName}'s hand: `);
    for (let i=0; i< this.playerHand.length; i++) {
      console.log(this.playerHand[i].name);
          }
        }

  } // ---- end Player class


// *** HIT button logic
$('.hit-button').on('click', function() {
    player1.dealCards(1);

    console.log('Player hit: ' + player1.playerHand[player1.playerHand.length-1].name);
    });

// *** STAY button logic
$('.stay-button').on('click', function() {

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




// *** Execute game flow ***

createDeck();
shuffle(activeDeck);

let house = new Player(0, "House-AI");
let player1 = new Player(1, "Adam");

updateBet(2);

house.dealCards(2);
player1.dealCards(2);

house.listHand();

//player1.listHand();
//console.log(activeDeck);




// ** Do not delete below this **

// -- Wiggle cards on mouseover animation --
$('.card').on('mouseover', function() {
  $(this)
    .animate({'left':(-0.5)+'px'},400)
    .animate({'left':(+0.5)+'px'},400)}); // end Wiggle animation




  }); // end document rdy function
