## Main Elements

UI
  - 2 tables (?)
  - activeCards[] in the middle bottom
    * tilt bottoms inward & make look as if player is holding them up
  - coin counter on bottom left
  - active coin bet at top of player table
  - 'Tips' box dropdown toggle in top right
    * Cards seen - print out retiredCards array
    * Tip 1 - "If you have (activeCards.sum), (action) is often recommended"
    * Tip 2 - "If the dealer's shown card is a (shownCard.value), (action) is often rec"


PlayerClass class
  - House
    * shownCard (css class) - first card in the hand, or from a hit/split
    * faceDownCard (css class) - anything that isn't the first card, or from a hit/split
    * showAllCards()
  - Player1
    -> Coins class
      * currentBet[]
      * totalCoins[]
      * checkCoins(num)
      * doubleBet()

Deck class
  -> inDeck[]
  - Hand, extends deck * (put functions into Deck)
    -> activeCards[]
      * sum() - returns combined total
        - ('Tips' part: Switch with Cases for each sum)
      * checkIfBust - check if values are over 21
      * checkBlackJack() - check if = 21
      * checkIf17() - for House
    -> retiredCards[]
    -> buildDeck()
    -> shuffleDeck()
    -> dealHands(num)
      - drawCard(num) * also generates cards in JS, based on suit & value
    -> hit()
    -> stay()
    /*-> checkIfBust()*/
    -> doubleDown()
      - checkCoins(currentBet)
      - doubleBet()
      - drawCard(1)
    -> split()
      - hasMatchingPair()
      - checkCoins(currentBet)
      - doubleBet()
      - createNewHand()


Actions available:
  - hit()
  - stay()
  - doubleDown() - shows if hand combined = 9, 10, or 11
  - split() - shows if hasMatchingPair = true

# Main game flow:
  - Player enters name, chooses starting bet (1-5 coins) in landing page
  - Build deck, shuffle deck, deal hands
  - Player chooses an option (hit, stay, DD [if 9/10/11], split [if hasMatchingPair])
    * Hit - drawCard, checkIfBust, checkBlackJack, if not then give options again
    * Stay - checkIfBust/BlackJack, continue
    * DoubleDown - checkCoins(currentBet), doubleBet, drawCard(1), checkIfBust/Blackjack
    * Split - hasMatchingPair, checkCoins(currentBet), doubleBet, createNewHand, offer hit or stay options for both hands
  - House's turn
    * showAllCards, checkIf17 (loop & hit until 17), checkForBust/BlackJack
  - Round end
    * Show modal popup
    * Coin info on top:
      -> If Player won: add active currentBet (x2) to totalCoins
      -> If player lost: subtract currentBet (x2) from totalCoins
    * Offer option to Play Again or Quit
