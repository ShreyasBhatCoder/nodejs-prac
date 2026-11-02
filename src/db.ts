import mongoose from "mongoose";
import { env } from "../env.ts";

const mongoUrl = env.MONGO_URL;

mongoose.connect(mongoUrl);

export const db = mongoose.connection;

db.on("connected", () => console.log("[INFO]: Connected to Database"))

db.on("error", err => console.log(`[ERROR]: ${err}`));

db.on("disconnected", () => console.log("[WARN]: Disconnected from Database"));


