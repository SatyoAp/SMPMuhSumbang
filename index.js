import express from "express";
import db from "./config/database.js";
import router from "./routes/index.js";
import pendaftaranRouter from "./routes/Pendaftaran.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
// import Pendaftaran from "./model/pendaftaranModel.js";
import { startSequelize } from "./utils/startSequelize.js";
dotenv.config();
const app = express();
startSequelize(db);

try {
  await db.authenticate();
  console.log("Database terkoneksi");
  //   await Users.sync();
} catch (error) {
  console.error(error);
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
app.use(bodyParser.json());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(pendaftaranRouter);

app.listen(5000, () => console.log("Server running di port 5000"));
