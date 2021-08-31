const fetch = require('node-fetch');

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;

    if (!interaction.data.resolved) return interaction.createMessage({"flags":64, "content": "Please mention a user."}).catch(err => console.error("Cannot send messages to this channel", err));
    const mentionedUserID = Object.keys(interaction.data.resolved.users)[0]
    if (mentionedUserID === interaction.member.user.id) return interaction.createMessage({"flags":64, "content": "You cant bite yourself."}).catch(err => console.error("Cannot send messages to this channel", err));

    const bite = await fetch('https://purrbot.site/api/img/sfw/bite/gif');
    const biteJSON = await bite.json();
    
    interaction.createMessage({
        "embeds": [{
            "title": `${interaction.data.resolved.users[mentionedUserID].username} was bitten by ${interaction.member.user.username}`,
            "color": 2717868,
            "image": {
                "url": biteJSON.link
            }
        }]
    }).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Bite someone"

module.exports.options = [
    {
        "name": "user",
        "description": "The user to bite",
        "type": 6,
        "required": true,
    }
]