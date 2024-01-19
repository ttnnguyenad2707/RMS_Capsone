import { Schema, model } from "mongoose";

const Utilities = Schema ({
    name: {
        type : String,
    },
}, {timestamps: true})
export default model("Utilities",Utilities)