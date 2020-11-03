const Helper = require('../helper.js');
module.exports = {
    execute: function (games, msg, message_body, splits) {
        let game_name = message_body
        let game = Helper.find_game(games, game_name)
        if (game == null) {
            // game not found
            msg.reply('game "' + game_name + '" doesn\'t exist');
        } else {
            // get the call to action message
            let message = get_call_to_action(game)

            msg.channel.send(message);
        }
    }
}