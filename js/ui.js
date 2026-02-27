const UI = {

    // =========================
    // جلب مسار صورة الكرت
    // =========================
    getCardImage(card){

        if(card.suit === "JOKER"){
            if(card.value === "BIG"){
                return "assets/cards/joker_red.svg";
            }
            if(card.value === "SMALL"){
                return "assets/cards/joker_black.svg";
            }
            return "assets/cards/joker.svg";
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

    // =========================
    // عرض أوراق اللاعبين
    // =========================
    renderHands(game){

        game.players.forEach(player => {

            const div = document.getElementById("player" + player.id);
            div.innerHTML = "";

            player.hand.forEach(card => {

                const img = document.createElement("img");
                img.src = this.getCardImage(card);
                img.className = "card";

                // اللاعب الحقيقي فقط يقدر يضغط
                if(player.isHuman){
                    img.onclick = () => {
                        game.playTurn(card);
                    };
                }

                div.appendChild(img);

            });

        });

    },

    // =========================
    // عرض الكروت في وسط الطاولة
    // =========================
    renderCenter(game){

    const center = document.getElementById("centerTable");
    center.innerHTML = "";

    const positions = [
        { top: "65%", left: "50%" },  // لاعب 1 (أسفل)
        { top: "50%", left: "75%" },  // لاعب 2 (يمين)
        { top: "35%", left: "50%" },  // لاعب 3 (أعلى)
        { top: "50%", left: "25%" }   // لاعب 4 (يسار)
    ];

    game.trick.forEach(play => {

        const img = document.createElement("img");
        img.src = this.getCardImage(play.card);
        img.className = "card playedCard";

        img.style.top = positions[play.player].top;
        img.style.left = positions[play.player].left;
        img.style.transform = "translate(-50%, -50%)";

        center.appendChild(img);

    });

}
    updateScore(game){

        document.getElementById("team1Score").innerText =
            "الفريق 1: " + game.scores[1];

        document.getElementById("team2Score").innerText =
            "الفريق 2: " + game.scores[2];

    },

    // =========================
    // عرض معلومات الجولة
    // =========================
    updateRoundInfo(game){

        const status = document.getElementById("roundStatus");

        status.innerText =
            "الحكم: " + game.trump +
            " | المشتري: لاعب " + (game.buyer+1) +
            " | الطلب: " + game.bidValue +
            " | لفة: " + game.trickNumber + "/9";

    },

    // =========================
    // رسالة مؤقتة
    // =========================
    showMessage(text){

        const msg = document.createElement("div");
        msg.innerText = text;
        msg.style.position = "absolute";
        msg.style.top = "50%";
        msg.style.left = "50%";
        msg.style.transform = "translate(-50%,-50%)";
        msg.style.background = "rgba(0,0,0,0.8)";
        msg.style.padding = "20px 40px";
        msg.style.borderRadius = "15px";
        msg.style.fontSize = "20px";
        msg.style.zIndex = "999";

        document.body.appendChild(msg);

        setTimeout(()=>{
            msg.remove();
        },2000);
    }


};
