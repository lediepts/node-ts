import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import database from "../database";
import { PermissionAssignment } from "../interfaces";
import { OrgSchema } from "./Org";
import { PermissionSchema } from "./Permission";

export interface PermissionAssignmentModel
  extends PermissionAssignment,
    Model<
      InferAttributes<PermissionAssignmentModel>,
      InferCreationAttributes<PermissionAssignmentModel>
    > {
  id: CreationOptional<number>;
}

export const PermissionAssignmentSchema =
  database.define<PermissionAssignmentModel>(
    "permissionAssignments",
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      perId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      orgId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      orgCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      withMembers: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      engine: "InnoDB",
      charset: "utf8mb4",
      timestamps: false,
    }
  );
PermissionAssignmentSchema.belongsTo(PermissionSchema, {
  foreignKey: "perId",
  as: "userPermission",
});
PermissionSchema.belongsToMany(OrgSchema, {
  through: PermissionAssignmentSchema,
  foreignKey: "perId",
  as: "orgs",
});
OrgSchema.belongsToMany(PermissionSchema, {
  through: PermissionAssignmentSchema,
  foreignKey: "orgId",
  as: "permissions",
});
