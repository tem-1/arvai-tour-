import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

// Check if the model already exists before defining it
const About = models.About || model("About", new Schema({
    header: {
        type: String,
    },
    description: { type: String },
    account: { type: String },
    photo: { type: String },
    photo1: { type: String },
    photo2: { type: String },
    createDate: {
        type: Date,
        default: new Date(),
        required: false,
    }
}));

export default About;
