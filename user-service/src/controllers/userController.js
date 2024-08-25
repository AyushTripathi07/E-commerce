const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userModel.createUser(username, email, hashedPassword);
  
  res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  
  const user = await userModel.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

const getUserProfile = async (req, res) => {
  const user = await userModel.findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.json({ id: user.id, username: user.username, email: user.email, profile: user.profile });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};