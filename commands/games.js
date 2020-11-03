const Helper = require('../helper.js');
module.exports = {
    execute: function (server, msg, message_body, splits) {
        let embed = Helper.get_games_embed(server);
        msg.channel.send(embed);
    }
}