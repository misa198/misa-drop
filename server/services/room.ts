import { Room, User } from '../../models/Room';
import { db } from './nedb';

export const insertRoom = (room: Room) => {
  return new Promise((resolve, reject) => {
    db.insert(room, (err, newRoom) => {
      if (err) {
        reject(err);
      } else {
        resolve(newRoom);
      }
    });
  });
};

export const findRoom = (ip: string) => {
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

export const addUserToRoom = (ip: string, user: User) => {
  return new Promise((resolve, reject) => {
    db.update({ ip }, { $push: { users: user } }, {}, (err, numReplaced) => {
      if (err) {
        reject(err);
      } else {
        resolve(numReplaced);
      }
    });
  });
};

export const removeUserFromRoom = async (ip: string, user: User) => {
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
    db.update({ ip }, { $pull: { users: user } }, {}, (err, numReplaced) => {
      if (err) {
        reject(err);
      } else {
        resolve(numReplaced);
      }
    });
  });
};
