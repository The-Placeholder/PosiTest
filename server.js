import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { createClient } from '@supabase/supabase-js';
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import cookieParser from 'cookie-parser';
import authorization from './auth/jwt.js';
import { getContentTypeByFile, uploadImage } from './aws.js';
import multer from 'multer';

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
const port = process.env.PORT || 3000;
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
app.use(express.static('./public'));
app.use(cookieParser());
// Sets up Multer for Memory Storage

function multerConditionalUpload(req, res, next) {
  if (req.headers['content-type'].startsWith('multipart/form-data')) {
    return upload.single('uploaded_pic')(req, res, next);
  }
  next();
}

const upload = multer({ storage: multer.memoryStorage() });

//  ------------------------------------------------------------ DB API ROUTES
app.get('/api/auth', authorization, async (req, res) => {
  const userData = req.userData;
  res.status(200).json(userData);
});

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
    const { email, password, username } = req.body;
    const role = 'student';
    const saltRounds = 10;
    const hashed_password = await bcrypt.hash(password, saltRounds);

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
    res.status(201).json({ success: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username + password);
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
    //JWT TOKEN SIGNING (IT STORES THE USERNAME AND ID)
    const token = jwt.sign(
      { username: username, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    //COOKIE OPTIONS
    const cookieOptions = {
      maxAge: 3600000,
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production',
    };
    //ADD THE COOKIE TO THE HEADER
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('jwtToken', token, cookieOptions)
    );
    res
      .status(200)
      .json({ success: 'Login successful', user: { id: user.id, username } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/logout', (req, res) => {
  // Use the same options, but set maxAge to 0 or use expires for past date
  const cookieOptions = {
    httpOnly: true, // Match the setting used when the cookie was set
    secure: process.env.NODE_ENV === 'production', // Match the setting used when the cookie was set
    maxAge: 0, // Immediately expire the cookie
    // Or use expires with a past date
    // expires: new Date(0)
  };

  // Clear the cookie named 'jwtToken'
  res.clearCookie('jwtToken', cookieOptions);
  res.status(200).json({ success: 'User Logged Out' });
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
router.patch('/users/:id', multerConditionalUpload, async (req, res) => {
  try {
    const userId = req.params.id;
    const { email, hashed_pw, role, username, profile_pic } = req.body;

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

    const updateData = {};
    if (req.file) {
      const contentType = getContentTypeByFile(req.file.originalname);
      try {
        // If a file is uploaded, use this URL instead
        pictureUrl = await uploadImage(
          req.file.originalname,
          req.file.buffer,
          contentType
        );
        updateData.profile_pic;
      } catch (err) {
        return res.status(500).send('Failed to upload image.');
      }
    }

    if (profile_pic) {
      updateData.profile_pic = profile_pic;
    }
    if (email) {
      updateData.email = email;
    }
    if (hashed_pw) {
      updateData.hashed_pw = hashed_pw;
    }
    if (role) {
      updateData.role = role;
    }
    if (username) {
      updateData.username = username;
    }

    const { data: updatedUser, error: updateError } = await supabase
      .from('user')
      .update(updateData)
      .eq('id', userId);

    if (updateError) {
      console.error(updateError);
      return res
        .status(500)
        .json({ error: 'Internal Server Error during update' });
    }

    console.log(updateData);
    res
      .status(200)
      .json({ success: 'User updated successfully', updateData: updateData });
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
let currentContent = {};
let roomstatus = {};
let roomParticipants = {};
io.on('connection', (socket) => {
  let room = null;
  let username = null;

  console.log(`⚡: ${socket.id} user just connected`);
  // socket.emit('doc-change', currentContent);
  socket.on('doc-change', (newCode) => {
    if (currentContent[room] !== newCode) {
      currentContent[room] = newCode;
      io.to(room).emit('doc-change', currentContent[room]);
    }
  });
  socket.on('disconnect', () => {
    roomParticipants[room]?.delete(username);
    console.log('🔥: A user disconnected');
    if (roomParticipants[room]?.size === 0) {
      roomstatus[room] = [];
    }
  });

  // MESSENGER EVENTS
  socket.on('ComponentLoad', (userArr) => {
    console.log(roomstatus[userArr[1]]);
    if (room) {
      roomParticipants[room]?.delete(username);
      io.to(room).emit('participantUpdate', [...roomParticipants[room]]);

      socket.leave(room);
      if (roomParticipants[room]?.size === 0) {
        roomstatus[room] = [];
      }
    }
    if (!chatRooms[userArr[1]]) {
      chatRooms[userArr[1]] = [];
    }
    if (!roomParticipants[userArr[1]]) {
      roomParticipants[userArr[1]] = new Set();
    }
    if (roomstatus[userArr[1]]?.length > 0) {
      socket.emit('pauseplay', roomstatus[userArr[1]]);
    }

    username = userArr[0];
    room = userArr[1];
    roomParticipants[room].add(username);
    socket.join(userArr[1]);

    socket.emit('chatRecordTransfer', chatRooms[userArr[1]]);
    io.to(room).emit('doc-change', currentContent[room]);
    io.to(room).emit('participantUpdate', [...roomParticipants[room]]);

    console.log(
      `componentLoad received username: ${userArr[0]}, room ${userArr[1]}`
    );
  });

  socket.on('MessageRequest', (message) => {
    const clock = new Date()[Symbol.toPrimitive]('number');
    chatRooms[room].push({
      sender: username,
      message: message[0],
      time: clock,
      icon: message[1],
    });
    io.to(room).emit('chatRecordTransfer', chatRooms[room]);
    console.log(`message request approved, sending to ${room}`);
  });

  socket.on('pauseplay', (status) => {
    const clock = new Date()[Symbol.toPrimitive]('number');
    roomstatus[room] = status;
    roomstatus[room].push(clock);
    io.to(room).emit('pauseplay', status);
  });
});

// Server Listening
server.listen(port, () => {
  console.log(`Server Running on Port: ${port}`);
});

//--MESSENGER TEST HARDCODED VARIABLES-------------------------
// TEST CHATHISTORY
const globalrecords = [
  {
    sender: 'Bloo',
    message: 'hello',
    time: '2 hours ago',
    icon: `https://i.insider.com/5b2d4b7142e1cc041623dc16?width=900&format=jpeg`,
  },
  {
    sender: 'Bully Mcguire',
    message: 'I missed the part where thats my problem',
    time: '2 hours ago',
    icon: `https://i.stack.imgur.com/5Kgaq.jpg?s=256&g=1`,
  },
  {
    sender: 'Handsome Squidward',
    message: 'Fortunately, I Have Enough Talent For All Of You',
    time: '2 hours ago',
    icon: `https://i.pinimg.com/originals/e4/d9/50/e4d950f1332f136e7f9a21d6e499e949.jpg`,
  },
  {
    sender: 'Not a bot',
    message: "I'm doing good as well",
    time: '2 hours ago',
    icon: `https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg`,
  },
  {
    sender: 'Bloo',
    message: 'how can I help you',
    time: '2 hours ago',
    icon: `https://i.insider.com/5b2d4b7142e1cc041623dc16?width=900&format=jpeg`,
  },
  {
    sender: 'Viking Beardman',
    message: "I'm having trouble with problem A",
    time: '2 hours ago',
    icon: `https://avatars.githubusercontent.com/u/104329744?v=4`,
  },
  {
    sender: 'Duckin Duck',
    message: "sorry i'll help you in 1 sec, brb",
    time: '2 hours ago',
    icon: `https://avatars.githubusercontent.com/u/123521469?v=4`,
  },
];
// Chatrooms
const chatRooms = { global: globalrecords };
