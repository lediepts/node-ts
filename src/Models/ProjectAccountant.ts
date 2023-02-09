import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { ProjectAccountant } from "../interfaces";
import { ProjectSchema } from "./Project";
import { UserSchema } from "./User";

export interface ProjectAccountantModel
  extends ProjectAccountant,
    Model<
      InferAttributes<ProjectAccountantModel>,
      InferCreationAttributes<ProjectAccountantModel>
    > {
  id: CreationOptional<number>;
}

export const ProjectAccountantSchema = database.define<ProjectAccountantModel>(
  "projectAccountants",
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
    uId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
ProjectSchema.belongsToMany(UserSchema, {
  through: ProjectAccountantSchema,
  foreignKey: "pId",
  as: "org",
});
UserSchema.belongsToMany(ProjectSchema, {
  through: ProjectAccountantSchema,
  foreignKey: "uId",
  as: "accountants",
});
