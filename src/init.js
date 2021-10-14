import "dotenv/config";
import "../src/models/Video";
import "./db";
import "../src/models/User";
import app from "./server";

const PORT = 4000;

const handleInSever = () => {
  return console.log(`✅당신은 ${PORT}포트 서버에 접속하셨습니다.`);
};

app.listen(PORT, handleInSever);