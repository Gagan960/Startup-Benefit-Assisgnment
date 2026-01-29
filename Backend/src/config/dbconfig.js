import mongoose from "mongoose";
import { DB_URL } from "./serverConfig.js";

function maskUri(uri) {
  if (!uri) return uri;
  try {
    return uri.replace(/(mongodb(?:\+srv)?:\/\/[^:\/]+:)([^@]+)(@)/, '$1***$3');
  } catch {
    return '***';
  }
}

export default async function connectDB() {
  try {
    // console.log('DB_URL loaded (masked):', DB_URL ? maskUri(DB_URL) : DB_URL);
    await mongoose.connect(DB_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

// mongodb+srv://gagankumar11023_db_user:<db_password>@cluster0.q9mbi4t.mongodb.net/?appName=Cluster0