const Helper = require('../helper.js');
module.exports = {
    execute: function (server, msg, message_body, splits) {
        let commands = "\n"
        commands = commands + "!help\n"// + " Will show help.\n"
        commands = commands + "!games\n"// + " will show the current games available\n"
        commands = commands + "!addgame game 5\n"// + " Will let you add games to the games list.\n"
        commands = commands + "adds a game to the list, if a number is provided a notification will be sent when that user count is reached \n\n"
        commands = commands + "!removegame game\n"// + " Will let you remove games from the games list.\n"
        commands = commands + "!joingame game\n"// + " Will add you to the game queue.\n"
        commands = commands + "!leavegame game\n"// + " Will remove you from a game queue.\n"
        commands = commands + "!playgame game\n"// + " will call to action everyone queued for that game.\n"
        commands = commands + "!dontnotifyme\n"// + " will prevent you from getting notifications when a game queue is ready.\n"
        commands = commands + "!notifyme\n"// + " will allow you to receive notifications when a game queue is ready.\n"
        
        msg.reply(commands);
    }
}