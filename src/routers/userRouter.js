import express from "express";
import { removeAllListeners } from "nodemon";
import {getEdit, postEdit, logout, see , startGithubLogin, finishGithubLogin} from "../controllers/userControllers"
import { protectorMiddleware, publicOnlyMideelware } from "../middlewares";
const userRouter = express.Router();

userRouter.get("/logout",protectorMiddleware, logout);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
// all 사용하면 어떤 http method를 사용하든 미들웨어를 사용하겠다는 의미 //

userRouter.get("/github/start", publicOnlyMideelware,startGithubLogin);
userRouter.get("/github/finish", publicOnlyMideelware,finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;  