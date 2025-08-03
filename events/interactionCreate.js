const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error('Error executing command:', error);

            const errorMessage = {
                content: 'There was an error while executing this command!',
                ephemeral: true
            };

            // Check if we can still respond
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply(errorMessage);
            } else if (interaction.deferred) {
                await interaction.editReply(errorMessage);
            }
            // If already replied, we can't do anything more.
        }
    },
};
