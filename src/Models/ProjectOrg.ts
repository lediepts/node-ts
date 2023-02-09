import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { ProjectOrg } from "../interfaces";
import { OrgSchema } from "./Org";
import { ProjectSchema } from "./Project";

export interface ProjectOrgModel
  extends ProjectOrg,
    Model<
      InferAttributes<ProjectOrgModel>,
      InferCreationAttributes<ProjectOrgModel>
    > {
  id: CreationOptional<number>;
}

export const ProjectOrgSchema = database.define<ProjectOrgModel>(
  "projectOrgs",
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
    orgId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    orgCode: {
      type: DataTypes.CHAR,
      allowNull: false,
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
  }
);
ProjectSchema.belongsToMany(OrgSchema, {
  through: ProjectOrgSchema,
  foreignKey: "pId",
  as: "orgs",
});
OrgSchema.belongsToMany(ProjectSchema, {
  through: ProjectOrgSchema,
  foreignKey: "orgId",
  as: "projects",
});
