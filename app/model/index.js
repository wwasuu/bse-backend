const Sequelize = require("sequelize");
const sequelize = require("../lib/sequelize");
const AuthModel = require("./auth");
const DeviceModel = require("./device");
const DeviceMenuModel = require("./deviceMenu");
const DeviceVisualizeModel = require("./deviceVisualize");
const UserDeviceModel = require("./userDevice");
const UserModel = require("./user")

const Auth = AuthModel(sequelize, Sequelize);
const Device = DeviceModel(sequelize, Sequelize);
const DeviceMenu = DeviceMenuModel(sequelize, Sequelize);
const DeviceVisualize = DeviceVisualizeModel(sequelize, Sequelize);
const UserDevice = UserDeviceModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Device.hasMany(DeviceMenu, { as: "menu", foreignKey: "device_id" });
DeviceMenu.hasMany(DeviceVisualize, { as: "data", foreignKey: "device_menu_id" });
UserDevice.hasOne(Device, { as: "device", foreignKey: "id", sourceKey: "device_id" })

module.exports = {
    Op: Sequelize.Op,
    QueryTypes: Sequelize.QueryTypes,
    Auth,
    Device,
    DeviceMenu,
    DeviceVisualize,
    UserDevice,
    User
};