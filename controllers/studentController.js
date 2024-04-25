import mySqlPool from '../config/db.js';
import { logError } from '../utils/logger.js';
import jwt from 'jsonwebtoken';

const secret = 'KIRAN';

// Controller function to create a new student
export const createStudent = async (req, res) => {
  const { name, age, grade } = req.body;

  try {
    const [result] = await mySqlPool.query('INSERT INTO students (name, age, grade) VALUES (?, ?, ?)', [name, age, grade]);
    res.status(201).json({ message: "Student added successfully!" });
  } catch (error) {
    // Log the error


    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to get all students
export const getAllStudents = async (req, res) => {
  try {
    const [rows] = await mySqlPool.query('SELECT * FROM students');
    res.json({ students: rows });

  } catch (error) {
    await logError('Error fetching students: ' + error.message);
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to delete a student by ID
export const deleteStudent = async (req, res) => {
  const { id } = req.params; // Extract student ID from request parameters

  try {
    const [result] = await mySqlPool.query('DELETE FROM students WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      // If no rows were affected (student not found), return 404 Not Found
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(204).send(); // Return 204 No Content if deletion is successful
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller function to update a student by ID
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, grade } = req.body;

  try {
    const [result] = await mySqlPool.query('UPDATE students SET name=?, age=?, grade=? WHERE id=?', [name, age, grade, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//get token

// Controller function to get all students
export const getToken = async (req, res) => {
  try {
    const data = jwt.sign({
      _id: 4,
      email: "Kiran@gmail.com"
    }, secret);
    res.json({ token: data });

  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


//get charts data for title 

export const getChartsData = async (req, res) => {
  try {
    const [rows] = await mySqlPool.query('SELECT * FROM chart');
    res.json({ charts: rows });

  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
