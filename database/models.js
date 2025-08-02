const { DataTypes } = require('sequelize');

let UserProfile;

function initialize(sequelize) {
    UserProfile = sequelize.define('UserProfile', {
        discordId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        profession: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        portfolio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        skills: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('skills');
                return rawValue ? rawValue.split(';') : [];
            },
            set(val) {
                this.setDataValue('skills', val.join(';'));
            },
        },
    });
}

function getUserProfileModel() {
    return UserProfile;
}

module.exports = { initialize, getUserProfileModel };
