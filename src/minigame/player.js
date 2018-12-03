'use strict'
module.exports = class Player {
    constructor( username, discordUser ) {
        // units is array of cards (5)
        this.username = username
        this.user = discordUser
        this.status = "active"
        this.ready = false;
        // new
        this.itemsObtained = []
        this.experienceGained = 3
        this.extraExperienceGained = 0
        this.tacosEarned = 5
        this.extraTacosEarned = 0
    }
    // take turn
    takeTurn(numberTaken, Board){
        // take the turn on the board
        // valid only if it is the player's turn
        if (Board.validUser(this.user.id)){
            //
            return Board.makeMove(this, numberTaken);
        }else{
            return "Invalid user";
        }
        
    }

    playerIsReady(){
        this.ready = true;
    }

    getPlayerReadyStatus(){
        return this.ready;
    }
}