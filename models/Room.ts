export interface User {
  id: string;
  name: string;
  color: string;
}

export interface Room {
  ip: string;
  users: User[];
}
