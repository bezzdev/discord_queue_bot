module.exports = {
    find_game: function(games, game_name) {
        let game = games.find(g => g.name == game_name)
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
    get_call_to_action: function (game) {
        let found_users = game.users
        let users = ""
        found_users.forEach(function (user) {
            let user_mention = "<@" + user.id + ">"
            users = users + user_mention + ','
        })
        if (users.length > 0) {
            users = users.substring(0, users.length - 1)
        }
        
        let message = users
        message = message + "\n"
        message = message + "Want to play " + game.name + "?"
        return message;
    }
}