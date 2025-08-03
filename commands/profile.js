const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profile')
        .setDescription('Manage your professional profile.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription('Set your professional profile details.')
                .addStringOption(option =>
                    option.setName('profession')
                        .setDescription('Your primary profession (e.g., Illustrator, Web Developer).')
                        .setRequired(false))
                .addStringOption(option =>
                    option.setName('portfolio')
                        .setDescription('Link to your online portfolio/website.')
                        .setRequired(false))
                .addStringOption(option =>
                    option.setName('skills')
                        .setDescription('Comma-separated list of your skills (e.g., Photoshop, Node.js, UI/UX).')
                        .setRequired(false))
                .addStringOption(option =>
                    option.setName('customname')
                        .setDescription('A custom name to display on your profile (overrides Discord name).')
                        .setRequired(false)))
        .addSubcommand(subcommand =>
            subcommand
                .setName('view')
                .setDescription("View your own or another user's professional profile.")
                .addUserOption(option =>
                    option.setName('user')
                        .setDescription('The user whose profile you want to view.')
                        .setRequired(false))),

    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true }); // Defer reply immediately

        const UserProfile = interaction.client.userProfiles;
        const subcommand = interaction.options.getSubcommand();
        const discordId = interaction.user.id;

        if (subcommand === 'set') {
            const profession = interaction.options.getString('profession');
            const portfolio = interaction.options.getString('portfolio');
            const skills = interaction.options.getString('skills');
            const customName = interaction.options.getString('customname');

            try {
                const [profile, created] = await UserProfile.findOrCreate({
                    where: { discordId: discordId },
                    defaults: {
                        profession: profession,
                        portfolio: portfolio,
                        skills: skills ? skills.split(',').map(s => s.trim()) : [],
                        customDisplayName: customName,
                    },
                });

                if (!created) {
                    const updateFields = {};
                    if (profession !== null) updateFields.profession = profession;
                    if (portfolio !== null) updateFields.portfolio = portfolio;
                    if (skills !== null) updateFields.skills = skills ? skills.split(',').map(s => s.trim()) : [];
                    if (customName !== null) updateFields.customDisplayName = customName;

                    if (Object.keys(updateFields).length > 0) {
                        await profile.update(updateFields);
                    }
                }

                await interaction.editReply({
                    content: 'Your profile has been updated!',
                    ephemeral: true
                });

            } catch (error) {
                console.error('Error setting user profile:', error);
                await interaction.editReply({
                    content: 'There was an error while trying to set your profile. Please try again later.',
                    ephemeral: true
                });
            }

        } else if (subcommand === 'view') {
            const targetUser = interaction.options.getUser('user') || interaction.user;

            try {
                const profile = await UserProfile.findOne({ where: { discordId: targetUser.id } });

                if (profile) {
                    const skillsList = profile.skills.length > 0 ? profile.skills.join(', ') : 'Not specified';
                    const portfolioLink = profile.portfolio ? `[${profile.portfolio}](${profile.portfolio})` : 'Not specified';
                    const displayedName = profile.customDisplayName || targetUser.displayName;

                    const embed = {
                        color: 0x0099ff,
                        title: `${displayedName}'s Profile`,
                        fields: [
                            { name: 'Profession', value: profile.profession || 'Not specified' },
                            { name: 'Portfolio', value: portfolioLink },
                            { name: 'Skills', value: skillsList },
                        ],
                        timestamp: new Date().toISOString(),
                    };

                    await interaction.editReply({ embeds: [embed] }); // Use editReply for embeds
                } else {
                    await interaction.editReply({
                        content: `${targetUser.displayName} does not have a profile set up yet.`, ephemeral: true
                    });
                }
            } catch (error) {
                console.error('Error viewing user profile:', error);
                await interaction.editReply({
                    content: 'There was an error while trying to retrieve the profile. Please try again later.',
                    ephemeral: true
                });
            }
        }
    },
};
