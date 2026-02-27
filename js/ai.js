const AI = {

    chooseBid(player){

        let strength = 0;

        if(!player || !player.hand) return "PASS";

        player.hand.forEach(card => {

            if(!card) return;

            if(card.suit === "JOKER"){
                strength += 3;
                return;
            }

            if(typeof card.power !== "undefined"){
                if(card.power >= 6) strength++;
            }

        });

        if(strength >= 8) return 8;
        if(strength >= 6) return 7;
        if(strength >= 4) return 6;

        return "PASS";
    },

    chooseTrump(player){

        let suitCount = {};

        player.hand.forEach(card => {

            if(!card) return;

            if(card.suit !== "JOKER"){
                suitCount[card.suit] = (suitCount[card.suit] || 0) + 1;
            }
        });

        const sorted = Object.keys(suitCount)
            .sort((a,b)=>suitCount[b]-suitCount[a]);

        return sorted[0] || "♥";
    },

    playCard(player, leadSuit){

        if(!player || !player.hand.length) return;

        let playable = player.hand.filter(card => {

            if(!card) return false;

            if(!leadSuit) return true;

            if(player.hand.some(c => c.suit === leadSuit)){
                return card.suit === leadSuit;
            }

            return true;
        });

        if(playable.length === 0){
            playable = player.hand;
        }

        return playable[Math.floor(Math.random()*playable.length)];
    }

};
