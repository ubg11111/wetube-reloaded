import exrpess from "express";
import { registerview, createComment, deleteComment } from "../controllers/videoControllers.js";


const apiRouter = exrpess.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerview);
apiRouter.post("/videos/:id([0-9a-f]{24})/comment", createComment);
apiRouter.delete(
  "/videos/:videoId([0-9a-f]{24})/comment/:commentId([0-9a-f]{24})",
  deleteComment
);

export default apiRouter;


