import { Request, Response } from 'express';
import { signToken } from '../services/jwt';

export const getToken = (req: Request, res: Response) => {
  const ip = req.clientIp as string;
  const token = signToken(ip);
  return res.json({ token });
};
