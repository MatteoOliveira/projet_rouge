const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  pseudo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
