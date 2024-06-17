import fs from 'fs/promises';

import { v2 as cloudinary } from 'cloudinary';
import expressAsyncHandler from 'express-async-handler';

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const cloudinaryMiddleware = expressAsyncHandler(
  async (id, filePath, oldPublicId = null) => {
    try {
      if (oldPublicId) {
        await cloudinary.uploader.destroy(oldPublicId);
      }

      await fs.access(filePath);

      await cloudinary.uploader.upload(filePath, {
        public_id: id,
      });

      await fs.unlink(filePath);

      return {
        imageUrl: cloudinary.url(id, {
          width: 68,
          height: 68,
          crop: 'fill',
        }),
      };
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  }
);
