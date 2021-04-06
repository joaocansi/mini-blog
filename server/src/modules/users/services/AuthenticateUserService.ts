import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getRepository } from "typeorm";

import AppError from "../../../shared/errors/AppError";
import AuthenticateUserDTO from "../dtos/AuthenticateUserDTO";
import User from "../typeorm/entities/User";

interface IResponse {
  user_token: string;
  user_info: User;
}

export default class AuthenticateUserService {
  public async execute(data: AuthenticateUserDTO): Promise<IResponse> {
    const repository = getRepository(User);
    const { email, password } = data;

    const findUserByEmail = await repository.findOne({ where: { email } });
    if (!findUserByEmail) {
      throw new AppError('E-mail or password is incorrect', 401);
    }

    const comparePassword = await compare(password, findUserByEmail.password);
    if (!comparePassword) {
      throw new AppError('E-mail or password is incorrect', 401);
    }

    const generateAccessToken = sign({}, process.env.SECRET_KEY, { 
      subject: findUserByEmail.id,
      expiresIn: `${process.env.EXPIRES_IN}m`
    });
    delete findUserByEmail.password;
    
    return {
      user_token: generateAccessToken,
      user_info: findUserByEmail
    }
  }
}