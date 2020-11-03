const Helper = require('../helper.js');
module.exports = {
    execute: function (games, msg, message_body, splits) {
        let game_name = message_body

        let game = Helper.find_game(games, game_name) 
        if (game == null) {
            msg.reply('game "' + game_name + '" doesn\'t exist');
        } else {
            // remove the game
            msg.reply('removing game "' + game_name + '"');
            games.slice(games.indexOf(game))
        }
    }
}