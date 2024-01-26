import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//  ------------------------------------------------------------ MIDDLEWARE

app.use(cors());
app.use(express.json());
app.use(express.static('./public'));

//  ------------------------------------------------------------ DB API ROUTES

app.get('/api/users', async (req, res) => {
  try {
    const { data, error } = await supabase.from('user').select('*');

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
// GET 1 ROUTE
app.get('/api/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error(error);
      return res.status(500).send('Error fetching user');
    }

    if (!data) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching user');
  }
});

app.use('/api', router);
// POST ROUTE
router.post('/register', async (req, res) => {
  try {
    const { email, hashed_pw, role, username } = req.body;

    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(hashed_pw, saltRounds);

    const { data: existingUser, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email);

    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (existingUser && existingUser.length > 0) {
      return res.status(400).json({ error: 'Email in use' });
    }

    const { data: newUser, registrationError } = await supabase
      .from('user')
      .insert([{ email, hashed_pw: hashed_password, role, username }]);

    if (registrationError) {
      console.error(registrationError);
      return res
        .status(500)
        .json({ error: 'Internal Server Error during registration' });
    }

    console.log(newUser);
    res.status(200).json({ success: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Fetch user by username
    const { data: user, error: fetchError } = await supabase
      .from('user')
      .select('id, username, hashed_pw')
      .eq('username', username)
      .single();

    if (fetchError) {
      console.error(fetchError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log(typeof password);
    console.log(typeof user.hashed_pw);
    console.log('Original Password:', password);
    console.log('Stored Hash:', user.hashed_pw);

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.hashed_pw);

    console.log('Result of bcrypt.compare:', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res
      .status(200)
      .json({ success: 'Login successful', user: { id: user.id, username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Patch Route
router.patch('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, hashed_pw, role, username } = req.body;

    const { data: existingUser, error: fetchError } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error(fetchError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user with the new data
    const { data: updatedUser, error: updateError } = await supabase
      .from('user')
      .update({ email, hashed_pw, role, username })
      .eq('id', userId);

    if (updateError) {
      console.error(updateError);
      return res
        .status(500)
        .json({ error: 'Internal Server Error during update' });
    }

    console.log(updatedUser);
    res.status(200).json({ success: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
// Delete route
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    const { data: existingUser, error: fetchError } = await supabase
      .from('user')
      .select('*')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error(fetchError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!existingUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    const { error: deleteError } = await supabase
      .from('user')
      .delete()
      .eq('id', userId);

    if (deleteError) {
      console.error(deleteError);
      return res
        .status(500)
        .json({ error: 'Internal Server Error during deletion' });
    }

    res.status(200).json({ success: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log('Server Running on Port:', port);
});
