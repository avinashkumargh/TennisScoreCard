document.addEventListener('keypress', scoreUpdate);
display = document.getElementById("main-info");

//update players names... Somehow

let player1 = {
    name: document.getElementById("player-1-name"),
    sets : document.getElementById("player-1-sets"),
    games : document.getElementById("player-1-games"),
    points : document.getElementById("player-1-points"),
    serve : document.getElementById("player-1-serve"),
    tieBreak : false,
    tiePoints : 0
};

let player2 = {
    name: document.getElementById("player-2-name"),
    sets : document.getElementById("player-2-sets"),
    games : document.getElementById("player-2-games"),
    points : document.getElementById("player-2-points"),
    serve : document.getElementById("player-2-serve"),
    tieBreak : false,
    tiePoints : 0
};

let tieBreakCounter = 1;

function scoreUpdate(e) {
    console.log(e);
    if (e == "1") {
        inc_points(player1, player2);
    }
    if (e == "2") {
        inc_points(player2, player1);
    }

    if (checkServe(player1)){
        mapScore(player1, player2);
    }
    else{
        mapScore(player2, player1);
    }
}


function checkServe(player){
    if (player.serve.innerHTML == '◀'){
        return true;
    }
    else{
        return false;
    }
}


function flipServes(){
    if (checkServe(player1)){
        player1.serve.innerHTML = "";
        player2.serve.innerHTML = "◀";
    }
    else {
        player1.serve.innerHTML = "◀";
        player2.serve.innerHTML = "";
    }
}



function inc_points(player_1, player_2){
    if (!player_1.tieBreak){

        if (player_1.points.innerHTML == '0'){
            player_1.points.innerHTML = 15;
        }
        else if (player_1.points.innerHTML == '15'){
            player_1.points.innerHTML = 30;
        }
        else if (player_1.points.innerHTML == '30'){
            player_1.points.innerHTML = 40;
        }
        else if (player_1.points.innerHTML == '40'){
            if (player_2.points.innerHTML == '40'){
                player_1.points.innerHTML = "AD";
            }
            else if (player_2.points.innerHTML == "AD"){
                player_1.points.innerHTML = '40';
                player_2.points.innerHTML = '40';
            }
            else{
                inc_games(player_1, player_2);
            }
        }
        else if(player_1.points.innerHTML == 'AD'){
            inc_games(player_1, player_2);
        }
        //dont care
        else{
            console.log("You fucked up!!!", player_1.points.innerHTML)
        }
    }

    else {
        //count tie break points here.
        //player_1.tiePoints += 1;
        tieBreakCounter+=1;
        player_1.points.innerHTML = Number(player_1.points.innerHTML) + 1;
        player_1.tiePoints = player_1.points.innerHTML;
        if (Math.abs(player_1.tiePoints - player_2.tiePoints)>1 && (player_2.tiePoints >= 7 || player_1.tiePoints >= 7)){
            console.log("Match done "+ player_1.tiePoints + " " + player_2.tiePoints);
            player_1.points.innerHTML = '0';
            player_2.points.innerHTML = '0';
            player_1.tiePoints = 0;
            player_2.tiePoints = 0;
            player_1.tieBreak = false;
            player_2.tieBreak = false;
            player_1.sets.innerHTML = Number(player_1.sets.innerHTML) + 1;
            player_1.games.innerHTML = "0";
            player_2.games.innerHTML = "0";
            tieBreakCounter = 1;
        }
        if (tieBreakCounter%2 == 0){
            flipServes();
        }
    }
}





function inc_games(player_1, player_2){
    if (player_1.games.innerHTML == "5"){
        if (Number(player_2.games.innerHTML) < 5){
            console.log(player_1.name.innerHTML+ " game! set!")
            player_1.sets.innerHTML = Number(player_1.sets.innerHTML) + 1;
            player_1.games.innerHTML = 0;
            player_2.games.innerHTML = 0;
        }

        else if (Number(player_2.games.innerHTML) == 6){
            player_1.games.innerHTML = Number(player_1.games.innerHTML) + 1;
            console.log("Tie break");
            player_1.tieBreak = true;
            player_2.tieBreak = true;
        }

        else{
            player_1.games.innerHTML = Number(player_1.games.innerHTML) +1;
        }
    }

    else if (player_1.games.innerHTML == '6'){
        console.log(player_1.name.innerHTML+ " game! set!")
        player_1.sets.innerHTML = Number(player_1.sets.innerHTML) + 1;
        player_1.games.innerHTML = 0;
        player_2.games.innerHTML = 0;
    }
    
    else{
        player_1.games.innerHTML = Number(player_1.games.innerHTML) +1;
    }
    player_1.points.innerHTML = 0;
    player_2.points.innerHTML = 0;
    flipServes();
}


function mapScore(player_1, player_2){
    /* display.innerHTML = player_1.name.innerHTML+ "▶ " + player_1.points.innerHTML+ " : " + player_2.points.innerHTML; */
    const parentDiv = document.querySelector('.points-display');
    const divInfoWrapper = document.createElement("div");
    divInfoWrapper.setAttribute("class", "info-wrapper");
    const divInfo = document.createElement("div");
    divInfo.setAttribute("class", "info");
    divInfo.setAttribute("id", "main-info");

    divInfo.innerHTML = player_1.name.innerHTML+ "▶ " + player_1.points.innerHTML+ " : " + player_2.points.innerHTML;
    divInfoWrapper.appendChild(divInfo);
    parentDiv.prepend(divInfoWrapper);
}