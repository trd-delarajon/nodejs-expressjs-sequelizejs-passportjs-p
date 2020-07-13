'use strict'

module.exports = 
{
    up: (queryInterface, Sequelize) => 
    {
        return queryInterface.createTable('SG_Users', 
        {
            id: 
            {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            createdAt:
            {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt:
            {
                allowNull: false,
                type: Sequelize.DATE
            },
            username:
            {
                allowNull: false,
                type: Sequelize.STRING
            },
            password:
            {
                allowNull: false,
                type: Sequelize.STRING
            },
            is_admin:
            {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                defaultValue: false
            },
        });
    },

    down: (queryInterface, Sequelize) => 
    {
        return queryInterface.dropTable('SG_Users');
    }
}