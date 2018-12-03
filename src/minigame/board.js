'use strict'
var _ = require("lodash");

module.exports = class Board {
    constructor(listOfPlayers, message, raresAvailable, amuletsAvailable, ancientsAvailable) {
        // create the board, array of all the fruits, bombs, possible items
        // number of bombs should be number of players in game -1
        // the last item should be a bomb
        // there should be at least 4 players in the game 
        this.mapOfUsers = {};
        this.playerOrder = []
        for (var i = 0; i < listOfPlayers.length; i++){
            var userId = listOfPlayers[i].user.id;
            this.mapOfUsers[userId] = listOfPlayers[i];
            this.playerOrder.push(userId);
        }
        this.playerOrder = _.shuffle(this.playerOrder);
        this.raresAvailable = raresAvailable
        this.ancientsAvailable = ancientsAvailable
        this.amuletsAvailable = amuletsAvailable

        var numberOfPlayers = listOfPlayers.length;
        var fruitEmojis = [":tangerine:", ":pineapple:", ":watermelon:", ":strawberry:", ":cherries:", ":banana:"];
        var bombEmoji = ":bomb:";
        var amulet = ":gem:";
        var box = ":package:";
        var taco = ":taco:";
        var experience = ":trident:";

        var boardArray = [];
        for (var i = 1; i < numberOfPlayers; i++){
            // get random number of fruits between 5-8 to add, then add a bomb at the end
            var numberOfFruits = Math.floor(Math.random() * 5) + (numberOfPlayers * 2);
            for (var j = 1; j <= numberOfFruits; j++){
                var fruitRoll = Math.floor(Math.random() * 10000) + 1

                if (fruitRoll >= 9996){
                    // add an amulet
                    boardArray.push(amulet);
                }else if (fruitRoll >= 9950 && fruitRoll < 9996){
                    // add a rare or experience
                    var rareOrXpRoll = Math.floor(Math.random() * 100) + 1
                    if (rareOrXpRoll > 50){
                        // experience
                        boardArray.push(experience);
                    }else{
                        // package
                        boardArray.push(box);
                    }
                    
                }else if (fruitRoll >= 9800 && fruitRoll < 9950){
                    boardArray.push(taco);
                }else{
                    var fruitPicked = Math.floor(Math.random() * fruitEmojis.length);
                    boardArray.push(fruitEmojis[fruitPicked]);
                }
            }
            // push a bomb in
            boardArray.push(bombEmoji);
        }
        this.boardArray = boardArray;
        this.status = "waiting"
        this.currentTurn = 1;
        this.lastMessage = undefined;
    }
    // isTurn - returns which player's turn it is
    isTurn(){
        // return whose turn it is (discorduserId ??)
        var idOfUserTurn = this.playerOrder[0]
        return idOfUserTurn;
    }
    getCurrentTurn(){
        return this.currentTurn
    }
    getLastMessage(){
        return this.lastMessage;
    }
    setLastMessage(message){
        this.lastMessage = message;
    }
    // status - returns the status of the game (start - in progress - finished)
    getStatus(){
        // return status of game (waiting for players, in progress, ended)
        return this.status;
    }
    setStatus(status){
        this.status = status;
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
            if (gameString.length < 150){
                gameString = gameString + " " + this.boardArray[i];                
            }
        }
        return gameString;
    }

    gameIsReady(){
        // check all players belonging to this game are ready
        var gameIsReady = true;
        for (var user in this.playerOrder){
            var playerToCheck = this.mapOfUsers[this.playerOrder[user]];
            var playerIsReady = playerToCheck.getPlayerReadyStatus();
            if (!playerIsReady){
                gameIsReady = false;
                break;
            }
        }
        return gameIsReady;
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
                    // cases for eating certain fruits
                    if (fruitEaten == ":gem:"){
                        // add a random amulet
                        var itemRoll = Math.floor(Math.random() * this.amuletsAvailable.length);
                        player.itemsObtained.push(this.amuletsAvailable[itemRoll])
                    }else if (fruitEaten == ":package:"){
                        // add a random rare
                        var itemRoll = Math.floor(Math.random() * this.raresAvailable.length);
                        player.itemsObtained.push(this.raresAvailable[itemRoll])
                    }else if (fruitEaten == ":taco:"){
                        // add tacos
                        player.extraTacosEarned = player.extraTacosEarned + 10
                    }else if (fruitEaten == ":trident:"){
                        // add experience equivalent to player's level
                        player.extraExperienceGained = player.extraExperienceGained + 1
                    }
                }else{
                    this.status = "ended";
                }
            }
            if (!playerHasLost){
                this.playerOrder.push(this.playerOrder.shift());
                this.currentTurn++;
                return null 
            }else{
                // player lost remove from order
                var playerThatLostId = this.playerOrder.shift()
                this.currentTurn++;
                if (this.boardArray.length == 0){
                    this.status = "ended";
                }
                return this.mapOfUsers[playerThatLostId].user;                
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

    cleanup(){
        // return array of ids
        var arrayOfIds = []
        for (var key in this.mapOfUsers){
            arrayOfIds.push(key);
        }
        return arrayOfIds;
    }
}