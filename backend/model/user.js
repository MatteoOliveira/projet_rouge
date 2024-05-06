const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  likes: { type: Array, required: true },
  watchlist: { type: Array, required: true },
  seen: { type: Array, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
