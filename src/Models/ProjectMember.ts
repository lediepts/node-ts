import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { ProjectMember } from "../interfaces";
import { ProjectSchema } from "./Project";
import { UserSchema } from "./User";

export interface ProjectMemberModel
  extends ProjectMember,
    Model<
      InferAttributes<ProjectMemberModel>,
      InferCreationAttributes<ProjectMemberModel>
    > {
  id: CreationOptional<number>;
}

export const ProjectMemberSchema = database.define<ProjectMemberModel>(
  "projectMembers",
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
    type: {
      type: DataTypes.ENUM,
      values: ["leader", "member"],
      allowNull: false,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
ProjectSchema.belongsToMany(UserSchema, {
  through: ProjectMemberSchema,
  foreignKey: "pId",
  as: "members",
});
UserSchema.belongsToMany(ProjectSchema, {
  through: ProjectMemberSchema,
  foreignKey: "orgId",
  as: "projects",
});
