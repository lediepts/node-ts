import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();

const database = new Sequelize("sqlite::memory:", {
  logging: false,
  storage: "db/database.sqlite",
  define: {
    freezeTableName: true,
  },
});

export default database;
