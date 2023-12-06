import mongoose from "mongoose";
// const productsSchema = new mongoose.Schema({
//     Name: String,
//     Model: String,
//     Price: Number,
//     Quantity: Number, 
//     Category: String
// });

const productsSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    } ,
    Model: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    }
});

export default mongoose.model("Products", productsSchema)