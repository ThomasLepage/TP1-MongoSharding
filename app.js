import express from "express";
import router from "./routes/index.js";
import { connect } from "mongoose";

connect("mongodb://127.0.0.1:27017/TP1-MongoSharding")
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion MongoDB :", err));

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views/templates");
app.use(express.json());
app.use("/css", express.static("./views/css"));
app.use("/", router);

app.listen(3000, () => console.log("Server running on port 3000"));