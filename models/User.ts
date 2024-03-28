import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

model('users', userSchema);

export { userSchema };
