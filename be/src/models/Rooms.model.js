import { Schema, model } from "mongoose";

const imageCCCD = Schema ({
    type : {
        type: String,
        enum: ['after', 'before']
    },
    url : {
        type: String,
    }
})

const member = Schema ({
    name: {
        type: String,
        require: true ,
    },
    DOB: {
        type: String,
    },
    cccd: {
        type: String,
    },
    imageCCCDs: [imageCCCD],
    phone: {
        type: String,
    },
    
})

const Rooms = Schema ({
    name: {
        type : String,

    },
    status: {
        type: String,
        enum: ["Empty","Full","Available"]
    },
    quantityMember : {
        type: Number,
        require: true,

    },
    members: [member],
    roomType: {
        type : String,
        enum: ['normal','premium']
    },
    roomPrice: {
        type : Number,
        require: true,
    },
    deposit: {
        type: Number,
    },
    utilities: [{
        type: Schema.ObjectId,
        ref: "Utilities",
    }],
    area: {
        type:Number,
        require: true,
    },
    houseId: {
        type: Schema.ObjectId,
        ref: "Houses"
    },
    problemId: [{
        type: Schema.ObjectId,
        ref: "Problems"
    }]

    
}, {timestamps: true});

export default model("Rooms",Rooms)