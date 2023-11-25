import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const travelSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    destination: {
        type: String,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    price: {
        type: String,
    },
    hutulbur: {
        type: [String]  //day 1 :  terelj day  2 tiishee ywna geh met 
    },
    createDate: {
        type: Date,
        default: new Date(),
    },
});

const Travel = models.Travel || model("Travel", travelSchema);

export default Travel;
