const Discord = require('discord.js');
const client = new Discord.Client();
const Helper = require('./helper.js');
const fs = require("fs");
const Help = require('./commands/help.js');
const Games = require('./commands/games.js');
const AddGame = require('./commands/addgame.js');
const RemoveGame = require('./commands/removegame.js');
const JoinGame = require('./commands/joingame.js');
const LeaveGame = require('./commands/leavegame.js');
const PlayGame = require('./commands/playgame.js');
const NotifyMe = require('./commands/notifyme.js');
const DontNotifyMe = require('./commands/dontnotifyme.js');

let token = fs.readFileSync("./token.txt", "utf-8");;

let servers = Helper.get_servers()

let commands = [
    { name: "help", execution: Help.execute },
    { name: "games", execution:  Games.execute },
    { name: "addgame", execution:  AddGame.execute },
    { name: "removegame", execution:  RemoveGame.execute },
    { name: "joingame", execution: JoinGame.execute },
    { name: "leavegame", execution: LeaveGame.execute },
    { name: "playgame", execution: PlayGame.execute },
    { name: "notifyme", execution: NotifyMe.execute },
    { name: "dontnotifyme", execution: DontNotifyMe.execute },
]

function handle_message(server, msg) {
    for (let c = 0; c < commands.length; c++) {
        let command = commands[c];
        let prepend_symbol = "!"        

        // check if its the correct command
        if (msg.content.startsWith(prepend_symbol + command.name) || msg.content == prepend_symbol + command.name) {
            // get the message data

            let message_body = msg.content.substring(1 + command.name.length);
            if (msg.content.length > 1 + command.name.length) {
                message_body = message_body.substring(1);
            }
            let splits = message_body.split(' ');

            // execute the command
            command.execution(server, msg, message_body, splits);

            break;
        }
    }
}

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.bot == false) {
        let server = Helper.find_server(servers, msg)
        if (server == null) {
            server = {
                id: msg.guild.id,
                games: [],
                users: []
            }
            Helper.add_server(servers, server)
        }
        handle_message(server, msg)
        Helper.save_servers(servers)
    }
});

client.login(token);