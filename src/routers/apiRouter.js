import exrpess from "express";
import { registerview } from "../controllers/videoControllers";

const apiRouter = exrpess.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerview)

export default apiRouter;


