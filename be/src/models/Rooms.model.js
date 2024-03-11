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
    phone: {
        type: String,
    },
    DOB: {
        type: String,
    },
    gender: {
        type: String,
        enum: ["Nam","Nữ"]
    },
    cccd: {
        type: String,
    },
    avatar: {
        type: String,
    },
    imageCCCDs: [imageCCCD],
    note: {
        type: String,
    }
    
})

const Rooms = Schema ({
    floor: {
        type: Number,
    },
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
        ref: "DefaultUtilities",
    }],
    otherUtilities : [{
        type: Schema.ObjectId,
        ref: "OtherUtilities",
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
    }],
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    }

    
}, {timestamps: true});

export default model("Rooms",Rooms)