import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Cost } from "../interfaces";

export interface CostModel
  extends Cost,
    Model<InferAttributes<CostModel>, InferCreationAttributes<CostModel>> {
  id: CreationOptional<number>;
}

export const CostSchema = database.define<CostModel>(
  "costs",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    pId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    uId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    pay: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    date: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
