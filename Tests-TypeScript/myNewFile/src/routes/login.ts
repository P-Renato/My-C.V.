import express,  { Request, Response }  from 'express';
import { usersRouter } from '../routes/users';
import { loadUsers } from '../utils/dataStorage';
import { setToken } from '../utils/setToken';
import bcrypt from 'bcrypt';

const app = express();

app.use('/users', usersRouter);

export const userLogin = async (req: Request, res: Response) => {
  const {userName, password} = req.body
  const users = loadUsers();
  console.log(users)
  const user = users.find(user=> user.userName === userName);

    console.log('Attempting login for:', userName);



  if(!user){
    console.log('User not found')
    return res.status(401).send('Invalid creadentials')
  } 

const isPasswordCorrect = await bcrypt.compare(password, user.password);
if (!isPasswordCorrect) {
  return res.status(401).send('Invalid password');
}

  setToken(res, user.email);

  res.status(200).json({ success: true, message: 'Login successful' });

}; 