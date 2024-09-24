import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import passportConfig from '../middlewares/passport.js';

const router = express.Router();
passportConfig(passport);

router.get('/user', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { id, email } = req.user;
  res.json({ id, email });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const payload = { id: user.id, email: user.email };

      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

      res.json({ message: 'Logged in', token: 'Bearer ' + token });
    } else {
      res.status(400).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});


export default router;