import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const eventSchema = new Schema({
    eventName: {
        type: String,
    },
    description: {
        type: String,
    },
    ognoo: {
        type: String
    },
    createDate: {
        type: Date,
        default: new Date(),
        required: false,
    },
})

const Event = models.Template || model("Event", eventSchema);
export default Event;


