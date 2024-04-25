import express from 'express';
import cors from 'cors';
import mySqlPool from './config/db.js';
import chalk from 'chalk';
import morgan from 'morgan';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoutes.js';
import logsRouter from './routes/logsRouter.js';
import loginRouter from './routes/loginRoutes.js';

const app = express();
const port = 4000;

app.use(express.json());
app.use(morgan('dev'));


app.use(cors());

// app.use('/api1', requireAuth, studentRoutes);

// Register student routes
app.use('/api', studentRoutes);

app.use('/api', loginRouter);

// Mount the logsRouter to handle requests to the /logs endpoint
app.use('/logs', logsRouter);


mySqlPool.query('SELECT 1').then(() => {
  console.log(chalk.bgWhite.green('MYSQL DB Connected'));
  app.listen(port, () => {
    console.log(`Application is running on port 4000.`);
  });
}).catch((error) => {
  console.log(error);
})


app.get("/", async (req, res) => {
  try {
    const [rows, fields] = await mySqlPool.query("SELECT * FROM Persons");
    res.json({ persons: rows });
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

