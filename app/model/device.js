module.exports = (sequelize, type) => {
    return sequelize.define(
        "device", {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
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