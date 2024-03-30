import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const templetaSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    createDate: {
        type: Date,
        default: new Date(),
        required: false,
    },
})

const Template = models.Template || model("Template", templetaSchema);
export default Template;


