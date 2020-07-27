/**
 * Created by Redoran on 20/07/24.
 */


const Discord = require('discord.js');
let config = null;

try{
    config = require('./config.json');
}catch(err){
    console.log("Config file not loaded. Exiting!");
    console.log("Read the README file for more information.");
    process.exit(1);
}


const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(config.token);

client.on('message', message => {
    if(message.content.startsWith("?sadbot")){
        const args = message.content.slice(1).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        switch(args[0]){
            case 'help':
                help(message.channel);
                break;
            case 'nogif':
                if(args[1]){
                    //console.log(args[1])
                }else{
                    // yes this is hardcoded to nogif Happy
                    message.channel.send("No user specified. Muting <@!684410145496891403>");
                }
                break;
            default:
                about(message.channel);
                break;
        }

    }
});

function help(channel){
    channel.send(
        "SadBot v1.0 command list:\n" +
        "?sadbot | ?sadbot about         : Display bot info\n" +
        "?sadbot help                    : Show this help message\n" +
        "?sadbot nogif                   : Stops Happy from posting gifs for 10 minutes (hardcoded)\n" +
        "?sadbot nogif <@user>           : Stops a user from posting gifs for 10 minutes\n" +
        "?sadbot nogif <@user> <min>     : Stops a user from posting gifs for <min> minutes\n" +
        "?sadbot nogif <@user> perma     : Stops a user from posting gifs permanently\n"+
        "?sadbot nogif <#channel>        : Stops all users from posting gifs to <#channel> for 10 minutes\n" +
        "?sadbot nogif <#channel> perma  : Stops all users from posting gifs to <#channel> permanently\n" +
        "?sadbot nogif <#channel> <min>  : Stops all users from posting gifs to <#channel> for <min> minutes\n" +
        "?sadbot gif <@user>             : Removes a user from gif blacklist\n" +
        "?sadbot gif <#channel>          : Removes a channel from gif blacklist\n"
    )
}

function about(channel){
    channel.send("SadBot v1.0.\n" +
        "Created by Redoran\n" +
        "Use ?sadbot help for command list");
}