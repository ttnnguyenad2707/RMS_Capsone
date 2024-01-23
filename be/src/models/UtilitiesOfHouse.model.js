import { Schema, model } from "mongoose";

const UtilitiesOfHouse = Schema ({
    houseId: {
        type: Schema.ObjectId,
        ref: "Houses"
    },
    utilities: [{
        type : Schema.ObjectId,
        ref: "BaseUtilities"
    }],
    otherUtilities: [{
        type: Schema.ObjectId,
        ref: "OtherUtilities"
    }]
}, {timestamps: true})
export default model("UtilitiesOfHouse",UtilitiesOfHouse)