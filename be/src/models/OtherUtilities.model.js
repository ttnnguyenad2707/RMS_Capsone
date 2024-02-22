import { Schema, model } from "mongoose";

const OtherUtilities = Schema({
    houseId:{
        type: Schema.ObjectId,
        ref: "Houses"
    },
    name: {
        type: String,
        default: ""
    }
})

export default model("OtherUtilities",OtherUtilities)