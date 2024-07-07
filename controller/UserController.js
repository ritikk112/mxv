const _ = require('lodash');
const axios = require('axios');
const async = require('async');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = {
    create: async (req, res) => {
        try {
          const { username, email, password, profile, preferences } = req.body;
      
          // Hash the password before saving
          const passwordHash = await bcrypt.hash(password, 10);
      
          const newUser = new User({
            username,
            email,
            passwordHash,
            profile,
            preferences
          });
      
          const savedUser = await newUser.save();
          res.status(201).json(savedUser);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
          const users = await User.find();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    },
    getUserById: async (req, res) => {
        try {
          const user = await User.findById(req.params.id);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const { username, email, password, profile, preferences } = req.body;
        
            // Find the user by ID
            const user = await User.findById(req.params.id);
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            // Update fields
            if (username) user.username = username;
            if (email) user.email = email;
            if (password) user.passwordHash = await bcrypt.hash(password, 10);
            if (profile) user.profile = profile;
            if (preferences) user.preferences = preferences;
        
            const updatedUser = await user.save();
            res.status(200).json(updatedUser);
          } catch (error) {
            res.status(400).json({ message: error.message });
          }
    },
    deleteUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
              return res.status(404).json({ message: 'User not found' });
            }
        
            await user.remove();
            res.status(200).json({ message: 'User deleted' });
          } catch (error) {
            res.status(500).json({ message: error.message });
          }
    }
};
