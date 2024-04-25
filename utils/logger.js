import mySqlPool from '../config/db.js';

export const logError = async (message) => {
  try {
    await mySqlPool.query('INSERT INTO logs (timestamp, level, message) VALUES (NOW(), ?, ?)', ['error', message]);
  } catch (error) {
    console.error('Error logging to database:', error);
  }
};

