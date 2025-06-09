import { Router, Request, Response } from 'express';
import { loadUsers, saveUsers } from '../dataStorage.ts';
import { User } from '../../types.ts';



const usersRouter = Router();

const newUser = (req: Request, res: Response) => {
  const user: User = req.body;

  const users = loadUsers(); // Load existing users from file
  users.push(user);          // Add the new one
  saveUsers(users);          // Save back to file

  res.cookie('session', user.email, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });

  res.status(201).json({ message: 'User added successfully', user });
};


usersRouter.post('/', newUser);

usersRouter.get('/', (req: Request, res: Response) => {
  const users = loadUsers();
  res.json(users);
});



export { usersRouter };