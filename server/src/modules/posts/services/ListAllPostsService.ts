import { getRepository } from "typeorm";
import Post from "../typeorm/entities/Post";

export default class ListAllPostsService {
  public async execute(): Promise<Post[]> {
    const repository = getRepository(Post);
    const findAll = repository.find();

    return findAll;
  }
}