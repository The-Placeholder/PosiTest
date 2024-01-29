import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});
const port = process.env.PORT || 3001;
const router = express.Router();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static('./public'));

app.use('/', require('./routes/authRoutes'));

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

// GET 1 ROUTE for Question
app.get('/api/questions/:id', async (req, res) => {
  try {
    const questionId = req.params.id;

    const { data, error } = await supabase
      .from('problem')
      .select('*')
      .eq('id', questionId)
      .single();

    if (error) {
      console.error(error);
      return res.status(500).send('Error fetching question');
    }

    if (!data) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching question');
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

// POST route for submitting answers
router.post('/answers', async (req, res) => {
  try {
    const { user_id, problem_id, answer } = req.body;

    // Check if the user and problem exist
    const { data: existingUser, userError } = await supabase
      .from('user')
      .select('*')
      .eq('id', user_id)
      .single();

    const { data: existingProblem, problemError } = await supabase
      .from('problem')
      .select('*')
      .eq('id', problem_id)
      .single();

    if (userError || problemError) {
      console.error(userError || problemError);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (!existingUser || !existingProblem) {
      return res.status(404).json({ error: 'User or problem not found' });
    }

    // Insert the answer
    const { data: newAnswer, answerError } = await supabase
      .from('answer')
      .insert([{ user_id, problem_id, answer }]);

    if (answerError) {
      console.error(answerError);
      return res
        .status(500)
        .json({ error: 'Internal Server Error during answer submission' });
    }

    console.log(newAnswer);
    res.status(200).json({ success: 'Answer submitted successfully' });
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

// Socket.io Logic for real-time document editing
let currentContent = '';
io.on('connection', (socket) => {
  let room = null
  let username = null

  console.log(`⚡: ${socket.id} user just connected`);
  socket.emit('doc-change', currentContent);
  socket.on('doc-change', (newCode) => {
    if (currentContent !== newCode) {
      currentContent = newCode;
      io.to(room).emit('doc-change', currentContent);
    }
  });
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });

  // MESSENGER EVENTS 
  socket.on('ComponentLoad',(userArr)=>{
    if(room){
      socket.leave(room)
    }
    if(!chatRooms[userArr[1]]){
      chatRooms[userArr[1]]=[]
    }

    username=userArr[0]
    room=userArr[1]
    socket.join(userArr[1])

    socket.emit('chatRecordTransfer',chatRooms[userArr[1]])
    io.to(room).emit('doc-change', currentContent);

    console.log(`componentLoad received username: ${userArr[0]}, room ${userArr[1]}`)
  })
  
  socket.on('MessageRequest',(message)=>{
    const clock = new Date()[Symbol.toPrimitive]('number')
    chatRooms[room].push({sender:username,message:message[0],time:clock,icon:message[1]})
    io.to(room).emit('chatRecordTransfer',chatRooms[room])
  })
});

// Server Listening
server.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});


//--MESSENGER TEST HARDCODED VARIABLES-------------------------
  // TEST CHATHISTORY
const globalrecords = [
  {sender:'senderA',message:'hello',time:'2 hours ago'},
  {sender:'senderB',message:'hello, how are you',time:'2 hours ago'},
  {sender:'senderA',message:'good, how are you',time:'2 hours ago'},
  {sender:'senderB',message:'I\'m doing good as well',time:'2 hours ago'},
  {sender:'senderA',message:'how can I help you',time:'2 hours ago'},
  {sender:'senderB',message:'I\'m having trouble with problem A',time:'2 hours ago'},
  {sender:'senderA',message:'sorry i\'ll help you in 1 sec, brb',time:'2 hours ago'}
]
  // Chatrooms, 0th index for global chat
const chatRooms = {global:globalrecords}
  // variable for saving previous sockets, to reduce redundant sockets
// const userSockets = {}