import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { ProjectSupplier } from "../interfaces";
import { ProjectSchema } from "./Project";
import { SupplierSchema } from "./Supplier";

export interface ProjectSupplierModel
  extends ProjectSupplier,
    Model<
      InferAttributes<ProjectSupplierModel>,
      InferCreationAttributes<ProjectSupplierModel>
    > {
  id: CreationOptional<number>;
}

export const ProjectSupplierSchema = database.define<ProjectSupplierModel>(
  "projectSuppliers",
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
    supplierId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    SupplierMember: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
ProjectSchema.belongsToMany(SupplierSchema, {
  through: ProjectSupplierSchema,
  foreignKey: "pId",
  as: "suppliers",
});
SupplierSchema.belongsToMany(ProjectSchema, {
  through: ProjectSupplierSchema,
  foreignKey: "supplierId",
  as: "projects",
});
