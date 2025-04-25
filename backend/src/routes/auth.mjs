import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/status', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user ? { id: req.user.id, username: req.user.username } : null,
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ user: { id: req.user.id, username: req.user.username } });
});

router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: 'Logout failed' });
    res.json({ success: true });
  });
});

export default router;
