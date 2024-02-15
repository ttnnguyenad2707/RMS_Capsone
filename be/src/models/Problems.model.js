import { Schema } from "mongoose";

const Problems = Schema ({
    title: {
        type: String,
        require: true,
    },
    content: {
        type: String,

    }
})

export default model("Problems",Problems)