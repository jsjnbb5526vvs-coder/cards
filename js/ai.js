const AI = {

chooseBid(player){
let strength=0;
player.hand.forEach(c=>{
if(c.power>=6) strength++;
if(c.suit==="JOKER") strength+=2;
});
if(strength>7) return 8;
if(strength>5) return 7;
if(strength>3) return 6;
return "PASS";
},

chooseTrump(player){
let suitCount={};
player.hand.forEach(c=>{
if(c.suit!=="JOKER"){
suitCount[c.suit]=(suitCount[c.suit]||0)+1;
}
});
return Object.keys(suitCount).sort((a,b)=>suitCount[b]-suitCount[a])[0];
},

playCard(player,leadSuit,trump){
let playable=player.hand.filter(c=>{
if(!leadSuit) return true;
if(Rules.mustFollowSuit(player,leadSuit)){
return c.suit===leadSuit;
}
return true;
});
return playable[Math.floor(Math.random()*playable.length)];
}

};
