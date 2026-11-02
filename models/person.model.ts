import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { 
        type: String, 
        required: true, 
        enum: ["Male", "Female"] 
    }
}, { 
    collection: 'persons',
    toJSON: {
        transform: (_doc: any, ret: any) => {
            delete ret.__v;
            return ret;
        }
    }
});

export const Person = mongoose.model("Person", personSchema);

