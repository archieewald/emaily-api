import passport from 'passport';
import { Application } from 'express';

const authRoutes = (app: Application) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout(() => {});
    res.send('You are logged out!');
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};

export { authRoutes };
