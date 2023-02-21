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

interface ExistingUsers {
  email: string;
}

interface Users extends Array<User> {}
interface ExistingUser extends Array<ExistingUsers> {}

routes.get("/users", async (req: Request, res: Response) => {
  const users: Users = await sequelize.query("SELECT * FROM `users`", {
    type: QueryTypes.SELECT,
  });
  res.send(users);
});

routes.post("/user/signUp", async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;

  const isValid: ExistingUser = await sequelize.query(
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
          console.log("Error in register user:", error);
        });
});

routes.post("/user/signIn", async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;

  const isValid: ExistingUser = await sequelize.query(
    `SELECT email FROM users WHERE email = "${email}"`,
    {
      type: QueryTypes.SELECT,
    }
  );
  if (isValid.length > 0) {
    const query: Users = await sequelize.query(
      `SELECT email, senha, nome FROM users WHERE email = "${email}" AND senha = "${password}" AND nome = "${name}"`,
      {
        type: QueryTypes.SELECT,
      }
    );
    query.length > 0
      ? res.send("sucessful login.")
      : res.send("Error logging in, check your details and try again.");
  } else {
    res.send("Email not registred.");
  }
});

routes.delete("/user/:id/delete", (req: Request, res: Response): void => {
  const { id } = req.params;
  sequelize
    .query(`DELETE FROM users WHERE id = "${id}"`, {
      type: QueryTypes.DELETE,
    })
    .then(() => {
      res.send("User deleted sucessfully");
    })
    .catch((error) => {
      console.log("Error in delete user: ", error);
    });
});

appRoutes.use(routes);
