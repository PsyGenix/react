import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import path from 'path';
import authRouter from './routes/auth.mjs';
import galleryRouter from './routes/gallery.mjs';
import bookingRouter from './routes/bookings.mjs';
import './strategies/local-strategy.mjs';

// Load environment variables
dotenv.config({ path: './.env' });

// Initialize Express app
const app = express();

// MongoDB Connection with error handling
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process if DB connection fails
  });

// Middleware
app.set('trust proxy', 1); // For reverse proxies in prod 
app.use(cors({
  origin: process.env.CLIENT_URL, // Dynamic frontend URL from .env
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    collectionName: 'sessions',
    ttl: 24 * 60 * 60, // 1 day in seconds
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production (HTTPS)
    httpOnly: true, // Prevent client-side access to cookies
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Cross-site cookies in production
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
  },
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRouter);
app.use('/api/gallery', galleryRouter);
app.use('/api/bookings', bookingRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
