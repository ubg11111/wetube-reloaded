import express from "express";
import {getjoin, postjoin, getLogin, postLogin} from "../controllers/userControllers";
import {home, search } from "../controllers/videoControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getjoin).post(postjoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);


export default rootRouter;

