import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Company } from "../interfaces";
import { UserSchema } from "./User";

export interface CompanyModel
  extends Company,
    Model<
      InferAttributes<CompanyModel>,
      InferCreationAttributes<CompanyModel>
    > {
  id: CreationOptional<number>;
}

export const CompanySchema = database.define<CompanyModel>(
  "companyInformation",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kana: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    primaryUserId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    assistantUserIds: {
      type: DataTypes.CHAR,
      defaultValue: "",
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
CompanySchema.belongsTo(UserSchema, {
  foreignKey: "primaryUserId",
  as: "admin",
});
