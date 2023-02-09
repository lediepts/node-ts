import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Permission } from "../interfaces";

export interface PermissionModel
  extends Permission,
    Model<
      InferAttributes<PermissionModel>,
      InferCreationAttributes<PermissionModel>
    > {
  id: CreationOptional<number>;
}

export const PermissionSchema = database.define<PermissionModel>(
  "permissions",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
    timestamps: false,
  }
);
