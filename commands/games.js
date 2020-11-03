const Discord = require('discord.js');
const Helper = require('../helper.js');
module.exports = {
    execute: function (games, msg, message_body, splits) {
        const embed = new Discord.MessageEmbed()
            .setTitle('Available Game Queues')
            .setColor(0x00ffff)
            .setDescription('If you want to join a game queue, type !joingame "game"');

        games.forEach(function (game) {
            let title = game.name
            if (game.ping_count > 0) {
                title = title + " " + game.users.length + "/" + game.ping_count
            }
            let users = ""
            if (game.users.length == 0) {
                users = "None"
            }
            game.users.forEach(function (user) {
                let user_mention = "<@" + user.id + ">"
                users = users + user_mention + ','
            })
            if (users.length > 0) {
                users = users.substring(0, users.length - 1)
            }
            embed.addField(title, users);
        })

        msg.channel.send(embed);
    }
}