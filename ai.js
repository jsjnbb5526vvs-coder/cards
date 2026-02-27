console.log("AI FILE LOADED");

const AI = {
    chooseBid(player){
        console.log("AI working");
        return "PASS";
    },
    chooseTrump(player){
        return "♥";
    },
    playCard(player){
        return player.hand[0];
    }
};