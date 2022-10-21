import { Request, Response } from 'express';
import userModel from '../../models/userModel';
import bcrypt from 'bcrypt';

export const registerController = async (req: Request, res: Response) => {
  const { email, password: pwd, username } = req.body;

  const dupe = await userModel
    .findOne({ $or: [{ username }, { email }] })
    .exec();

  if (dupe) return res.sendStatus(409);

  try {
    const password = await bcrypt.hash(pwd, 10);
    await userModel.create({
      username,
      password,
      email,
    });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
