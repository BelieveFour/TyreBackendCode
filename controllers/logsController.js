import mySqlPool from "../config/db.js";
import express from 'express';

export const getLogs = async (req, res) => {
  try {
    const [rows] = await mySqlPool.query('SELECT * FROM logs');
    res.json({ logs: rows })
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};