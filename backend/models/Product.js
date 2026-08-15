const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        brand: {
            type: String,
            required: true
        },

        category: {
            type: String,
            required: true,
            enum: ["Men", "Women", "Kids"]
        },

        subcategory: {
            type: String,
            default: ""
        },

        price: {
            type: Number,
            required: true
        },

        oldPrice: {
            type: Number,
            default: 0
        },

        image: {
            type: String,
            required: true
        },

        description: {
            type: String,
            default: ""
        },

        sizes: {
            type: [String],
            default: []
        },

        colors: {
            type: [String],
            default: []
        },

        rating: {
            type: Number,
            default: 0
        },

        reviews: {
            type: Number,
            default: 0
        },

        stock: {
            type: Number,
            default: 0
        },

        featured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Product", productSchema);