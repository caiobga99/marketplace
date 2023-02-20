import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
export const sequelize = new Sequelize(
  process.env.DB_DATABASE as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established sucessfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });
