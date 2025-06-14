import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './config';

export function setToken(res: Response, email: string) {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // set to true in production
    sameSite: 'lax',
  });
}
