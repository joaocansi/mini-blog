import { getRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import CreatePostDTO from "../dtos/CreatePostDTO";
import Post from "../typeorm/entities/Post";

export default class CreatePostService {
  public async execute(data: CreatePostDTO): Promise<Post> {
    const { title } = data;
    const repository = getRepository(Post);

    const findPostByTitle = await repository.findOne({ where: { title } });
    if (findPostByTitle) {
      throw new AppError("There's a post using this title", 409);
    }

    const createPost = repository.create(data);
    await repository.save(createPost);

    return createPost;
  }
}