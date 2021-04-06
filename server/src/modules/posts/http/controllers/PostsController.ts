import { Request, Response } from "express";
import ListAllPostsService from "../../services/ListAllPostsService";

export default class PostsController {
  async read(req: Request, res: Response) {
    const listAllPostsService = new ListAllPostsService();
    const listAllPosts = await listAllPostsService.execute();

    return res.json(listAllPosts);
  }
}