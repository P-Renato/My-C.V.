import express from 'express';
import { upload } from '../middleware/upload.ts';
import { Router, Request, Response } from 'express';
import { loadUsers, saveUsers } from '../utils/dataStorage.ts';
import { User } from '../types/types.ts';
import bcrypt from 'bcrypt';


const usersRouter = Router();

const newUser = async (req: Request, res: Response, next: express.NextFunction) => {
  try {
    const user: User = req.body;

    if (!user || !user.userName) {
      return res.status(400).json({ message: 'Missing user data' });
    }

    const users = loadUsers(); // Load existing users from file

    const hashedPassword = await bcrypt.hash(user.password, 10); // Hash the password
    user.password = hashedPassword;
    users.push(user);          // Add the new one
    saveUsers(users);          // Save back to file

    res.cookie('session', user.email, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });

    res.status(201).json({ message: 'User added successfully', user });
  } catch (err) {
    next(err);
  }
};


usersRouter.post('/', newUser);

usersRouter.get('/', (req: Request, res: Response) => {
  const users = loadUsers();
  res.json(users);
});



export { usersRouter };