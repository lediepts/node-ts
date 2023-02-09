import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Supplier } from "../interfaces";
import { SupplierMemberSchema } from "./SupplierMember";

export interface SupplierModel
  extends Supplier,
    Model<
      InferAttributes<SupplierModel>,
      InferCreationAttributes<SupplierModel>
    > {
  id: CreationOptional<number>;
  email: CreationOptional<string>;
  phoneNumber: CreationOptional<string>;
}

export const SupplierSchema = database.define<SupplierModel>(
  "suppliers",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.CHAR,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.CHAR(50),
      defaultValue: "",
    },
    email: {
      type: DataTypes.CHAR,
      defaultValue: "",
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
SupplierSchema.hasMany(SupplierMemberSchema, {
  foreignKey: "supplierId",
  as: "members",
});
