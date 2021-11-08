import Datastore from 'lokijs';
import { Room as RoomModel } from '../../models/Room';

export const db = new Datastore('data.db');
export const Room = db.addCollection<RoomModel>('room');
