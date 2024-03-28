import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';

import './models/User';
import './services/passport';
import { authRoutes } from './routes/authRoutes';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI as string);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

const startServer = () => {
  const app = express();

  app.use(
    session({
      secret: process.env.COOKIES_KEY as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000
      }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());

  authRoutes(app);

  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`App is running at: http://localhost:${PORT}`);
  });
};

// Only start the server if the Mongoose connection is successful
connectToDatabase().then(startServer);

export { connectToDatabase }; // Export the connectToDatabase function for testing purposes
