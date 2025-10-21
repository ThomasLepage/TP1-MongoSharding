import { Router } from "express";
const router = Router();
import Post from "../models/Post.js";
import User from "../models/User.js";

// === Route 1 : /index ===
// Affiche tous les messages et leurs réponses
router.get("/index", async (req, res) => {
  const posts = await find();
  res.json(posts);
});

// === Route 2 : /createMessage ===
// Crée un message (params: authorId, message)
router.post("/createMessage", async (req, res) => {
  const { authorId, message } = req.body;
  const user = await User.findOne({ user_id: authorId });
  if (!user) return res.status(404).send("Auteur introuvable");

  const post = await create({
    post_id: Date.now(), // identifiant unique simple
    author: user.firstname,
    message,
  });

  res.json(post);
});

// === Route 3 : /createAnswer ===
// Ajoute une réponse à un message existant
router.post("/createAnswer", async (req, res) => {
  const { authorId, messageId, answer } = req.body;
  const user = await User.findOne({ user_id: authorId });
  const post = await Post.findOne({ post_id: messageId });

  if (!post) return res.status(404).send("Message introuvable");

  post.answers.push({
    message: answer,
    author: user.firstname,
  });

  await post.save();
  res.json(post);
});

// === Route 4 (Bonus) : /listMessage ===
// Affiche les messages en HTML simple
// router.get("/listMessage", async (req, res) => {
//   const posts = await Post.find();
//   res.send(`
//     <html>
//       <head>
//         <title>Liste des messages</title>
//         <link rel="stylesheet" href="/css/styles.css">
//       </head>
//       <body>
//         <div class="container">
//           <h1>Liste des messages</h1>
//           ${posts.map(p => `
//             <div class="post">
//               <div class="post-author">${p.author}</div>
//               <div class="post-message">${p.message}</div>
//               <div class="post-answers">
//                 <em>Réponses:</em>
//                 <ul>
//                   ${p.answers.map(a => `
//                     <li class="answer"><span class="answer-author">${a.author}</span>: ${a.message}</li>
//                   `).join("")}
//                 </ul>
//               </div>
//             </div>
//           `).join("")}
//         </div>
//       </body>
//     </html>
//   `);
// });
// === Route 4 (Bonus) : /listMessage ===
router.get("/listMessage", async (req, res) => {
  const posts = await Post.find().sort({ post_id: -1 });
  res.send(`
    <html>
      <head>
        <title>Liste des messages</title>
        <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Liste des messages</h1>
            <a href="/" class="logout-button">Se déconnecter</a>
          </div>
          
          <!-- Formulaire pour créer un nouveau message -->
          <div class="new-post-form">
            <h2>Nouveau message</h2>
            <form id="newPostForm" class="form-flex">
              <input type="hidden" name="authorId" value="${req.query.userId || ""}">
              <div class="input-group">
                <textarea name="message" placeholder="Écrivez votre message..." required></textarea>
                <button type="submit">Publier</button>
              </div>
            </form>
          </div>

          <!-- Liste des messages -->
          ${posts
            .map(
              (p) => `
            <div class="post">
              <div class="post-author">${p.author}</div>
              <div class="post-message">${p.message}</div>
              <div class="post-answers">
                <em>Réponses:</em>
                <ul>
                  ${p.answers
                    .map(
                      (a) => `
                    <li class="answer"><span class="answer-author">${a.author}</span>: ${a.message}</li>
                  `,
                    )
                    .join("")}
                </ul>
                <!-- Formulaire pour répondre à ce message -->
                <form class="answer-form form-flex" data-post-id="${p.post_id}">
                  <input type="hidden" name="authorId" value="${req.query.userId || ""}">
                  <input type="hidden" name="messageId" value="${p.post_id}">
                  <div class="input-group">
                    <textarea name="answer" placeholder="Votre réponse..." required></textarea>
                    <button type="submit">Répondre</button>
                  </div>
                </form>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
        <script>
          // Gestion du formulaire pour un nouveau message
          document.getElementById("newPostForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const authorId = form.querySelector('input[name="authorId"]').value;
            const message = form.querySelector('textarea[name="message"]').value;

            try {
              const response = await fetch("/createMessage", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ authorId, message }),
              });
              if (response.ok) {
                form.reset(); // Vider le formulaire
                window.location.reload(); // Rafraîchir la page
              } else {
                alert("Erreur lors de la création du message");
              }
            } catch (error) {
              console.error("Erreur:", error);
              alert("Une erreur est survenue");
            }
          });

          // Gestion des formulaires de réponse
          document.querySelectorAll(".answer-form").forEach(form => {
            form.addEventListener("submit", async (e) => {
              e.preventDefault();
              const authorId = form.querySelector('input[name="authorId"]').value;
              const messageId = form.querySelector('input[name="messageId"]').value;
              const answer = form.querySelector('textarea[name="answer"]').value;

              try {
                const response = await fetch("/createAnswer", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ authorId, messageId, answer }),
                });
                if (response.ok) {
                  form.reset(); // Vider le formulaire
                  window.location.reload(); // Rafraîchir la page
                } else {
                  alert("Erreur lors de l'ajout de la réponse");
                }
              } catch (error) {
                console.error("Erreur:", error);
                alert("Une erreur est survenue");
              }
            });
          });
        </script>
      </body>
    </html>
  `);
});

// === Route GET : / ===
// Affiche la page de connexion
// router.get("/", (req, res) => {
//   res.send(`
//     <html>
//       <body>
//         <h1>Connexion</h1>
//         <form method="POST" action="/login">
//           <label>Email : <input type="email" name="email" required /></label><br><br>
//           <button type="submit">Se connecter</button>
//         </form>
//       </body>
//     </html>
//   `);
// });
router.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Connexion</title>
        <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
        <div class="login-container">
          <h1>Connexion</h1>
          <form id="loginForm" class="login-form">
            <label>Email</label>
            <input type="email" name="email" required />
            <button type="submit">Se connecter</button>
          </form>
        </div>
        <script>
          document.getElementById("loginForm").addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.querySelector('input[name="email"]').value;

            try {
              const response = await fetch("/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
              });

              if (response.redirected) {
                window.location.href = response.url;
              } else {
                const data = await response.text();
                document.body.innerHTML = data;
              }
            } catch (error) {
              console.error("Erreur:", error);
            }
          });
        </script>
      </body>
    </html>
  `);
});

// === Route POST : /login ===
// Vérifie l'email et redirige
// router.post("/login", async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.send(`
//       <html>
//         <head>
//           <title>Erreur</title>
//           <link rel="stylesheet" href="/css/styles.css">
//         </head>
//         <body>
//           <div class="error-container">
//             <h1>Erreur</h1>
//             <p>Email non trouvé.</p>
//             <a href="/">Retour</a>
//           </div>
//         </body>
//       </html>
//     `);
//   }

//   // Redirection vers la liste des messages
//   res.redirect("/listMessage");
// });
router.post("/login", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.send(`
      <html>
        <head>
          <title>Erreur</title>
          <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
          <div class="error-container">
            <h1>Erreur</h1>
            <p>Email non trouvé.</p>
            <a href="/">Retour</a>
          </div>
        </body>
      </html>
    `);
  }

  res.redirect(`/listMessage?userId=${user.user_id}`);
});

export default router;
