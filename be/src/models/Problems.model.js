import { Schema,model } from "mongoose";

const Problems = Schema ({
    type: {
        type: String,
        enum: ["common","electric","water","other"],
        default: "common",
        require: true,
    },
    status: {
        type: String,
        enum: ["none","doing","pending","done"],
        default: "none",
    },
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,
    },
    roomId: {
        type: Schema.ObjectId,
        ref: "Rooms"
    },
    creatorId: {
        type: Schema.ObjectId,
        ref: "Account"
    }
})

export default model("Problems",Problems)