const Helper = require('../helper.js');
module.exports = {
    execute: function (server, msg, message_body, splits) {
        let game_name = message_body
        let game = Helper.find_game(server.games, game_name)
        if (game == null) {
            // game not found
            msg.reply('game "' + game_name + '" doesn\'t exist');
        } else {
            let found_user = game.users.find(u => u.id == msg.author.id)
            
            // remove the user from the game
            if (!found_user) {
                msg.reply('You have not joined the game "' + game.name + '"');
            } else {
                let user_index = game.users.indexOf(found_user)
                game.users = game.users.slice(user_index + 1)
                msg.reply('Left game "' + game.name + '"');
            }
        }
    }
}