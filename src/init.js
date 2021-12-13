import "regenerator-runtime";
import "dotenv/config";
import "./db.js";
import "../src/models/Video.js";
import "../src/models/User.js";
import "../src/models/Comment.js";
import app from "./server.js";

const PORT = 4000;

const handleInSever = () => {
  return console.log(`✅당신은 ${PORT}포트 서버에 접속하셨습니다.`);
};

app.listen(PORT, handleInSever);