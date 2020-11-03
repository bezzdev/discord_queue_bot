const Helper = require('../helper.js');
module.exports = {
    execute: function (server, msg, message_body, splits) {
        let found_server_user = server.users.find(u => u.id == msg.author.id)
        if (found_server_user == null) {
            found_server_user = {
                name: msg.author.username,
                discriminator: msg.author.discriminator,
                id: msg.author.id,
                notify: false
            }
            server.users.push(found_server_user)
        } else {
            found_server_user.notify = false
        }
        msg.reply("You will not be notified if a game is ready.");
    }
}