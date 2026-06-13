import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot-reloads
 * in development. This prevents connections from growing exponentially.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB() {
  // 1. If we already have a connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // 2. If we don't have a connection promise, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log("🔋 Connected to MongoDB Atlas Successfully!");
      return mongooseInstance;
    });
  }

  // 3. Await the promise and store the connection
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset promise on error so we can retry next time
    console.error("❌ Error connecting to MongoDB:", error);
    throw error;
  }

  return cached.conn;
}
