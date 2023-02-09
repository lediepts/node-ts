import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Org } from "../interfaces";

export interface OrgModel
  extends Org,
    Model<InferAttributes<OrgModel>, InferCreationAttributes<OrgModel>> {
  id: CreationOptional<number>;
}

export const OrgSchema = database.define<OrgModel>(
  "orgs",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT("long"),
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
