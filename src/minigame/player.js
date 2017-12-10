'use strict'
module.exports = class Player {
    constructor( username, discordUser ) {
        // units is array of cards (5)
        this.username = username
        this.user = discordUser
        this.status = "active"
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
}