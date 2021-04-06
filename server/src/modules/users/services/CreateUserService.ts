import { getRepository } from "typeorm";
import AppError from "../../../shared/errors/AppError";
import CreateUserDTO from "../dtos/CreateUserDTO";
import User from "../typeorm/entities/User";

export default class CreateUserService {
  public async execute(data: CreateUserDTO): Promise<User> {
    const repository = getRepository(User);
    const count = await repository.count();

    if (count >= 1) {
      throw new AppError('You cannot create a new account', 401);
    }
    
    const { email } = data;
    const findUserByEmail = await repository.findOne({ where: { email } });
    if (findUserByEmail) {
      throw new AppError('User already created', 409);
    }

    const createUser = repository.create(data);
    await repository.save(createUser);

    delete createUser.password;
    return createUser;
  }
}