import { getRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import Post from "../typeorm/entities/Post";

export default class DeletePostService {
  public async execute(id: string): Promise<void> {
    const repository = getRepository(Post);

    const findPostById = await repository.findOne({ where: { id } });
    if (!findPostById) {
      throw new AppError("No post found.", 404);
    }

    await repository.delete({ id });
    return;
  }
}