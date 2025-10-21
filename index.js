import express, { json, urlencoded, static as static_ } from "express";
import { connect } from "mongoose";
import postRoutes from "./routes/postRoutes.js";

connect("mongodb://127.0.0.1:27017/TP1-MongoSharding")
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch((err) => console.error("Erreur de connexion MongoDB :", err));

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

app.use("/", postRoutes);

app.use(static_("public"));

// async function seed() {
//   await User.create({
//     user_id: 1,
//     firstname: "Alice",
//     lastname: "Durand",
//     email: "alice@mail.com",
//   });
//   await Post.create({
//     post_id: 1,
//     message: "Mon premier post",
//     author: "Alice",
//   });
//
//   console.log("Données ajoutées !");
//   mongoose.disconnect();
// }
//
// seed();

app.listen(3000, () => {
  console.log("🚀 Serveur lancé sur http://localhost:3000");
});
