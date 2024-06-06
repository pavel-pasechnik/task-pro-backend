// import { v2 as cloudinary } from 'cloudinary';
// import expressAsyncHandler from 'express-async-handler';
// import { v4 } from 'uuid';

// const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

// cloudinary.config({
//   cloud_name: CLOUDINARY_CLOUD_NAME,
//   api_key: CLOUDINARY_API_KEY,
//   api_secret: CLOUDINARY_API_SECRET,
// });

// export const cloudinaryService = expressAsyncHandler(async (id, base64String) => {
//   const publicId = `${id}-${v4()}`;

//   await cloudinary.uploader.upload(base64String, {
//     public_id: publicId,
//   });

//   return cloudinary.url(publicId, {
//     width: 1000,
//     height: 1000,
//     crop: 'fill',
//   });
// });
