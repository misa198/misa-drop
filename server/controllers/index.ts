import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../configs/app';

export const getToken = (req: Request, res: Response) => {
  const ip = req.clientIp;
  const token = jwt.sign({ ip }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  return res.json({ token });
};
