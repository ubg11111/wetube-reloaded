import "dotenv/config";
import "./db";
import "../src/models/Video";
import "../src/models/User";
import "../src/models/Comment";
import app from "./server";

const PORT = 4000;

const handleInSever = () => {
  return console.log(`✅당신은 ${PORT}포트 서버에 접속하셨습니다.`);
};

app.listen(PORT, handleInSever);