import exrpess from "express";
import { registerview, createComment } from "../controllers/videoControllers";

const apiRouter = exrpess.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerview)
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment)

export default apiRouter;


