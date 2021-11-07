import { Room, User } from '../../models/Room';
import { db } from './nedb';

export const findRoom = (ip: string): Promise<Room> => {
  return new Promise((resolve, reject) => {
    db.findOne({ ip }, (err, room) => {
      if (err) {
        reject(err);
      } else {
        resolve(room);
      }
    });
  });
};

export const addUserToRoom = async (ip: string, user: User) => {
  const foundRoom = await findRoom(ip);
  if (foundRoom) {
    return new Promise((resolve, reject) => {
      db.update({ ip }, { $push: { users: user } }, {}, (err, numReplaced) => {
        if (err) {
          reject(err);
        } else {
          resolve(numReplaced);
        }
      });
    });
  } else {
    return new Promise((resolve, reject) => {
      db.insert({ ip, users: [user] }, (err, newRoom) => {
        if (err) {
          reject(err);
        } else {
          resolve(newRoom);
        }
      });
    });
  }
};

export const removeUserFromRoom = async (ip: string, id: string) => {
  const foundRoom = await findRoom(ip);
  if (!foundRoom) {
    throw new Error('Room not found');
  }
  const room = foundRoom as Room;

  if (room.users.length === 1) {
    return new Promise((resolve, reject) => {
      db.remove({ ip }, {}, (err, numRemoved) => {
        if (err) {
          reject(err);
        } else {
          resolve(numRemoved);
        }
      });
    });
  }

  return new Promise((resolve, reject) => {
    db.update({ ip }, { $pull: { users: { id } } }, {}, (err, numReplaced) => {
      if (err) {
        reject(err);
      } else {
        resolve(numReplaced);
      }
    });
  });
};
