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
[];

routes.get("/users", async (req: Request, res: Response) => {
  const users = await sequelize.query("SELECT * FROM `users`", {
    type: QueryTypes.SELECT,
  });
  res.send(users);
});

routes.post("/register", (req: Request, res: Response) => {
  sequelize.query(
    `INSERT INTO users (nome, email, senha) VALUES (
      "${req.body.nome}", "${req.body.email}", "${req.body.senha}"
    )`,
    {
      type: QueryTypes.INSERT,
    }
  );
  res.send(req.body);
});

routes.get("/test3", (req: Request, res: Response) => {
  res.send("teste3!");
});

appRoutes.use(routes);
