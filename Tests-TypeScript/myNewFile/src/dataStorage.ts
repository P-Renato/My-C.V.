import fs from 'fs';
import path from 'path';
import { User } from '../types';


const filePath = path.resolve(__dirname, '../users.json'); // __dirname works now ✅

export const loadUsers = (): User[] => {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, 'utf-8');
  console.log(data)
  return JSON.parse(data);
};

export const saveUsers = (users: User[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
};
