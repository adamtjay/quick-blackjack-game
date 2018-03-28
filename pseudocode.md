## Main Elements

PlayerClass class
  - House
  - Player1
    -> Coins class
      - activeCoins[]
      - totalCoins[]
      - coinTransactions[] (?)

Deck class
  -> inDeck[]
  - Hand, extends deck
    -> activeCards[]
    -> retiredCards[]
    -> buildDeck()
    -> shuffleDeck()
    -> dealHands()
    -> isMatchingPair()

Actions available:
  - hit()
  - stay()
  - doubleDown() - available if hand combined = 9, 10, or 11
  - split() - available if isMatchingPair = true

Main game flow:
  - Player enters name, chooses starting bet (1-5 coins) in landing page
  - Build deck, shuffle deck, deal hands
  - Player(s) chooses an option (hit, stay, DD, split)
