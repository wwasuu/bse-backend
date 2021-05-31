module.exports = (sequelize, type) => {
    return sequelize.define(
        "device_visualize", {
            id: {
                type: type.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            device_menu_id: {
                type: type.INTEGER,
            },
            i: {
                type: type.STRING,
                unique: true,
            },
            x: {
                type: type.INTEGER,
            },
            y: {
                type: type.INTEGER,
            },
            h: {
                type: type.INTEGER,
            },
            w: {
                type: type.INTEGER,
            },
            background_color: {
                type: type.STRING,
            },
            port: {
                type: type.STRING,
            },
            type: {
                type: type.STRING,
            },
            left_label: {
                type: type.STRING,
            },
            left_icon: {
                type: type.STRING,
            },
            right_label: {
                type: type.STRING,
            },
            right_icon: {
                type: type.STRING,
            },
            prefix_value: {
                type: type.STRING,
            },
            suffix_value: {
                type: type.STRING,
            },
            text_active: {
                type: type.STRING,
            },
            value_active: {
                type: type.STRING,
            },
            color_active: {
                type: type.STRING,
            },
            text_inactive: {
                type: type.STRING,
            },
            value_inactive: {
                type: type.STRING,
            },
            color_inactive: {
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