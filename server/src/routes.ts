import express, { Request, Response, Router } from "express";
import { sequelize } from "./models/db";
import { QueryTypes } from "sequelize";
export const appRoutes = express.Router();

const routes = Router();

interface User {
  name: String;
  email: String;
  password: String;
}
interface Users extends Array<User> {}

routes.get("/users", async (req: Request, res: Response) => {
  const users: Users = await sequelize.query("SELECT * FROM `users`", {
    type: QueryTypes.SELECT,
  });
  res.send(users);
});

routes.post("/register", async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;

  const isValid = await sequelize.query(
    `SELECT email FROM users WHERE email = "${email}"`,
    {
      type: QueryTypes.SELECT,
    }
  );

  isValid.length > 0
    ? res.send("User already exists.")
    : sequelize
        .query(
          `INSERT INTO users (nome, email, senha) VALUES (
        "${name}", "${email}", "${password}"
      )`,
          {
            type: QueryTypes.INSERT,
          }
        )
        .then(() => {
          res.send("Sucessfully registered user.");
        })
        .catch((error) => {
          console.log("Error :", error);
        });
});



appRoutes.use(routes);
