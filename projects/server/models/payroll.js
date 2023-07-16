"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payroll extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Payroll.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        hooks: true,
      });
    }
  }
  Payroll.init(
    {
      user_id: DataTypes.INTEGER,
      total_deduction: DataTypes.INTEGER,
      total_salary: DataTypes.INTEGER,
      paydate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Payroll",
    }
  );
  return Payroll;
};
