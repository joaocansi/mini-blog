import { Router } from "express";
import ensureAuthenticated from "../../users/http/middleware/ensureAuthenticated";
import PostController from "./controllers/PostController";
import PostsController from "./controllers/PostsController";

const postController = new PostController();
const postsController = new PostsController();

const postsRouter = Router();

postsRouter.get('/:id', postController.read);
postsRouter.get('/', postsController.read);

postsRouter.use(ensureAuthenticated);

postsRouter.post('/', postController.create);
postsRouter.delete('/:id', postController.delete);

export default postsRouter;