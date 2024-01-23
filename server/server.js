import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from 'bcrypt'
import { createClient } from '@supabase/supabase-js'


dotenv.config();

const app = express();
const router = express.Router()
const port = process.env.PORT || 3000;
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)



//  ------------------------------------------------------------ MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.static('./public'))



//  ------------------------------------------------------------ DB API ROUTES

app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabase
    .from('user')
    .select('*')
    
    if (error) {
      console.error(error);
      return res.status(500).send('Error fetching users');
    }
    
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});



app.use('/api', router)
router.post('/register', async (req,res) => {
  try {
    const {email, hashed_pw, role} = req.body
    const {data: existingUser, error} = await supabase
    .from('user')
    .select('*')
    .eq('email', email)

    if(error) {
      console.error(error)
      return res.status(500).json({error: 'Internal Server Error'})
    }

    if(existingUser && existingUser.length > 0) {
      return res.status(400).json({error: 'Email in use'})
    }

    const {data: newUser, registrationError} = await supabase
    .from('user')
    .insert([{email, hashed_pw, role}]);

    if (registrationError) {
      console.error(registrationError);
      return res.status(500).json({ error: 'Internal Server Error during registration' });
    }

    console.log(newUser);
    res.status(200).json({ success: 'Registration successful' });
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.listen(port, () => {
  console.log("Server Running on Port:", port);
});

