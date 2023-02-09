import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { Working } from "../interfaces";
import { ProjectSchema } from "./Project";
import { UserSchema } from "./User";

export interface WorkingModel
  extends Working,
    Model<
      InferAttributes<WorkingModel>,
      InferCreationAttributes<WorkingModel>
    > {
  id: CreationOptional<number>;
  total: CreationOptional<number>;
}

export const WorkingSchema = database.define<WorkingModel>(
  "workings",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    uId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    pId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    date: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    salary: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    workingTime: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.VIRTUAL,
      get() {
        return this.salary * this.workingTime;
      },
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
ProjectSchema.belongsToMany(UserSchema, {
  through: WorkingSchema,
  foreignKey: "pId",
  as: "workers",
});
UserSchema.belongsToMany(ProjectSchema, {
  through: WorkingSchema,
  foreignKey: "uId",
  as: "workingPJ",
});
