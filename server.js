import express from "express";
import cors from "cors";

let userInfo = []; // essas infos só são perdidas se o server  for desligado;
let tweetsVector = [];

const app = express();
app.use(cors());
app.use(express.json()); // ativa o uso de json() no servidor;

app.post("/sign-up", (req, resp) => {
  const { username, avatar } = req.body;
  if (!username || !avatar) {
    resp.status(400).send("Todos os campos são obrigatórios");
    return;
  }
  const isTherethisName = userInfo.some(
    (element) => (element.username === username)
  );

  if (isTherethisName) {
    resp.status(409).send("Usuário já cadastrado");
    return;
  }

  userInfo.push(req.body);
  resp.status(201).send("Ok");
});

app.get("/tweets", (req, res) => {
  const auxTweetsVector = [];
  for (let i = 0; i < 10; i++) {
    if (tweetsVector[i] !== undefined) {
      // fazendo o match de avatar
      const postOwner = userInfo.find(
        (element) => element.username === tweetsVector[i].username
      );
      const formattedTweet = {
        username: tweetsVector[i].username,
        avatar: postOwner.avatar,
        tweet: tweetsVector[i].tweet,
      };

      auxTweetsVector.push(formattedTweet);
    }
  }
  res.send(auxTweetsVector);
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;

  if (!username || !tweet) {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  tweetsVector.unshift(req.body);
  res.status(201).send("Ok");
});

app.listen(5000);
