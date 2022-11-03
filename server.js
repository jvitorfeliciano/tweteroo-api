import express from "express";
import bodyParser from "body-parser"; // usado para pegar o objeto que vem do post;
import cors from "cors";

let userInfo = [];
let tweetsVector = [];

const app = express();
app.use(cors());
app.use(bodyParser.json()); // ativa o uso de bodyParser.json() no servidor;

app.post("/sign-up", (req, resp) => {
  userInfo.push(req.body);
  resp.send("Ok");
});

app.get("/tweets", (req, res) => {
  res.send(tweetsVector);
});

app.post("/tweets", (req, res) => {
  console.log(req.body);
  const postOwner = userInfo.find(
    (element) => element.username === req.body.username
  );
  const avatarOwner = postOwner.avatar;
  tweetsVector.push({ ...req.body, avatar: avatarOwner });
  res.send("Ok");
});

app.listen(5000);
