import redis from 'redis';
import { promisify } from 'util';

export const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT ?? '6379', 10),
});

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);

export const getObject = async (key: string): Promise<any> => {
  const value = await get(key);
  return JSON.parse(value ?? '{}');
};

export const getString = async (key: string): Promise<string> => {
  const value = await get(key);
  return value ?? '';
};

export const setObject = async (key: string, value: any): Promise<void> => {
  await set(key, JSON.stringify(value));
};

export const setString = async (key: string, value: string): Promise<void> => {
  await set(key, value);
};

export const deleteItem = async (key: string) => {
  client.del(key);
};
