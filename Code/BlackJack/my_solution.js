/*

 U3.W7: Design Basic Game Solo Challenge
 This is a solo challenge

 Your mission description: Create a blackjack game if I can figure out how to display the table.
 Overall mission:
 Deal hands of blackjack, initially just one player and dealer.  No animation.
 Display cards in browser window.

 UI: window displays Dealer on top, Player on bottom.
 Buttons for Deal, Hit, Hold, Bust.
 Play proceeds like this:
 Player hits Deal.
 While not PlayerSaysDone do PlayHand:
 If necessary the deck is shuffled.
 Dealer or Game Object deals the two players hands.

 if Hold: play proceeds to dealer.
 Dealer turns over down card
 Dealer sends hit or Hold to game, passing self as argument
 doTurn(currentPlayer): For each Player (and Dealer)
 While not bust or hold:
 To Player: "Hit or hold." then wait for player
 if Hit: game requests card from deck,
 game tells board to draw
 Game computes value of hand in case of Bust
 }
 }
 for each Player, settleUpBets




 Goals:
 Characters:
 Objects:
 Deck properties: cards[]
 methods:     cardsLeftInDeck, initialize, take(nCards), return(cards[])

 BJHand (hand can calculate BJ value, hit, bust)
 properties: array of cards
 methods:    newBJHand(Deck), points, isBusted, beatsOther, returnCards(deck)
 Card
 properties: suit, value
 methods: blackJackValue, allValues, allSuites, initialize,

 Player:
 properties: hand, name, bankroll (if I get as far as taking bets)
 methods:    initialize(name, bankroll), takeWinnings(amount), placeBet(dealer, amount)

 Dealer - sub-class of Player
 properties: hand, name, bets{Player: bet}

 methods:    playHand(deck), takeBets(Players, amt), payBets

 Game:      •The job of the GameController is to control the HTML representation and the flow of the game.
            •Within the HTML page, all actions are triggered by <div> onClick events: that's all I know about.
            •Upon page load, display "Start" button

 startGame: Question: can you instantiate objects and will they stick around while waiting for events?
            •create Player, Dealer, Deck objects.
            •[eventually add takeBets here.]
            •call Deal to deal hands to player and dealer, dealer is one down, player both down.
            •display button; "View Hand"
            •hide button "Start"

 ViewHand:  •Turns cards over and displays button "Hit Me" and button "Hold"
 HitMe:     •calls Player.hitMe method (should player be responsible for adding his own hand?)
 Hold:      •Disappear "HitMe" and "Hold" buttons
            •calls Dealer.play
            •Pay bets
            •display "New Hand"

 newHand:   •Retrieve Cards
            •newHand for both Players
            •Reset screen to invisible cards.
            •deal another hand.

 properties: players[]; deck;

 Functions:



 */
//Game Object not sure how to instantiate and keep an object alive yet.


function startGameCommand() {
    newHandCommand(deck, dealer, player);
}

function showPlayersCardsCommand() {
    turnCardsUp(player);
    renderHand(player);
    changeIsVisible("view-hand-button", false);
}

function turnCardsUp(player) {
    for (var i = 0; i < player.hand.cards.length; i++)
        turnCardFaceUp(player, i);
}

function changeIsVisible(objectID, makeVisible) {
    var commandStr = "document.getElementById(\'objectID\')";
    commandStr = commandStr.replace("objectID", objectID);

    if (makeVisible)
        commandStr += ".style.display = \"block\";";
    else
        commandStr += ".style.display = \"none\";";

    eval(commandStr);
}


function hitMeCommand() {
    player.hitMe(deck);
    turnCardsUp(player);
    if (player.hand.is_busted()) {
        changeIsVisible("new-hand-button", true);
        changeIsVisible("hit-me-button", false);
        changeIsVisible("hold-button", false);
        renderHand(dealer);
        renderHand(player);
        userMessage("Busted. :(");
        player.returnCards(deck);
        dealer.returnCards(deck);
    }
    else
    renderHand(player);

}

function holdCommand() {
    turnCardFaceUp(dealer, 0);
    changeIsVisible("hold-button", false);
    changeIsVisible("hit-me-button", false);
    changeIsVisible("new-hand-button", true);
    dealer.playHand(deck);
    turnCardsUp(dealer);
    renderHand(dealer);
    if (dealer.hand.is_busted())
        userMessage("You win! :)");
    else if (player.hand.beats_other(dealer.hand))
        userMessage("You win! :)");
    else
        userMessage("You lost. :(");

    player.returnCards(deck);
    dealer.returnCards(deck);
    changeIsVisible("new-hand-button", true);
}

function newHandCommand(deck, dealer, player) {
    var hand = new Hand(deck);
    var hand2 = new Hand(deck);
    dealer.hand = hand;
    player.hand = hand2;

    turnCardFaceUp(dealer, 1);

    changeIsVisible("start-button", false);
    changeIsVisible("view-hand-button", true);
    changeIsVisible("hit-me-button", true);
    changeIsVisible("hold-button", true);
    changeIsVisible("new-hand-button", false);
    changeIsVisible("user-message-area", false);

    renderHand(player);
    renderHand(dealer);
}

function userMessage (message){
    changeIsVisible("user-message-area", true);
    document.getElementById("user-message").innerHTML = message;
}

function okCommand(){
    changeIsVisible("user-message-area", false);
}
function turnCardFaceUp(player, cardNum) {
    player.showCard(cardNum);
}
function turnCardFaceDown(player, cardNum) {
    player.hideCard(cardNum);
}

function renderCard(player, cardIndex) {
    var commandStr = "document.getElementById(\'XXXXX_card\')";

    var cardStr = "card" + cardIndex;
    commandStr = commandStr.replace("XXXXX", player.name);//point to the correct card in the HTML
    commandStr = commandStr.replace("card", cardStr);

    if (cardIndex < player.hand.cards.length) {
        var makeVisible = commandStr + ".style.display = \"block\";";
        //puts("make visible: ", makeVisible);
        eval(makeVisible);  //make visible

        //now set correct card png image
        if (!player.isCardShowing(cardIndex))
            commandStr += ".src = \"PlayingCards/back.png\";";
        else {
            commandStr += ".src = \"PlayingCards/value-suit.png\";";
            commandStr = commandStr.replace("value", player.hand.cards[cardIndex].value);
            commandStr = commandStr.replace("suit", player.hand.cards[cardIndex].suit);
            //puts("commandStr: ", commandStr);
        }
        eval(commandStr);  //execute JS to set the image source
    } else {
        var makeInvisible = commandStr + ".style.display = \"none\";";
        //puts("make Invisible: ", makeInvisible);
        eval(makeInvisible);
    }
}

function renderHand(player) {
    for (var i = 0; i < 13; i++) {
        renderCard(player, i);
    }
}

// Class Card *********************************************************
function Card(suit, value) {
    this.suit = suit;
    this.value = value;
    this.isShowing = false;
}
Card.suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
Card.values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
Card.blackJackValues = {
    2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, Jack: 10, Queen: 10, King: 10
};

Card.bjValue = function (card) {
    return Card.blackJackValues[card.value];
};
Card.prototype.to_s = function () {
    return (this.value + '_' + this.suit);
};


// Class Hand *********************************************************
function Hand(deck) {
    this.cards = deck.dealCards(2); //return array of 2 card objects
}

Hand.prototype.points = function () {
    var aces = 0;
    var points = 0;

    for (var card_num = 0; card_num < this.cards.length; card_num++) {
        var card = this.cards[card_num];
        if (card.value == "Ace") {
            aces++;
            points += 11;
        }
        else {
            points += Card.bjValue(card);
        }

        while (points > 21 && aces > 0) {
            points -= 10;
            aces -= 1;
        }
    }
    return points;
};

Hand.prototype.is_busted = function () {
    return (this.points() > 21);
};

Hand.prototype.hit_me = function (deck) {
    if (!this.is_busted()) {
        var newCards = deck.dealCards(1);
        this.cards = this.cards.concat(newCards);
        //this.cards.concat(deck.dealCards(1));
    }
};

Hand.prototype.beats_other = function (other_hand) {
    if (this.is_busted()) {
        return false;
    } else {
        if (other_hand.is_busted()) {
            return true;
        } else {
            return (this.points() > other_hand.points());
        }
    }
};

Hand.prototype.returnUsedCards = function (deck) {
    deck.receiveUsedCards(this.cards);
    this.cards = [];
};


Hand.prototype.to_s = function () {
    var handString = "";
    for (i = 0; i < this.cards.length; i++)
        handString = handString + ', ' + this.cards[i].to_s();
    return handString.substring(1);
};

Array.prototype.shuffle = function () {
    var new_array;
    new_array = this.sort(function () {
        return 0.5 - Math.random();
    }); //I'm amazed this isn't an infi loo;
    return new_array;
};

// Class Deck *********************************************************
function Deck() {
    this.cards = [];
    this.usedCards = [];
    var suits = Card.suits;
    var values = Card.values;

    for (var i = 0; i < 52; i++) {
        suit = suits[Math.floor(i / 13)];
        value = values[Math.floor(i % 13)];

        var newCard = new Card(suit, value);
        this.cards.push(newCard);
    }
    this.cards = this.cards.shuffle();
}

Deck.prototype.count = function () {
    return this.cards.length;
};

Deck.prototype.dealCards = function (numCards) {
    if (this.count() < numCards) {
        userMessage("Shuffling.");
        this.cards = this.cards.concat(this.usedCards);

    }
    return this.cards.splice(0, numCards);
};

Deck.prototype.to_s = function () {
    var toString = "";
    for (var i = 0; i < deck.cards.length; i++)
        toString = toString + ', ' + (deck.cards[i]).to_s();
    return toString.substring(1);
};

Deck.prototype.receiveUsedCards = function (arrayOfCards) {
    this.usedCards = this.usedCards.concat(arrayOfCards);
};

// Class Player *********************************************************
function Player(playerName, startBankroll) {
    this.name = playerName || "player";
    this.bankroll = startBankroll || 100;
    this.hand = null;
}

Player.prototype.pay_winnings = function (betAmount) {
    this.bankroll += betAmount;
};

Player.prototype.showCard = function (cardNum) {
    this.hand.cards[cardNum].isShowing = true;
}

Player.prototype.hideCard = function (cardNum) {
    this.hand.cards[cardNum].isShowing = false;
}

Player.prototype.isCardShowing = function (cardNum) {
    return this.hand.cards[cardNum].isShowing;
}
Player.prototype.returnCards = function (deck) {
    this.hand.returnUsedCards(deck);
    this.hand = null;
};

Player.prototype.place_bet = function (dealer, bet_amt) {
    //if (this.bankroll < bet_amt) raise an error;
    dealer.take_bet(bet_amt);
    this.bankroll -= bet_amt;
};

Player.prototype.hitMe = function (deck) {
    return this.hand.hit_me(deck);

};

Player.prototype.to_s = function () {
    var outString = "";
    outString += "    Name: " + this.name + "\n";
    outString += "    Bankroll: " + this.bankroll + "\n";
    if (this.hand == null)
        outString += "    Hand: null\n";
    else
        outString += "    Hand: " + this.hand.to_s();
    return outString;
};

// Class Dealer, subclass of Player *********************************************************
function Dealer() {
    Player.call(this, "dealer", 0);
    bet = 0;//this only works for 1 player.  for multi player change to [[player1,bet],[player2,bet]...]
}

Dealer.prototype = Object.create(Player.prototype);
Dealer.prototype.constructor = Dealer;
Dealer.prototype.place_bet = function (dealer, amt) {
    //throw "ERROR: " + "dealer doesn\'t bet";
};

Dealer.prototype.playHand = function (deck) {
    //take bets
    while (this.hand.points() < 17) {
        this.hitMe(deck);
        return this.hand.is_busted();  //not sure what to return here.
    }
};

Dealer.prototype.take_bet = function (player, amt) {
    if (this.bet.length == 0)
        this.bet = [player, amt];
    else
        this.bet[1] += amt;
};

Dealer.prototype.pay_bet = function () {
    // if this.bet.length === 0 throw "ERROR: " + "can't pay bet that doesn't exist.";
    var thePlayer = this.bet[0];
    var theBetAmount = this.bet[1];
    if (thePlayer.hand.beats_other(this.hand)) {
        this.bankroll -= amt;
        thePlayer.pay_winnings(2 * theBetAmount); //already collected the bet so return winnings and original bet
        this.bet = [];
    }
    else {
        if (thePlayer.hand.points() == this.hand.points()) {
            thePlayer.pay_winnings(theBetAmount);
            this.bet = []; //delete this player's bet
        }
    }
};


//global variables for the page here:

var deck = new Deck();
var dealer = new Dealer();
var player = new Player("player", 1000);


//
//// Test Card Class methods *********************************************************
//puts("Card.suits: ", Card.suits);
//puts("Card.values: ", Card.values);
//
//// Test Card *********************************************************
//var c = new Card("Clubs", "5");
//puts("print card: ", c.to_s());
//
//// Test BlackJack Value *********************************************************
//var t2 = Card.bjValue(c);
//puts("BJ value: ", t2);
//
//// Test New Deck *********************************************************
//var deck = new Deck();
//puts("deck is: ", deck.to_s());
//
//// Test New Hand *********************************************************
//var hand = new Hand(deck);
//puts("new hand is: ", hand.to_s());
//
//puts("hand.points: ", hand.points());
//
//// Test Player *********************************************************
//var player = new Player("dealer", 1000);
//player.hand = hand;
//
//player.hitMe(deck);
//puts("hand.points: ", hand.points());
//player.hitMe(deck);
//puts("hand.points: ", hand.points());
//player.hitMe(deck);
//puts("Player: \n", player.to_s());
//puts("hand.points: ", hand.points());

// Test Draw Card *********************************************************
//renderCard(player,0);

function puts() {
    var ar = "";
    for (var i in arguments)
        ar = ar + (arguments[i]).toString();
    console.log(ar);
}

// Refactored Code


// Reflection
//
//
//
//
//
//