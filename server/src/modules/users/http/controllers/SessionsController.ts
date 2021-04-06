import { Request, Response } from "express";
import AppError from "../../../../shared/errors/AppError";
import AuthenticateUserService from "../../services/AuthenticateUserService";

export default class SessionsController {
  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new AppError('Insufficient data', 404);
    }

    const authenticateUserService = new AuthenticateUserService();
    const authenticateUser = await authenticateUserService.execute({
      email, password
    });

    return res
          .cookie('user_info', authenticateUser.user_info, { httpOnly: true, maxAge: 1000 * 60 * Number(process.env.EXPIRES_IN) })
          .cookie('user_token', authenticateUser.user_token, { httpOnly: true, maxAge: 1000 * 60 * Number(process.env.EXPIRES_IN) })
          .json(authenticateUser);
  }

  async delete(req: Request, res: Response) {
    return res.clearCookie('user_info').clearCookie('user_token').json();
  }
}