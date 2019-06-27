
const { quoteText } = require('./util');
const { clearMessages, kickMember } = require('./core');
const { displayName, version } = require('./package.json');

const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();

client.once('ready', () => {
    console.log('The bot is online!');
});

client.on('message', message => {

    // Identify bot commands. Exit if not a valid command.
    if (!message.content.startsWith(`${prefix}`)) {
        return;
    }

    // Split the message into commands.
    let commands = message.content.substring(prefix.length).split(" ");

    // Switch between commands.
    switch (commands[0]) {
        case "info":
            message.channel.send(quoteText(`${displayName} - ${version}`));

            break;
        case "kick":
            if (commands[1]) {
                kickMember(message, commands);
            } else {
                message.channel.send(quoteText('Usage : !kick <username>'));
            }

            break;
        case "clear":
            if (commands[1]) {
                if (isNaN(commands[1])) {
                    message.channel.send(quoteText('Number of messages needs to be a number.'));
                } else {
                    clearMessages(message, commands);
                }
            } else {
                message.channel.send(quoteText('Usage : !clear <number-of-messages>'));
            }
            break;
    }
});

client.login(token);