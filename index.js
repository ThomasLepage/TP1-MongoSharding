const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const User = require("./models/User");

mongoose.connect("mongodb://127.0.0.1:27017/TP1-MongoSharding")
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("Erreur de connexion MongoDB :", err));

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postRoutes = require("./routes/postRoutes");
app.use("/", postRoutes);

app.use(express.static("public"));

// async function seed() {
//   await User.create({ user_id: 1, firstname: "Alice", lastname: "Durand", email: "alice@mail.com" });
//   await Post.create({ post_id: 1, message: "Mon premier post", author: "Alice" });

//   console.log("Données ajoutées !");
//   mongoose.disconnect();
// }

// seed()



app.listen(3000, () => {
  console.log("🚀 Serveur lancé sur http://localhost:3000");
});
