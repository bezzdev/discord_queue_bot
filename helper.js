const Discord = require('discord.js');
const fs = require('fs');
const { stringify } = require('querystring');
module.exports = {
    get_servers: function () {
        let servers = []
        let servers_folder = "./servers/"
        fs.readdirSync(servers_folder).forEach(filename => {
            if (filename !== "empty.txt") {
                let data = fs.readFileSync(servers_folder + filename, {encoding:'utf8', flag:'r'});
                let server = JSON.parse(data)
                servers.push(server)
            }
        });
        return servers
    },
    find_server: function (servers, msg) {
        let id = msg.guild.id
        let server = servers.find(s => s.id == id)
        return server
    },
    add_server: function (servers, server) {
        servers.push(server)
        this.save_server(server)
    },
    save_servers: function (servers) {
        let scope = this
        servers.forEach(function (server) {
            scope.save_server(server)
        })
    },
    save_server: function (server) {
        let filename = server.id + ".json"
        let filepath = "./servers/" + filename
        let data = JSON.stringify(server)
        fs.writeFileSync(filepath, data); 
    },
    find_game: function (games, game_name) {
        let game = games.find(g => g.name.toLowerCase() == game_name.toLowerCase())
        if (game) {
            return game
        }
        return null
    },    
    check_ping_count: function (game) {
        if (game.ping_count > 0 && game.users.length >= game.ping_count) {
            return true
        }
        return false
    },
    get_call_to_action: function (server, game) {
        let found_users = game.users
        let users = ""
        found_users.forEach(function (user) {
            let found_user = server.users.find(u => u.id == user.id)
            let shouldPing = user.notify

            if (shouldPing) {
                let user_mention = "<@" + user.id + ">"
                users = users + user_mention + ','
            } else {
                users = users + user.name + ','
            }
        })
        if (users.length > 0) {
            users = users.substring(0, users.length - 1)
        }
        
        let message = users
        message = message + "\n"
        message = message + "Want to play " + game.name + "?"
        return message;
    },
    get_games_embed(server) {
        let embed = new Discord.MessageEmbed()
            .setTitle('Available Game Queues')
            .setColor(0x00ffff)
            .setDescription('If you want to join a game queue, type !joingame "game"');

            server.games.forEach(function (game) {
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
            if (game.users.length > 0) {
                users = users.substring(0, users.length - 1)
            }
            embed.addField(title, users);
        })
        return embed
    }
}