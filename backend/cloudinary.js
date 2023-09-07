import {v2 as cloudinary} from 'cloudinary';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv"
dotenv.config();
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      allowed_formats: ["jpg", "png"],
      folder: "ITalk_app_storage",
    },
  });

  const upload = multer({storage})

  export default upload