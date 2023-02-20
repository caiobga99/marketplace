import express from "express";
import cors from "cors";
const app: express.Application = express();
const port: number = 8080;

app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`HTTP Server running on http://localhost/${port}`);
});
