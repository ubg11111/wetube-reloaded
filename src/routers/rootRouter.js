import express from "express";
import {getjoin, postjoin, getLogin, postLogin} from "../controllers/userControllers";
import {home, search } from "../controllers/videoControllers";
import { publicOnlyMideelware } from "../middlewares";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(publicOnlyMideelware).get(getjoin).post(postjoin);
rootRouter.route("/login").all(publicOnlyMideelware).get(getLogin).post(postLogin);
rootRouter.get("/search", search);


export default rootRouter;

