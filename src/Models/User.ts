import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { User } from "../interfaces";
import { SalarySchema } from "./Salary";
import { ThemeSchema } from "./Theme";

export interface UserModel
  extends User,
    Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: CreationOptional<number>;
  themeId: CreationOptional<number>;
}

export const UserSchema = database.define<UserModel>(
  "users",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    localAccountId: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    code: {
      type: DataTypes.CHAR,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kana: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
    phone: {
      type: DataTypes.CHAR,
    },
    avatar: {
      type: DataTypes.TEXT("long"),
    },
    themeId: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: 1,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    hireDate: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    retirementDate: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);

UserSchema.hasMany(SalarySchema, {
  foreignKey: "uId",
  as: "salaries",
});
UserSchema.belongsTo(ThemeSchema, {
  foreignKey: "themeId",
  as: "theme",
});
