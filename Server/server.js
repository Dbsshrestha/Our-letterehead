const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize()); // Initialize Passport middleware

// Configure Passport with Google OAuth 2.0 credentials
passport.use(new GoogleStrategy({
    clientID: '565407833235-tqv9nd8efn1v8gosqmr2vndh4nkbfgli.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:5000/auth/google/callback'
  },
  (accessToken, refreshToken, profile, done) => {
    // You can implement user authentication logic here
    // For example, check if the user exists in your database
    // If not, create a new user account
    console.log(profile);
    return done(null, profile);
  }
));

// Route to initiate Google OAuth 2.0 authentication
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route to handle Google's OAuth 2.0 callback
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to a success page or send a response
    res.redirect('/dashboard');
  });

// Route for handling login requests
app.post('/api/login', async (req, res) => {
  const { username, password, recaptchaToken } = req.body;
  
  // Verify reCAPTCHA token
  const secretKey = '6LcUlm8pAAAAALqf79wY10Yj4GpbsPC7CrnZRqHV';
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

  try {
    const response = await axios.post(verificationUrl);
    const { success } = response.data;
    if (success) {
      // reCAPTCHA verification successful
      // Now you can proceed with Google OAuth 2.0 authentication
      // You can choose to handle Google sign-in here or in a separate route
      // For simplicity, I've separated it into a different route ('/auth/google')
    } else {
      // reCAPTCHA verification failed
      res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
