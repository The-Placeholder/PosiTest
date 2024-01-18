import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pg from 'pg';

dotenv.config();

const { Pool } = pg;
const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

//  ------------------------------------------------------------ MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.static('./public'))

//  ------------------------------------------------------------ DB API ROUTES


/* Example route to query the database */
app.get('/instructor/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM user WHERE id = $1 OR assigned_to = $1', [id]);
      const instructor = result.rows[0]; // Assuming you expect one instructor with the provided ID
      client.release();
      res.json(instructor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error fetching instructor');
    }
  });
  

app.listen(port, () => {
  console.log("Server Running on Port:", port);
});