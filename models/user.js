import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    avatarURL: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    theme: {
      type: String,
      enum: ['dark', 'light', 'violet'],
      default: 'light',
    },
    token: {
      type: String,
      default: null,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model('User', userSchema);
