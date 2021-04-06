import { Request, Response } from "express";
import AppError from "../../../../shared/errors/AppError";
import CreatePostService from "../../services/CreatePostService";
import DeletePostService from "../../services/DeletePostService";
import ShowPostService from "../../services/ShowPostService";

export default class PostController {
  async create(req: Request, res: Response) {
    const { title, description, content } = req.body;
    if (!title || !description || !content) {
      throw new AppError('Insufficient data', 404);
    }

    const createPostService = new CreatePostService();
    const createPost = await createPostService.execute({ title, description, content });

    return res.json(createPost);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      throw new AppError('Insufficient data', 404);
    }

    const deletePostService = new DeletePostService();
    await deletePostService.execute(id);

    return res.json();
  }
  
  async read(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) {
      throw new AppError('Insufficient data', 404);
    }

    const showPostService = new ShowPostService();
    const showPost = await showPostService.execute(id);

    return res.json(showPost);
  }
}