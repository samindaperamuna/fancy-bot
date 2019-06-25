const { quoteText } = require('./util');
const { giphyToken } = require('./config.json');

const GphApiClient = require('giphy-js-sdk-core');
const giphy = GphApiClient(giphyToken);

module.exports = {

    /**
     * Process the kick command using the message object.
     * 
     * @param {message} message Message object from the client.
     * @param {string} commands Commands array.
     * @returns {null} null 
     */
    kickMember: (message, commands) => {
        // Verify user permissions.
        if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])) {
            let member = message.mentions.members.first();

            // If the member doesnt exist return.
            if (!member) {
                return message.channel.send(quoteText(`Member '${commands[1]}' not found.`));
            }

            // If the member exists, kick the member.

            member.kick().then(member => {
                // Search giphy.
                giphy.search('gifs', { 'q': 'fail' }).then(response => {
                    console.log(response);

                    let totalResponses = response.data.length;
                    let responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
                    let responseFinal = response.data[responseIndex];

                    message.channel.send(`:wave: ${member.displayName} has been kicked!`, {
                        files: [responseFinal.images.fixed_height.url]
                    }).catch(error => {
                        message.channel.send(error);
                    });
                });
            }).catch(error => {
                console.log(error);
            });
        } else {
            message.channel.send(`${message.member} You don't have the necessary permissions`);
        }

        return null;
    }
}