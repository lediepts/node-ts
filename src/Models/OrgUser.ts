import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { OrgUser, UserOrgType } from "../interfaces";
import { OrgSchema } from "./Org";
import { UserSchema } from "./User";

export interface OrgUserModel
  extends OrgUser,
    Model<
      InferAttributes<OrgUserModel>,
      InferCreationAttributes<OrgUserModel>
    > {
  id: CreationOptional<number>;
  type: CreationOptional<UserOrgType>;
}

export const OrgUserSchema = database.define<OrgUserModel>(
  "zoomTypes",
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
    orgId: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["admin", "member", "assistant"],
      defaultValue: "member",
    },
  },
  {
    engine: "InnoDB",
    charset: "utf8mb4",
    timestamps: false,
  }
);
UserSchema.belongsToMany(OrgSchema, {
  through: OrgUserSchema,
  foreignKey: "uId",
  as: "orgs",
});
OrgSchema.belongsToMany(UserSchema, {
  through: OrgUserSchema,
  foreignKey: "orgId",
  as: "members",
});
