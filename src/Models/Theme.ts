import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Theme } from "../interfaces";

export interface ThemeModel
  extends Theme,
    Model<InferAttributes<ThemeModel>, InferCreationAttributes<ThemeModel>> {
  id: CreationOptional<number>;
}

export const ThemeSchema = database.define<ThemeModel>(
  "themes",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    primary: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    secondary: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
