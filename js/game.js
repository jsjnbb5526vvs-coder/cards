const Game={

players:[],
deck:[],
dealer:0,
current:0,
bidValue:0,
buyer:null,
trump:null,
trick:[],
trickNumber:1,
scores:{1:0,2:0},
tricksWon:{1:0,2:0},

start(){

document.getElementById("loadingScreen").classList.add("hidden");
document.getElementById("gameUI").classList.remove("hidden");

this.initPlayers();
this.newRound();

},

initPlayers(){
this.players=[
{id:1,team:1,hand:[],isHuman:true},
{id:2,team:2,hand:[],isHuman:false},
{id:3,team:1,hand:[],isHuman:false},
{id:4,team:2,hand:[],isHuman:false},
];
},

newRound(){

this.deck=Deck.create();
Deck.shuffle(this.deck);

this.players.forEach(p=>p.hand=[]);

for(let i=0;i<9;i++){
this.players.forEach(p=>{
p.hand.push(this.deck.pop());
});
}

Bidding.start(this);

UI.renderHands(this);

this.current=(this.dealer+1)%4;

},

playTurn(card){

let player=this.players[this.current];

this.trick.push({player:this.current,card});

player.hand.splice(player.hand.indexOf(card),1);

UI.renderHands(this);
UI.renderCenter(this);

if(this.trick.length===4){
setTimeout(()=>this.resolveTrick(),800);
}else{
this.nextPlayer();
}

},

resolveTrick(){

let leadSuit=this.trick[0].card.suit;
let winner=this.trick[0];

this.trick.forEach(t=>{
if(Rules.compare(t.card,winner.card,this.trump,leadSuit)>0){
winner=t;
}
});

let team=this.players[winner.player].team;
this.tricksWon[team]++;

this.current=winner.player;
this.trick=[];
this.trickNumber++;

if(this.trickNumber>9){
this.endRound();
}else{
UI.renderCenter(this);
}

},

endRound(){

let buyerTeam=this.players[this.buyer].team;
let opponent=buyerTeam===1?2:1;

if(this.tricksWon[buyerTeam]>=this.bidValue){
this.scores[buyerTeam]+=this.bidValue;
}else{
this.scores[opponent]+=this.bidValue*2;
}

if(this.scores[1]>=54||this.scores[2]>=54){
alert("باون تلقائي! مباراة جديدة");
this.scores={1:0,2:0};
}

this.tricksWon={1:0,2:0};
this.trickNumber=1;

UI.updateScore(this);

this.dealer=(this.dealer+1)%4;

this.newRound();

},

nextPlayer(){
this.current=(this.current+1)%4;

let p=this.players[this.current];

if(!p.isHuman){
let card=AI.playCard(p,this.trick[0]?.card?.suit,this.trump);
setTimeout(()=>this.playTurn(card),600);
}
}

};