import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/Video";
import "./models/User";
import "./models/Comment";
import app from "./server";

const PORT = process.env.PORT || 3000;

const handleInSever = () => {
  return console.log(`✅당신은 ${PORT}포트 서버에 접속하셨습니다.`);
};

app.listen(PORT, handleInSever);
