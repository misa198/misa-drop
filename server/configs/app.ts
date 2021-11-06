export const PORT = process.env.PORT || 3000;
export const IS_DEV = process.env.NODE_ENV !== 'production';

export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';
