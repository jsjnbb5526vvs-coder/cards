const Deck = {

    suits:["♥","♠","♦","♣"],
    values:["A","K","Q","J","10","9","8","7"],

    create(){

        let deck = [];

        this.suits.forEach(suit => {

            this.values.forEach((value,index) => {

                deck.push({
                    suit: suit,
                    value: value,
                    power: 8 - index   // A أعلى = 8
                });

            });

        });

        // جوكر كبير
        deck.push({
            suit:"JOKER",
            value:"BIG",
            power:100
        });

        // جوكر صغير
        deck.push({
            suit:"JOKER",
            value:"SMALL",
            power:99
        });

        return deck;
    },

    shuffle(deck){

        for(let i = deck.length - 1; i > 0; i--){
            let j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }

    }

};
