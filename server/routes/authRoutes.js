import express from 'express';
import cors from 'cors';
import corsOptions from '../utils/corsOptions.js';
import {
  test,
  registerUser,
  loginUser,
  getProfile,
} from '../controllers/authController.js';

// Middleware
const router = express.Router();
router.use(cors(corsOptions));

// Routes
router.get('/', test);
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getProfile);

// Error handling
router.use((err, req, res, next) => {
  res.status(500).json({ error: 'Internal Server Error. Should not be getting here' });
});

export default router;
