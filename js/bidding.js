const Bidding = {

start(game){

let highest=0;
let buyer=null;

for(let i=1;i<=4;i++){
let p=game.players[i-1];
let bid=AI.chooseBid(p);
if(bid!=="PASS" && bid>highest){
highest=bid;
buyer=i-1;
}
}

if(!buyer){
highest=5;
buyer=game.dealer;
}

game.bidValue=highest;
game.buyer=buyer;
game.trump=AI.chooseTrump(game.players[buyer]);

}

};