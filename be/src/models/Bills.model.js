import { Schema, model } from "mongoose";

const Bills = Schema({
    roomId : {
        type: Schema.ObjectId,
        ref: "Rooms"
    },
    roomPrice: {
        type: Number,
        require : true,
    },
    electricPrice: {
        type: Number,
        require: true,
    },
    waterPrice: {
        type: Number,
        require: true,
    },
    servicePrice: {
        type: Number,
        require: true,
    },
    debt: {
        type: Number,
        require: true,
    },
    note: {
        type: String,
        default: ""
    },
    paid: {
        type: Boolean,
        default: false,
    },
},{timestamps: true})

export default model("Bills",Bills)