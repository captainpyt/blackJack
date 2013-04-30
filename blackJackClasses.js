//blackJack.js
//card, hand, deck classes for a blackjack game

rankArray = ["", "Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"] ;
suitArray = ["Spades", "Hearts", "Clubs", "Diamonds"] ;

//Card class
//theSuit: (int) suit of card
//theRank: (int) rank of card
//up: (bool) faceup?
function Card(theSuit, theRank, up){

	if(theSuit < 0 || theSuit > 3 || theRank < 1 || theRank > 13) throw "Invalid suit and/or rank" ;
	this.suit = theSuit ;
	this.rank = theRank ;
	this.faceUp = up || true ;


}

Card.prototype.toString = function(){

	return rankArray[this.rank] + " of " + suitArray[this.suit] ;
	
}

//returns value of card

Card.prototype.value = function(){

	if(this.faceUp){//only score faceup cards
		if(this.rank == 1) return 11 ;//Ace is default valued to 11, when a hand is valued an ace will be valued at 1 if it causes bust
		else if(this.rank > 9) return 10 ;
		else return this.rank ;
	}
	else return 0 ;
}

//flips card
Card.prototype.flip = function(){

	if(this.faceUp) this.faceUp = false ;
	else this.faceUp = true ;
	
	return this.faceUp ;

}
//for testing purposes
/*
try{
	var aCard = new Card(0, 1) ;
	alert(aCard.toString()) ;
	alert(aCard.value()) ;
	aCard = new Card(3, 12) ;
	alert(aCard.toString()) ;
	alert(aCard.value()) ;
	aCard = new Card(0, 0) ;
	alert(aCard.toString()) ;
	alert(aCard.value()) ;
}
catch(e){
	
	alert("Error: " + e) ;

}
*/

//Deck class
function Deck(){

	this.deck = [] ;
	this.currentCard = 0 ;
	
	for(i = 1 ; i < 14 ; i++){
		for(j = 0 ; j < 4 ; j++){
		
			this.deck.push(new Card(j, i)) ;
		}
	}

}

//shuffle deck
Deck.prototype.shuffle = function(){

	for(i = 0 ; i < 52 ; i++){
	
		var j = Math.floor(Math.random() * 52 ) ;
		var tmpCard = this.deck[i] ;
		this.deck[i] = this.deck[j] ;
		this.deck[j] = tmpCard ;
	}
		

}

//deals top card
Deck.prototype.dealCard = function(){

return this.deck[this.currentCard++] ;

}

//returns true if more cards in deck
Deck.prototype.moreCards = function(){

	return (this.currentCard == 52)?false:true ;
	
}

//for testing Deck
/*
var myDeck = new Deck() ;
var aCard = myDeck.dealCard() ;
alert(aCard.toString()) ;
myDeck.shuffle() ;
aCard = myDeck.dealCard() ;
alert(aCard.toString()) ;
*/

//Hand class
function Hand(handsize, aDeck){

	this.hand = [] ;
	if(handsize){
		if(aDeck){
			for(i = 0 ; i < handsize ; i++) this.hand.push(aDeck.dealCard()) ;
		}
		else {
			throw "no deck supplied" ;
		}
	
	}

}

//adds card to hand
Hand.prototype.addCard = function(newCard){

	this.hand.push(newCard) ;

}

Hand.prototype.toString = function(){

	var handsize = this.hand.length ;
	var str = "" ;
	for(i = 0 ; i < handsize - 1 ; i++){
	
		str += this.hand[i].toString() + ", " ;
	
	}
	str += this.hand[i].toString() ;
	return str ;

}

//black jack scoring
Hand.prototype.value = function(){

	var handsize = this.hand.length ;
	var sum = 0 ;
	for (i = 0 ; i < handsize ; i++){
		sum+= this.hand[i].value() ;
	}	
	i = 0 ;
	while((sum > 21) && (i < handsize)){//if bust then check for aces that could be scored as 1
		if(this.hand[i].value() === 11) sum -= 10 ; 
	++i ;        
	}
	return sum ;
}

//for testing
/*
try{
	var myDeck = new Deck() ;
	myDeck.shuffle() ;
	var aCard = new Card(1,1) ;
	var myHand = new Hand() ;
	myHand.addCard(aCard) ;
	aCard = new Card(1,6) ;
	myHand.addCard(aCard) ;
	alert(myHand.toString()) ;
	alert(myHand.value()) ;
	aCard = new Card(1,9) ;
	myHand.addCard(aCard) ;
	alert(myHand.toString()) ;
	alert(myHand.value()) ;
}
catch(e){
	alert("ERROR: " + e) ;
}
*/