import { Schema, Types, model } from "mongoose";


const Account = new Schema({
    name: {
        type: String,
        default: null,

    },
    username: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        default: null,
        minlength: 10,
        maxlength: 50,
    },
    phone: {
        type: String,
        minlength: 10,
        default: null,

    },
    avatar: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        // required: true,
        minlength: 8,
    },
    provider: {
        type: String,
        default: "register"
    },
    accountType: {
        type: String,
        enum: ["host", "renter", "admin"],
        default: "host"
    },
    roomId: {
        type: Schema.ObjectId,
        default: null,
        ref: "Rooms"
    },
    status: {
        type: Boolean,
        default: true,
    },
    refreshToken: {
        type: String,
        default: null,

    },
    passwordResetCode: {
        type: Schema.Types.ObjectId,
        default: null,
        ref: "PasswordResetCode",
    },
    
}, { timestamps: true });
export default model("Account", Account)