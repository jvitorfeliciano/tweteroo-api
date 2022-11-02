import express from "express";
import bodyParser from "body-parser" // usado para pegar o objeto que vem do post;
import cors from "cors"

let userInfo;

const app =express();
app.use(cors())
app.use(bodyParser.json()) // ativa o uso de bodyParser.json() no servidor;
app.post("/sign-up",(req,resp)=>{
    console.log(req.body)
  resp.send('Ok')
})

app.listen(5000);