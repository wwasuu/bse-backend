module.exports = (sequelize, type) => {
    return sequelize.define(
        "user_device_log", {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: type.INTEGER,
            },
            device_id: {
                type: type.INTEGER,
            },
            data: {
                type: type.TEXT("Long"),
            },
            token: {
                type: type.TEXT("Long"),
            },
            created_at: type.DATE,
            updated_at: type.DATE,
        }, {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
        }
    );
};