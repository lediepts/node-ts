import * as dotenv from "dotenv";
import database from "./database";

import server from "./server";
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);

database
  .sync()
  .then(async () => {
    console.log(`Database is connected`);
    server.start(PORT || 8888);
  })
  .catch((err) => {
    console.log(`Connect DB with Error ${err.message}`);
  });
