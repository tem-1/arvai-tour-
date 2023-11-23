import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const templateSchema = new Schema({
    title: {
        type: String,

    },
    createDate: {
        type: Date,
        default: new Date(),
        required: false,
    },
    description: {
        type: String,
    },

});

const Template = models.Template || model("Template", templateSchema);

export default Template;
