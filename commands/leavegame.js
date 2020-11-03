const Helper = require('../helper.js');
module.exports = {
    execute: function (games, msg, message_body, splits) {
        let game_name = message_body
        let game = Helper.find_game(games, game_name)
        if (game == null) {
            // game not found
            msg.reply('game "' + game_name + '" doesn\'t exist');
        } else {
            let found_user = game.users.find(u => u.name == msg.author.username && u.discriminator == msg.author.discriminator)
            
            // remove the user from the game
            if (!found_user) {
                msg.reply('You have not joined the game "' + game_name);
            } else {
                let user_index = game.users.indexOf(found_user) 
                game.users.slice(user_index)
                msg.reply('Left game "' + game_name);
            }
        }
    }
}