module.exports = (sequelize, type) => {
    return sequelize.define(
        "device_menu", {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            device_id: {
                type: type.INTEGER,
            },
            name: {
                type: type.STRING,
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