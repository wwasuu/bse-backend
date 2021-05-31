module.exports = (sequelize, type) => {
    return sequelize.define(
        'user', {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: type.STRING,
                unique: true
            },
            name: {
                type: type.STRING,
            },
            email: {
                type: type.STRING,
            },
            mobile_number: {
                type: type.STRING,
                allowNull: true,
            },
            created_at: type.DATE,
            updated_at: type.DATE,
        }, {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
        },
    );
};