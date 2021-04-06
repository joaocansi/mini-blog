import { Request, Response } from "express";
import AppError from "../../../../shared/errors/AppError";
import CreateUserService from "../../services/CreateUserService";

export default class UsersController {
  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new AppError('Insufficient data', 404);
    }

    const createUserService = new CreateUserService();
    const createUser = await createUserService.execute({
      name, email, password
    });

    return res.json(createUser);
  }
}