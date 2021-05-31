module.exports = (sequelize, type) => {
    return sequelize.define(
      "auth",
      {
        id: {
          type: type.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: type.STRING,
          unique: true,
        },
        password: type.TEXT("long"),
        access_token: {
          type: type.TEXT("long"),
          allowNull: true,
        },
        role: type.STRING,
        created_at: type.DATE,
        updated_at: type.DATE,
      },
      {
        underscored: true,
        freezeTableName: true,
        timestamps: true,
      }
    );
  };
  