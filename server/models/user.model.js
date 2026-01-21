import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
   avatar: {
        type: String,
        default: "" 
},
    mobile: {
        type: String,
        default: ""
    },
    refreshTokens: {
        type: String,
        default: ""
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date,
        default: ''
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Banned'],
        default: 'Active'
    },
    address_details: [
        {
            type: mongoose.Schema.ObjectId,
            ref : 'Address'
        }
    ],

    shopping_cart: [
        {
            type: mongoose.Schema.ObjectId,
            ref : 'cartproduct'
        }
    ],

    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref : 'Order'
        }
    ],

    forgot_password_otp:{
        type: String,
        default: null
    },
    forgot_password_expiry:{
        type: Date,
        default: ''
    },

    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },



},

 { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
