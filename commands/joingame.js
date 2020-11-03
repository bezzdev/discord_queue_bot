const Helper = require('../helper.js');
module.exports = {
    execute: function (games, msg, message_body, splits) {
        let game_name = message_body
        let game = Helper.find_game(games, game_name)
        if (game == null) {
            // game not found
            msg.reply('game "' + game_name + '" doesn\'t exist');
        } else {
            // find the user
            let found_user = game.users.find(u => u.name == msg.author.username && u.discriminator == msg.author.discriminator)
            if (found_user) {
                msg.reply('You have already joined the game "' + game_name);
            } else {
                // add the user to the game
                game.users.push({
                    name: msg.author.username,
                    discriminator: msg.author.discriminator,
                    id: msg.author.id
                })

                msg.reply('Joined game "' + game_name);
                if(Helper.check_ping_count(game)) {
                    let message = Helper.get_call_to_action(game)
                    msg.channel.send(message);
                }
            }
        }
    }
}