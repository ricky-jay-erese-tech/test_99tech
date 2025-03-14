import mongoose from "mongoose";

const ResourceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model("Resource", ResourceSchema);
