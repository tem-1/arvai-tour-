import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const travelSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    createDate: {
        type: Date,
        default: new Date(year, month, day, hours, minutes),
        required: false,
    },
})

const Travel = models.Travel || model("Travel", travelSchema);
export default Travel;


