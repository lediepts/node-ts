import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Salary } from "../interfaces";

export interface SalaryModel
  extends Salary,
    Model<InferAttributes<SalaryModel>, InferCreationAttributes<SalaryModel>> {
  id: CreationOptional<number>;
}

export const SalarySchema = database.define<SalaryModel>(
  "salaries",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    uId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    date: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    pay: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: 0,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
