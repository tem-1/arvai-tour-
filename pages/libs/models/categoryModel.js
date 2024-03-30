import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const templetaSchema = new Schema({
    name: {
        type: String,
    },
    createtDate: {
        type: Date,
        default: new Date()
    },
    coutryId: {
        type: Schema.Types.ObjectId,
        ref: "Country"
    }
})

const Template = models.Template || model("Template", templetaSchema);
export default Template;


