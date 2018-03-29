/*eslint-env jquery*/

$(document).ready(function() {

// Wiggle cards on hover animation

  /*  $('.card').on('mouseover', function() {
      $(this)
        .animate({'left':(-1)+'px'},100)
        .animate({'left':(+2)+'px'},100)
        .animate({'left':(-1)+'px'},100)});*/

let activeDeck = [];
let retiredCards = [];

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

      console.log(activeDeck);
      return cards;
  }

function shuffle(cards) {   //using Fisher-Yates random algorithm

    let currentIndex = cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }}


function generateCard(player, cardValue, cardName, cardSuit) {
  if (player === "house") {
      let $cardHolder = $('.house-card-holder');
      let $genCard = $(`<div class="card"><div class="card-icon-${cardSuit}" data-value="${cardValue}"></div><br/><div class="cardContent">${cardName}</div></div>`);
      $cardHolder.append($genCard);
  } else {
    let $cardHolder = $('.player-card-holder');
    let $genCard = $(`<div class="card"><div class="card-icon-${cardSuit}" data-value="${cardValue}"></div><br/><div class="cardContent">${cardName}</div></div>`);
    $cardHolder.append($genCard);
      }
    }

class Player {
  constructor(num, name) {
      this.playerNum = num;
      this.playerName = name;

      this.totalCoins = 5;
      this.playerHand = [];
  }
  dealCards(num) {
    let thePlayer = this.playerName;
    for (let i=0; i<num; i++) {
      this.playerHand.push(activeDeck[i]);
      let tempValue = activeDeck[i].value;
      let tempName = activeDeck[i].name;
      let tempSuit = activeDeck[i].suit;
      activeDeck.shift();


      generateCard(thePlayer, tempValue, tempName, tempSuit);
    }
  };

  listHand() {
    console.log(`\*\* ${this.playerName}'s hand: `);
    for (let i=0; i< this.playerHand.length; i++) {
      console.log(this.playerHand[i].name);
    }
  }

}

createDeck();
shuffle(activeDeck);
//console.log(activeDeck);

let house = new Player(0, "house");
let adam = new Player(1, "Adam");

house.dealCards(5);
adam.dealCards(5);

adam.listHand();
house.listHand();



// DO NOT REMOVE -- Wiggle cards on hover animation
$('.card').on('mouseover', function() {
  $(this)
    .animate({'left':(-1)+'px'},100)
    .animate({'left':(+2)+'px'},100)
    .animate({'left':(-1)+'px'},100)}); // end Wiggle animation




  }); // end document rdy function
