const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the product name"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Please enter the product description"]
    },
    price: {
        type: Number,
        required: [true, "Please enter the product price"],
        maxLength: [8, "Price cannot excedd 8 digits"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required: [true, "Please enter the product category"]
    },
    stock:{
        type:Number,
        required: [true, "Please enter the product stock"],
        maxLength:[4, "Stock cannot exceed 4 digits"],
        default: 1
    },
    numOfReviews:{
        type:Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type:String,
                required: true
            },
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            rating:{
                type:Number,
                required: true
            },
            comment:{
                type:String,
                required: true
            },
        }
    ],
    creator:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model("Item", itemSchema);