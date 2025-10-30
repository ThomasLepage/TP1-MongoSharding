import express, { Application } from "express";
import router from "./routes/index.js";
import { connect } from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";

connect("mongodb://127.0.0.1:27017/TP1-MongoSharding")
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err: Error) => console.error("Erreur de connexion MongoDB :", err));

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", "./views/templates");
app.use(express.json());
app.use(
  session({
    secret: "un_secret_pour_la_demo",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/TP1-MongoSharding",
      collectionName: "sessions",
    }),
    cookie: { maxAge: 60 * 60 * 1000 }, // 1h
  })
);
app.use("/css", express.static("./views/css"));
app.use("/", router);

const PORT: number = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
