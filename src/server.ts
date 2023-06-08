import { app } from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";
import { initStaff } from "./config/initStaff";

const init = async () => {
  const SERVER_PORT = process.env.SERVER_PORT || 3001;

  await AppDataSource.initialize()
    .then((_) =>
      console.log(
        "Banco de dados conectado. Portas: container => 5432, local => 5050"
      )
    )
    .catch((err: any) =>
      console.log("Erro durante a conexão com o banco de dados: ", err)
    );

  app.listen(SERVER_PORT, () => {
    console.log(`Servidor iniciado na porta: ${SERVER_PORT}`);
    initStaff();
  });
};

init();
