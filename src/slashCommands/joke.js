const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports.commandLogic = async itemsToImport => {
    const {interaction} = itemsToImport;
  
    const joke = await fetch('https://official-joke-api.appspot.com/random_joke');
    const jokeJSON = await joke.json();

    interaction.createMessage( {"embeds": [{"title": jokeJSON.setup,"description": jokeJSON.punchline,"color": 2717868}]}).catch(err => console.error("Cannot send messages to this channel", err));
}

module.exports.description = "Get a random joke"

module.exports.category = "Fun" 