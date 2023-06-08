import express, { Request, Response } from "express";
import cors from "cors";
import "express-async-errors";
import { handleErrorMiddleware } from "./errors";
import { appRoutes } from "./routes";

export const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message:
      "Bem-vindo(a) ao Gerenciador de Estoque. Esta aplicação foi criada por Matheus Henrique Vieira Cardoso.",
  });
});

appRoutes(app);

app.use(handleErrorMiddleware);
