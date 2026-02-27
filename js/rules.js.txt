const Rules = {

mustFollowSuit(player,leadSuit){
return player.hand.some(c=>c.suit===leadSuit);
},

compare(card1,card2,trump,leadSuit){

if(card1.suit==="JOKER" && card1.value==="BIG") return 1;
if(card2.suit==="JOKER" && card2.value==="BIG") return -1;

if(card1.suit==="JOKER") return 1;
if(card2.suit==="JOKER") return -1;

if(card1.suit===trump && card2.suit!==trump) return 1;
if(card2.suit===trump && card1.suit!==trump) return -1;

if(card1.suit===leadSuit && card2.suit!==leadSuit) return 1;
if(card2.suit===leadSuit && card1.suit!==leadSuit) return -1;

return card1.power-card2.power;
},

validateSmallJoker(trickNumber,starter,card){
if(trickNumber<=3){
if(card.suit==="JOKER" && card.value==="SMALL" && starter){
return false;
}
}
return true;
}

};