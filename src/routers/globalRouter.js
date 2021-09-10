import express from "express";
import {join, login} from "../controllers/userControllers";
import {home, search } from "../controllers/videoControllers";

const golbalRouter = express.Router();

golbalRouter.get("/", home);
golbalRouter.get("/join", join);
golbalRouter.get("/login", login);

export default golbalRouter;

