module.exports = (sequelize, type) => {
    return sequelize.define(
        "user_device", {
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
            serial_number: {
                type: type.STRING,
            },
            name: {
                type: type.STRING,
            },
            token: {
                type: type.STRING,
            },
            latitude: {
                type: type.DECIMAL(10,8),
            },
            longitude: {
                type: type.DECIMAL(11,8),
            },
            manufacture_date: type.DATE,
            created_at: type.DATE,
            updated_at: type.DATE,
        }, {
            underscored: true,
            freezeTableName: true,
            timestamps: true,
        }
    );
};