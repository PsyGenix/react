import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

passport.use(new LocalStrategy((username, password, done) => {
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    return done(null, { id: 'admin', username: 'admin' });
  }
  return done(null, false, { message: 'Invalid credentials' });
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => done(null, { id: 'admin', username: 'admin' }));
