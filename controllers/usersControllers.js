// TODO import * as fs from 'node:fs/promises';
import path from 'node:path';

import bcrypt from 'bcrypt';
// TODO import gravatar from 'gravatar';
import Jimp from 'jimp';
import jwt from 'jsonwebtoken';
import { v4 as uuId } from 'uuid';

import HttpError from '../helpers/HttpError.js';
import sendMail from '../helpers/mail.js';
import User from '../models/user.js';

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });

    if (user !== null) throw HttpError(409, 'Email in use');

    const passwordHash = await bcrypt.hash(password, 10);

    const avatarUrl = ''; // TODO gravatar.url(email, { protocol: 'http', size: '250' })

    const addUser = await User.create({
      name,
      email,
      password: passwordHash,
      avatarURL: avatarUrl,
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

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
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
      name: req.user.name,
      email: req.user.email,
      avatarURL: req.user.avatarURL,
      theme: req.user.theme,
    });
  } catch (error) {
    next(error);
  }
};

// export const subscriptionUpdate = async (req, res, next) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(req.user._id, req.body, {
//       new: true,
//     });

//     res.status(200).json({
//       email: updatedUser.email,
//       subscription: updatedUser.subscription,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateAvatar = async (req, res, next) => {
  try {
    const extname = path.extname(req.file.path);
    const basename = path.basename(req.file.path, extname);
    const newAvatarName = `${basename}-68x68${extname}`;
    const avatarResize = await Jimp.read(req.file.path);

    const resize = await avatarResize.resize(68, 68).writeAsync(req.file.path);

    // TODO await fs.rename(req.file.path, path.resolve('public', 'avatars', newAvatarName));

    const avatarURL = `/avatars/${newAvatarName}`;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatarURL: avatarURL },
      {
        new: true,
      }
    );

    console.log(user);

    res.status(200).json({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
};

export const updateTheme = async (req, res, next) => {
  try {
    const theme = req.user.theme;

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
      new: true,
    });

    res.status(200).json({ theme: user.theme });
  } catch (error) {
    next(error);
  }
};
//TODO Update user!
export const updateUser = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;
    const user = await User.findOne({ email });

    if (user !== null) throw HttpError(409, 'Email in use');

    const passwordHash = await bcrypt.hash(password, 10);

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
      user: {
        avatarURL: updatedUser.avatarURL,
        email: updatedUser.email,
        name: updatedUser.name,
      },
    });
  } catch (error) {
    next(error);
  }
};
