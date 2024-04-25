import mysql from 'mysql2/promise';

const mySqlPool = mysql.createPool({
  host: 'localhost',
  user: "root",
  password: "password@1234",
  database: "demo"
});

export default mySqlPool;
