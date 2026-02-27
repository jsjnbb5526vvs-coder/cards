const UI = {

    getCardImage(card){

        if(card.suit === "JOKER"){
            if(card.value === "BIG") return "assets/cards/joker_red.svg";
            if(card.value === "SMALL") return "assets/cards/joker_black.svg";
        }

        const suitName = {
            "♥":"hearts",
            "♠":"spades",
            "♦":"diamonds",
            "♣":"clubs"
        }[card.suit];

        const valueName = {
            "A":"ace",
            "K":"king",
            "Q":"queen",
            "J":"jack",
            "10":"10",
            "9":"9",
            "8":"8",
            "7":"7"
        }[card.value];

        return `assets/cards/${valueName}_of_${suitName}.svg`;
    },

    renderHands(game){

        game.players.forEach(player => {

            const div = document.getElementById("player" + player.id);
            div.innerHTML = "";

            player.hand.forEach(card => {

                const img = document.createElement("img");
                img.src = this.getCardImage(card);
                img.className = "card";

                if(player.isHuman){
                    img.onclick = () => game.playTurn(card);
                }

                div.appendChild(img);
            });
        });
    },

    renderCenter(game){

        const center = document.getElementById("centerTable");
        center.innerHTML = "";

        const positions = {
            0:{ top:"70%", left:"50%" },
            1:{ top:"50%", left:"75%" },
            2:{ top:"30%", left:"50%" },
            3:{ top:"50%", left:"25%" }
        };

        game.trick.forEach(play => {

            const img = document.createElement("img");
            img.src = this.getCardImage(play.card);
            img.className = "card playedCard";

            img.style.position = "absolute";
            img.style.top = positions[play.player].top;
            img.style.left = positions[play.player].left;
            img.style.transform = "translate(-50%, -50%)";

            center.appendChild(img);
        });
    },

    updateScore(game){

        document.getElementById("team1Score").innerText =
            "الفريق 1: " + game.scores[1];

        document.getElementById("team2Score").innerText =
            "الفريق 2: " + game.scores[2];
    }

};
