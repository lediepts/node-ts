import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Project, ProjectStatus } from "../interfaces";
import { CostSchema } from "./Cost";
import { IncomeSchema } from "./Income";

export interface ProjectModel
  extends Project,
    Model<
      InferAttributes<ProjectModel>,
      InferCreationAttributes<ProjectModel>
    > {
  id: CreationOptional<number>;
  status: CreationOptional<ProjectStatus>;
}

export const ProjectSchema = database.define<ProjectModel>(
  "projects",
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
    scheduledStart: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: false,
    },
    scheduledEnd: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: false,
    },
    scheduledIncome: {
      type: DataTypes.BIGINT.UNSIGNED,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["受注前", "実施中", "完了"],
      defaultValue: "受注前",
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
ProjectSchema.hasMany(CostSchema, {
  foreignKey: "projectId",
  as: "costs",
});
ProjectSchema.hasMany(IncomeSchema, {
  foreignKey: "projectId",
  as: "incomes",
});
