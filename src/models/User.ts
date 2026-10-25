import mongoose, { Schema, type Model } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: 80,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            maxlength: 254,
        },
        passwordHash: {
            type: String,
            required: [true, "Password hash is required"],
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

const User: Model<IUser> =
    (mongoose.models.User as Model<IUser> | undefined) ??
    mongoose.model<IUser>("User", userSchema);

export default User;