'use strict'
module.exports = class Board {
    constructor(listOfPlayers) {
        // create the board, array of all the fruits, bombs, possible items
        // number of bombs should be number of players in game -1
        // the last item should be a bomb
        // there should be at least 4 players in the game 
        var numberOfPlayers = listOfPlayers.length;
        this.mapOfUsers = {};
        // TODO: randomize the order
        this.playerOrder = []
        for (var i = 0; i < listOfPlayers.length; i++){
            var userId = listOfPlayers[i].user.id;
            this.mapOfUsers[userId] = listOfPlayers[i];
            this.playerOrder.push(userId);
        }
        var fruitEmojis = [":tangerine:", ":pineapple:", ":watermelon:", ":strawberry:", ":cherries:", ":banana:"];
        var bombEmoji = ":bomb:";
        var boardArray = [];
        for (var i = 1; i < numberOfPlayers; i++){
            // get random number of fruits between 5-8 to add, then add a bomb at the end
            var numberOfFruits = Math.floor(Math.random() * 4) + (numberOfPlayers * 2);
            for (var j = 1; j <= numberOfFruits; j++){
                var fruitPicked = Math.floor(Math.random() * fruitEmojis.length);
                boardArray.push(fruitEmojis[fruitPicked]);
            }
            // push a bomb in
            boardArray.push(bombEmoji);
        }
        this.boardArray = boardArray;
        this.status = "in progress"
        this.currentTurn = 1;
        
    }
    // isTurn - returns which player's turn it is
    isTurn(){
        // return whose turn it is (discorduserId ??)
        var idOfUserTurn = this.playerOrder[0]
        return idOfUserTurn;
    }
    // status - returns the status of the game (start - in progress - finished)
    getStatus(){
        // return status of game (waiting for players, in progress, ended)
        return this.status;
    }
    getPlayer(discordUserId){
        var playerToReturn = this.mapOfUsers[discordUserId];
        if (playerToReturn){
            return playerToReturn;
        }else{
            return undefined;
        }
    }
    // check for game over
    gameEnded(){
        // return true or false if the game has ended
        var status = this.status;
        if (status != "in progress"){
            return true;
        }
        else{
            return false;
        }
    }
    validUser(discordUserId){
        if (this.mapOfUsers[discordUserId]){
            return true;
        }else{
            return false;
        }
    }
    // visualize the board, return an array of strings for each row
    visualize(){
        // return visual string version of the board
        var gameString = ":arrow_right:";
        for (var i = 0; i < this.boardArray.length; i++){
            if (gameString.length < 980){
                gameString = gameString + " " + this.boardArray[i];                
            }
        }
        return gameString;
    }

    makeMove(player, numberOfTakes){
        // player makes move, 1 or 2 number of takes only valid
        if (numberOfTakes && numberOfTakes > 0 && numberOfTakes <= 2){
            //TODO: player makes the move
            var playerHasLost = false;
            for (var i = 1; i <= numberOfTakes; i++){
                if (this.boardArray.length > 0){
                    var fruitEaten = this.boardArray.shift();
                    if (fruitEaten == ":bomb:"){
                        // player lost
                        playerHasLost = true;
                    }
                }else{
                    this.status = "ended";
                }
            }
            if (!playerHasLost){
                this.playerOrder.push(this.playerOrder.shift());
                this.currentTurn++;    
            }else{
                // player lost remove from order
                this.playerOrder.shift()
                if (this.boardArray.length == 0){
                    this.status = "ended";
                }
            }
        }
    }

    checkWinner(){
        // check if someone has won
        if (this.boardArray.length == 0){
            // check all player statuses
            var winner = this.getPlayer(this.playerOrder[0])
            return winner;
        }else{
            return "None"
        }
    }
}