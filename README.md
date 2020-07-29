# sadbot

A discord bot to crack down on discord gif spam. Will instantly delete any message that has an embed with a gif/webm/gifv.

This bot was only created to work with a single server at a time, hence the requirement for your discord server ID in the config file.

Either ask Redoran for the bot invite link, or host and set up the server yourself.

## Sadbot commands

    ?sadbot | ?sadbot about         : Display bot info
    ?sadbot help                    : Show this help message
    ?sadbot nogif                   : Stops Happy/Hannerz from posting gifs for 10 minutes (hardcoded)
    ?sadbot nogif <@user>           : Stops a user from posting gifs for 10 minutes
    ?sadbot nogif <@user> <min>     : Stops a user from posting gifs for <min> minutes
    ?sadbot nogif <@user> perma     : Stops a user from posting gifs permanently
    ?sadbot nogif <#channel>        : Stops all users from posting gifs to <#channel> for 10 minutes
    ?sadbot nogif <#channel> perma  : Stops all users from posting gifs to <#channel> permanently
    ?sadbot nogif <#channel> <min>  : Stops all users from posting gifs to <#channel> for <min> minutes
    ?sadbot gif <@user>             : Removes a user from gif blacklist
    ?sadbot gif <#channel>          : Removes a channel from gif blacklist

----

## Installation instructions

Install by:

    npm install

and then create a file called `config.json` with your discord bot token in the following format:

    {
      "token":"YOUR_DISCORD_BOT_TOKEN_HERE"
      "guildID":"YOUR_DISCORD_SERVER_ID_HERE"
    }


Run with:

    npm run
    

