/**
 * Created by Redoran on 20/07/24.
 *
 * This is all really ugly and bad code
 * pls ignore
 *
 * will be improved later.. hopefully
 */

/*
TODO:
    - Switch all of this to a database, mongodb probably
    - Don't use switch for commands, split into different files
    - Create proper config file that updates n stuff
    - Add more moderation tools than just gif stuff
    - Add basic functionality
 */


const Discord = require('discord.js');
const fs = require('fs');
let config = null;

try{
    config = require('./config.json');
}catch(err){
    console.log("Config file not loaded. Exiting!");
    console.log("Read the README file for more information.");
    process.exit(1);
}


const client = new Discord.Client();

let userBlacklist = [];
let channelBlacklist = [];

client.once('ready', () => {
    console.log('Ready!');

    if(!fs.existsSync("./userGifBlacklist")){
        fs.writeFileSync("./userGifBlacklist", null);
    }
    if(!fs.existsSync("./channelGifBlacklist")){
        fs.writeFileSync("./channelGifBlacklist", null);
    }

    fs.readFile("./userGifBlacklist", 'utf8', (err,data) => {
        if(!err){
            userBlacklist = data.split(/\n+/).map(x => x.split("|").map(y => y.trim()));
        }else{
            console.error("Unable to read user blacklist file. Error log below\n" +
                "----------------------------\n" + err);
            process.exit(1);
        }
    });

    fs.readFile("./channelGifBlacklist", 'utf8', (err,data) => {
        if(!err){
            channelBlacklist = data.split(/\n+/).map(x => x.split("|").map(y => y.trim()));
        }else{
            console.error("Unable to read channel blacklist file. Error log below\n" +
                "----------------------------\n" + err);
            process.exit(1);
        }
    });

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
            default:
                about(message.channel);
                break;
        }

        if(message.member.permissions.has("MANAGE_GUILD")){
            switch(args[0]){
                case 'nogif':
                    if(args[2]){
                        if(message.mentions.members.size == 1){

                        }else if(message.mentions.channels.size == 1){
                            console.log("channel mentioned");
                        }else{
                            // no correct mention was provided
                        }

                    }
                    else if(args[1]){
                        if(message.mentions.members.size == 1){

                            blacklistUser(message.mentions.users.first().id, 10);

                        }else if(message.mentions.channels.size == 1){
                            blacklistChannel(message.mentions.channels.first().id, 10);
                        }else{
                            // no correct mention was provided
                        }
                    }
                    else{
                        // yes this is hardcoded to nogif Happy
                        message.channel.send("No user specified. Muting <@!684410145496891403>");
                    }
                    break;
                case 'gif':
                    break;
                default:
                    break;
            }
        }

    }else if(hasDisallowedGif(message)){
        message.delete();
        console.log(`Deleting message from ${message.author.username}`)
    }
});

function help(channel){
    channel.send(
        "SadBot v1.0 command list:\n" +
        "?sadbot | ?sadbot about         : Display bot info\n" +
        "?sadbot help                    : Show this help message\n" +
        "?sadbot nogif                   : Stops Happy/Hannerz from posting gifs for 10 minutes (hardcoded)\n" +
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

function blacklistUser(userID, time){

    let found = userBlacklist.find(x => {
        return (x[0] == userID)
    });

    if(found != undefined){
        found[1] = time*60*1000 + Date.now();
    }else{
        userBlacklist.push([userID, time*60*1000 + Date.now()]);
    }

    updateFile("./userGifBlacklist", userBlacklist);
}

function blacklistChannel(channelID, time){
    let found = channelBlacklist.find(x => {
        return (x[0] == message.mentions.channels.first().id)
    });

    if(found != undefined){
        found[1] = 10*60*1000 + Date.now();
    }else{
        channelBlacklist.push([channelID, 10*60*1000 + Date.now()]);
    }

    updateFile("./channelGifBlacklist", userBlacklist);
}

function updateFile(filename, newArr){
    let data = "";

    newArr.forEach(e => {
        data += e[0]+"|"+e[1]+"\n";
    })

    fs.writeFile(filename, data, "utf8", (err) => {
        if(err){
            console.error(`Updating ${filename} has failed. Error log below:\n`+err);
        }
    })
}

/**
 * 2 AM code right here
 *
 * bound to be some good stuff
 */
function hasDisallowedGif(message){
    let cindex, uindex;
    const c = channelBlacklist.find((x,i) => {
        if(x[0] == message.channel.id){
            cindex = i;
            return true;
        }else{
            return false;
        }
    });
    const u = userBlacklist.find((x,i) => {
        if(x[0] == message.author.id){
            uindex = i;
            return true;
        }else{
            return false;
        }
    });

    if(c){
        if(c[1] <= Date.now() || c[1] === 0){
            return true;
        }else{
            channelBlacklist.splice(cindex, 1);
            return false;
        }
    }else if(u){
        if(u[1] <= Date.now() || u[1] === 0){
            userBlacklist.splice(uindex, 1);
            return false;
        }
    }else{
        return false;
    }
}