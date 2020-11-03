const Helper = require('../helper.js');
module.exports = {
    execute: function (server, msg, message_body, splits) {
        let game_name = message_body
        let game = Helper.find_game(server.games, game_name)
        if (game == null) {
            // game not found
            msg.reply('game "' + game_name + '" doesn\'t exist');
        } else {
            // show the games list
            let embed = Helper.get_games_embed(server);
            msg.channel.send(embed);

            // get the call to action message
            let message = Helper.get_call_to_action(server, game)
            msg.channel.send(message);
        }
    }
}