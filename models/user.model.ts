import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    age: Number
}, {
    collection: "users",
    toJSON: {
        transform: (_doc: any, ret: any) => {
            delete ret.__v;
            return ret;
        }
    }
});

export const User = mongoose.model("User", userSchema);