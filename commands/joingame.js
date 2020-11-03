const Helper = require('../helper.js');
module.exports = {
    execute: function (server, msg, message_body, splits) {
        let game_name = message_body
        let game = Helper.find_game(server.games, game_name)
        if (game == null) {
            // game not found
            msg.reply('game "' + game_name + '" doesn\'t exist');
        } else {
            // find the user
            let found_server_user = server.users.find(u => u.id == msg.author.id)
            if (found_server_user == null) {
                found_server_user = {
                    name: msg.author.username,
                    discriminator: msg.author.discriminator,
                    id: msg.author.id,
                    notify: true
                }
                server.users.push(found_server_user)
            }

            let found_user = game.users.find(u => u.id == msg.author.id)
            if (found_user) {
                msg.reply('You have already joined the game "' + game.name + '"');
            } else {
                // add the user to the game
                game.users.push(found_server_user)

                msg.reply('Joined game "' + game.name + '"');
                if(Helper.check_ping_count(game)) {
                    // show the games list
                    let embed = Helper.get_games_embed(server);
                    msg.channel.send(embed);

                    // get the call to action message
                    let message = Helper.get_call_to_action(server, game)
                    msg.channel.send(message);
                }
            }
        }
    }
}