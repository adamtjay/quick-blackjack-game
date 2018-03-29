/*eslint-env jquery*/

$(document).ready(function() {

// Wiggle cards on hover animation

    $('.card').on('mouseover', function() {
      $(this)
        .animate({'left':(-1)+'px'},100)
        .animate({'left':(+2)+'px'},100)
        .animate({'left':(-1)+'px'},100)});

let activeDeck = [];
let retiredCards = [];

//Classes and objects

class Card {
  constructor(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
    }
  }

function createDeck(){
    this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.suits = ['Hearts','Diamonds','Spades','Clubs'];
    let cards = [];

      for(var s = 0; s < this.suits.length; s++) {
          for(let n = 0; n < this.names.length; n++) {
              activeDeck.push(new Card(n+1, this.names[n], this.suits[s]));
          }
      }
      console.log(activeDeck);
      return cards;
  }

createDeck();

function generateCard(cardSuit, cardName) {
  let $cardHolder = $('.player-card-holder');
  let $genCard = $(`<div class="card"><div class="card-icon-${cardSuit}"></div><br/><div class="cardContent">${cardName}</div></div>`);
  $cardHolder.append($genCard);

}

class Player {
  constructor(num, name) {
      this.playerNum = num;
      this.playerName = name;

      this.totalCoins = 5;
      this.playerHand = [];

  }
  dealCards(num) {
    for (let i=0; i<num; i++) {
      this.playerHand.push(activeDeck[i]);
      activeDeck.shift();
      let tempSuit = activeDeck[i].suit;

      generateCard();
    }
  };
}

let adam = new Player(1, "Adam");
adam.dealCards(2);
console.log(adam.playerHand);
console.log(activeDeck);

class Hand {

}




  }); // end document rdy function
