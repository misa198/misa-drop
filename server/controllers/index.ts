import { Request, Response } from 'express';
import { signToken } from '../services/jwt';

export const getToken = (req: Request, res: Response) => {
  const ip = req.clientIp as string;
  const pip =
    (req.headers && req.headers['x-forwarded-for']) ||
    req.ip ||
    (req.connection && req.connection.remoteAddress);
  console.log(pip);
  console.log(ip);
  const token = signToken(ip);
  return res.json({ token });
};
