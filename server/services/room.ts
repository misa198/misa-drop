import { User } from '../../models/Room';
import { Room as RoomCollection } from './memDb';

export const findRoom = (ip: string) => {
  const room = RoomCollection.findOne({ ip });
  return room;
};

export const addUserToRoom = (ip: string, user: User) => {
  const foundRoom = findRoom(ip);
  if (foundRoom) {
    foundRoom.users.push(user);
    RoomCollection.update(foundRoom);
  } else {
    const newRoom = {
      ip,
      users: [user],
    };
    RoomCollection.insert(newRoom);
  }
};

export const removeUserFromRoom = (ip: string, id: string) => {
  const foundRoom = findRoom(ip);
  if (!foundRoom) {
    throw new Error('Room not found');
  }

  if (foundRoom.users.length === 1) {
    RoomCollection.remove(foundRoom);
  } else {
    foundRoom.users = foundRoom.users.filter((user) => user.id !== id);
    RoomCollection.update(foundRoom);
  }
};
