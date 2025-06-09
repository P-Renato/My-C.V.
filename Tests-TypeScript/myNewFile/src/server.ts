import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { usersRouter } from './routes/users.ts';
import { loadUsers } from './dataStorage.ts';
import authRouter from './routes/userAuth';
import jwt from 'jsonwebtoken';


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'Fla2x1Flu!'

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.get('/users', (req: Request, res: Response) => {
  const users = loadUsers();
  res.send(users);
});

app.post('/login', (req: Request, res: Response) => {
  const {email, password} = req.body
  const users = loadUsers();
  const user = users.find(user=> user.email === email);

  if(!user){
    return res.status(401).send('Invalid creadentials')
  } 
  if (user.password !== password) {
    return res.status(401).send('Invalid password')
  } 
  const token = jwt.sign({ email: user.email}, JWT_SECRET, {expiresIn: '1h'});

  res.cookie('token', token, {
    httpOnly: true,
    secure: false, // set to true in production with HTTPS
    sameSite: 'lax'
  });

  res.json({ message: 'Login successful', token });
})

app.get('/check-cookies', (req, res) => {
  console.log('Received cookies:', req.cookies);
  res.json(req.cookies);
});

app.listen(PORT, ()=>{ console.log('Server is running on PORT ', PORT)});