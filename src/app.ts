import express from "express";
import router from "./routes";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { checkConversationsController } from "./controllers";
import cron from "node-cron";

const app = express();
app.use(bodyParser.json());

dotenv.config();

app.use(express.json());

app.use(router);

cron.schedule(
  "0 21 * * *",
  async () => {
    console.log("Running chat check routine at 9pm...");
    await checkConversationsController();
  },
  {
    timezone: "America/Sao_Paulo"
  }
);

app.listen(3333, () => {
  console.log("Server running on http://localhost:3333");
});
