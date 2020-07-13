'use strict'

module.exports = (sequelize, DataTypes) =>
{
    var User = sequelize.define('SG_Users', 
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        }
    });

    return User;
}