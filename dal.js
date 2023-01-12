import mongoose from 'mongoose';

// Connect to MongoDB
mongoose.connect(
  'mongodb://localhost:27017/mydatabase',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);

export default {
  // Create a new user
  create: async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
  },

  // Get all users
  readAll: async () => {
    const users = await User.find();
    return users;
  },

  // Get a user by id
  readById: async (id) => {
    const user = await User.findById(id);
    return user;
  },

  // Update a user by id
  update: async (id, userData) => {
    const user = await User.findByIdAndUpdate(id, userData, { new: true });
    return user;
  },

  // Delete a user by id
  delete: async (id) => {
    await User.findByIdAndDelete(id);
  },
};
