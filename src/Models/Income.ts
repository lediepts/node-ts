import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Income } from "../interfaces";

export interface IncomeModel
  extends Income,
    Model<InferAttributes<IncomeModel>, InferCreationAttributes<IncomeModel>> {
  id: CreationOptional<number>;
  average: CreationOptional<number>;
}

export const IncomeSchema = database.define<IncomeModel>(
  "incomes",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    start: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    end: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    fee: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    average: {
      type: DataTypes.VIRTUAL,
      get() {
        const startYear = new Date(this.start).getFullYear();
        const startMonth = new Date(this.start).getMonth();
        const endYear = new Date(this.end).getFullYear();
        const endMonth = new Date(this.end).getMonth() + 1;
        return (
          this.fee / ((endYear - startYear) * 12 - (startMonth - endMonth))
        );
      },
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
