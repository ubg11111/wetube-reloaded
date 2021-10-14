import express from "express";
import { watch, getUpload, getEdit, postEdit, postUpload, deleteVideo } from "../controllers/videoControllers";
import { protectorMiddleware } from "../middlewares";

const videoRouter = express.Router();


videoRouter.route("/:id([0-9a-f]{24})").get(watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").all(protectorMiddleware).get(deleteVideo)
videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(postUpload);

export default videoRouter;