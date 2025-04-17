export interface User {
  id: number;
  email: string;
  password: string;
}

export interface Document {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
