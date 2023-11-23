import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const countrySchema = new Schema({
    countryName: {
        type: String,
    },
    photo: {
        type: String,
        default: "no country photo"
    },
    createDate: {
        type: Date,
        default: new Date(),
        required: false,
    },
});

const Country = models.Country || model("Country", countrySchema);

export default Country;
