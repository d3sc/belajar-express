import express from "express";
// config env
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;

import bodyParser from "body-parser";
import router from "./routes/route.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", router);

app.listen(PORT, () => {
  console.log("server berjalan di http://localhost:" + PORT);
});
