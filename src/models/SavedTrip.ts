import mongoose, { Schema, type Model } from "mongoose";

export interface ISavedTrip {
    userId: mongoose.Types.ObjectId;
    destinationSlug: string;
    createdAt: Date;
    updatedAt: Date;
}

const savedTripSchema = new Schema<ISavedTrip>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        destinationSlug: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

// A user can save each destination only once.
savedTripSchema.index(
    { userId: 1, destinationSlug: 1 },
    { unique: true }
);

const SavedTrip: Model<ISavedTrip> =
    (mongoose.models.SavedTrip as Model<ISavedTrip> | undefined) ??
    mongoose.model<ISavedTrip>("SavedTrip", savedTripSchema);

export default SavedTrip;