import { Schema, Types, model } from "mongoose";

const rule = new Schema ({
    name: {
        type : String,
        default: "",
    }
})
const LocationSchema = new Schema({
    district: {
        type: String,
        default: "",
    },
    ward: {
        type: String,
        default: "",
    },
    province: {
        type: String,
        default: "",
    },
});
const Houses = new Schema({
    name: {
        type: String,
        require: true
    },
    status : {
        type: Boolean,
        require: true,
    },
    location: {
        type: LocationSchema,
        default: {},
    },
    electricPrice: {
        type: Number,
        require: true,
    }, 
    waterPrice: {
        type: Number,
        require: true,
    }, 
    utilities: [{
        type: Schema.ObjectId,
        ref: "UtilitiesOfHouse",
    }],
    rules: {
        type: [String],
        default: []
    },
    hostId : {
        type: Schema.ObjectId,
        ref: "Account"
    }

      
}, {timestamps: true})

export default model("Houses",Houses)