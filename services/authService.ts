// src/services/authService.ts
import { User } from "../types";

const USERS_KEY = "foundit_users";
const CURRENT_USER_KEY = "foundit_current_user";

export const getUsers = (): User[] => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveUsers = (users: User[]) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  try {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || "null");
  } catch {
    return null;
  }
};

export const login = (username: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password) || null;
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }
  return user;
};

export const signup = (username: string, password: string): User => {
  const users = getUsers();
  if (users.some((u) => u.username === username)) {
    throw new Error("Username already exists");
  }
  const newUser: User = {
    id: Date.now().toString(),
    username,
    password,
  };
  users.push(newUser);
  saveUsers(users);
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return newUser;
};

export const logout = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};
