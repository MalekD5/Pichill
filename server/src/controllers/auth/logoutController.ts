import { Request, Response } from 'express';
import { jwtClearCookieOptions } from '../../utils/JWTUtils';
import userModel from '../../models/userModel';

export const logoutController = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.jwt;

  const user = await userModel.findOne({ refreshToken }).exec();
  if (!user) {
    res.clearCookie('jwt', jwtClearCookieOptions);
    return res.sendStatus(204);
  }

  // clear refreshToken from database
  user.refreshToken = '';
  await user.save();

  // clear cookie that contains the refresh Token
  res.clearCookie('jwt', jwtClearCookieOptions);
  return res.sendStatus(204);
};
