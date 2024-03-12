import { Schema, model } from "mongoose";

const priceItemSchema = Schema({
    base: {
        type: Schema.ObjectId,
        ref: "DefaultPrice",
    },
    sum: {
        type: Number,
    } 
})

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
    priceList: [{
        type : priceItemSchema
    }],
    debt: {
        type: Number,
        require: true,
    },
    note: {
        type: String,
        default: ""
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
},{timestamps: true})

export default model("Bills",Bills)