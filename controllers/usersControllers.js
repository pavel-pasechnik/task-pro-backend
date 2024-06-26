import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mime from 'mime-types';

import { HttpError } from '../helpers/HttpError.js';
import sendHelpEmail from '../helpers/mail.js';
import { cloudinaryMiddleware } from '../middleware/cloudinary.js';
import User from '../models/user.js';

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user !== null) throw HttpError(409, 'Email in use');

    const passwordHash = await bcrypt.hash(password, 10);

    const addUser = await User.create({
      name,
      email,
      password: passwordHash,
    });

    res.status(201).json({
      user: {
        name: addUser.name,
        email: addUser.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw HttpError(401, 'Email or password is wrong');

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) throw HttpError(401, 'Email or password is wrong');

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const addUserToken = await User.findByIdAndUpdate(user._id, { token }, { new: true });

    res.status(200).json({
      token: addUserToken.token,
      user: {
        avatarURL: addUserToken.avatarURL,
        name: addUserToken.name,
        theme: addUserToken.theme,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { token: null });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const currentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: {
        name: req.user.name,
        email: req.user.email,
        avatarURL: req.user.avatarURL,
        theme: req.user.theme,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    const mimeType = mime.lookup(req.file.path);
    if (!mimeType?.startsWith('image/')) throw HttpError(400, 'Invalid file type');

    const { id, avatarURL } = req.user;
    const filePath = req.file.path;

    const { imageUrl } = await cloudinaryMiddleware(id, filePath, avatarURL);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: imageUrl },
      {
        new: true,
      }
    );

    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

export const updateTheme = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    res.status(200).json({ theme: user.theme });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name = req.user.name, email = req.user.email, password } = req.body;
    let passwordHash = null;
    const user = await User.findOne({ email });

    if (user && user._id.toString() !== req.user._id.toString())
      throw HttpError(409, 'Email in use');

    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    } else {
      passwordHash = req.user.password;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        email,
        name,
        password: passwordHash,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      token: updatedUser.token,
      user: {
        email: updatedUser.email,
        name: updatedUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const needHelp = async (req, res, next) => {
  try {
    const { email, comment } = req.body;
    await sendHelpEmail(email, comment);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    next(error);
  }
};
