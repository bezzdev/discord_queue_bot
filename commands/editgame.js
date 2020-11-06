const Helper = require('../helper.js');
module.exports = {
    execute: function (server, msg, message_body, splits) {
        let game_name = message_body
        let number = 0
        if (splits.length > 0) {
            let found_number = splits[splits.length - 1]
            let parsed = parseInt(found_number)
            if (!isNaN(parsed)) {
                number = parsed
                game_name = game_name.substring(0, game_name.length - (found_number.length + 1))
            }
        }

        let game = Helper.find_game(server.games, game_name)
        if (game == null) {
            msg.reply('game "' + game_name + '" not found');
        } else {
            game.ping_count = number
            // add the game
            msg.reply('updated game "' + game_name + '"');
        }
    }
}