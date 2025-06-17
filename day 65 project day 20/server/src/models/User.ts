import mongoose, { Document, Schema } from 'mongoose';

// Define TypeScript interface for User
export interface IUser extends Document {
    fullName: string;
    username: string;
    email: string;
    phone: string;
    location?: string;
    password: string;
    terms: boolean;
}

// Define Mongoose Schema
const UserSchema: Schema = new Schema<IUser>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
        },
        location: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        terms: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Export the model
const User = mongoose.model<IUser>('User', UserSchema);
export default User;
