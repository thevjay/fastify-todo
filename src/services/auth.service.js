const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user.repository');

class AuthService {
  generateToken(userId) {
    return jwt.sign(
      { userId }, 
      process.env.JWT_SECRET, 
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  }

  async register(userData) {
    const { name, email, password } = userData;

    // Check if user exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email already registered');
    }

    // Create user
    const user = await userRepository.create({ name, email, password });
    
    // Generate token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  }

  async login(email, password) {
    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = this.generateToken(user._id);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    };
  }
}

module.exports = new AuthService();