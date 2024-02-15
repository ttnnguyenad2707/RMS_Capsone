import { Schema, model } from "mongoose";

const BaseUtilities = Schema({
    name: {
        type: String,
        default: ""
    }
})

export default model("BaseUtilities", BaseUtilities);