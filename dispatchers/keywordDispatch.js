module.exports = {
    handle(client, message) {
        const messageContent = message.content.trim();
        const keyword = client.keywords.get(messageContent)
            || client.keywords.find(kwd => kwd.aliases && kwd.aliases.includes(messageContent));
        if(keyword) {
            try {
                keyword.execute(message).catch((err) => {
                    console.error(`Failed running keyword handler ${keyword.name}: "${err.message}"`)
                });
                return true;
            } catch(error) {
                console.error(error);
            }

            return false;
        }
    }
}