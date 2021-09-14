// package.json // dependencies 가솔린 // devDependencies 음악과같은 용도
// babel을 활용함으로써 Node.js 와 Js 중간에서 코드를 변환시켜줌 (문법최신화)
// nodemon을 설치함으로써 npm run dev를 터미널에서 중복실행하지않아도 코드입력시 알아서 재작동함
// 경로 ./ 의미는 현재폴더경로를 의미
// 경로 ../ 의미는 현재폴더를 벗어나 다른폴더이동을 의미
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";


const app = express();
const logger = morgan("dev");


app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extends: true}));
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app;

