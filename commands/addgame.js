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

        if (Helper.find_game(server.games, game_name) !== null) {
            msg.reply('game "' + game_name + '" already exists');
        } else {
            // add the game
            msg.reply('adding game "' + game_name + '"');
            server.games.push({
                name: game_name,
                users: [],
                ping_count: number
            })
        }
    }
}