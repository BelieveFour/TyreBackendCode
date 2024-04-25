import express from 'express';
import { createStudent, deleteStudent, getAllStudents, getChartsData, getToken, updateStudent } from '../controllers/studentController.js';

const router = express.Router();

// Route to create a new student
router.post('/students', createStudent);

// Route to get all students
router.get('/students', getAllStudents);

//Route to get token
router.get('/token', getToken);

// Route to delete a student by ID
router.delete('/students/:id', deleteStudent);

// Route to update a student by ID
router.put('/students/:id', updateStudent);

//Route to get title description for charts
router.get('/charts', getChartsData);



export default router;
