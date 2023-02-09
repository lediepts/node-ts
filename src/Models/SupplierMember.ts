import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { SupplierMember } from "../interfaces";

export interface SupplierMemberModel
  extends SupplierMember,
    Model<
      InferAttributes<SupplierMemberModel>,
      InferCreationAttributes<SupplierMemberModel>
    > {
  id: CreationOptional<number>;
  kana: CreationOptional<string>;
  phoneNumber: CreationOptional<string>;
}

export const SupplierMemberSchema = database.define<SupplierMemberModel>(
  "supplierMembers",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    supplierId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    kana: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    phoneNumber: {
      type: DataTypes.CHAR(50),
      defaultValue: "",
    },
    email: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
