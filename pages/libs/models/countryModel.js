import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const countrySchema = new Schema({
    countryName: {
        type: String,

    },
    createDate: {
        type: Date,
        default: new Date(),
        required: false,
    },
});

const Country = models.Country || model("Country", countrySchema);

export default Country;
