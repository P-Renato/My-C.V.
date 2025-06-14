import express,  { Request, Response }  from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { usersRouter } from './routes/users.ts';
import { loadUsers } from './utils/dataStorage.ts';
import { setToken } from './utils/setToken.ts';
import { userLogin } from './routes/login.ts';
import bcrypt from 'bcrypt';


const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

const PORT = process.env.PORT || 3000;


app.use('/users', usersRouter);

app.get('/users', (req: Request, res: Response) => {
  const users = loadUsers();
  res.send(users);
});

app.post('/login', userLogin);

app.get('/check-cookies', (req, res) => {
  console.log('Received cookies:', req.cookies);
  res.json(req.cookies);
});

app.listen(PORT, ()=>{ console.log('Server is running on PORT ', PORT)});