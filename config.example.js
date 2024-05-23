const DB_URI = "";
const API =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000/api";
const NEXTAUTH_SECRET = "";
const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";

const CLOUDINARY_CLOUD_NAME = "";
const CLOUDINARY_API_KEY = "";
const CLOUDINARY_API_SECRET = "";
module.exports = {
  DB_URI,
  API,
  NEXTAUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
};
