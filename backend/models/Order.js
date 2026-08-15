const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                name: String,
                image: String,
                price: Number,
                quantity: Number,
                size: String,
                color: String
            }
        ],

        shippingAddress: {
            name: String,
            phone: String,
            address: String,
            city: String,
            state: String,
            pincode: String
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "UPI", "CARD"],
            default: "COD"
        },

        subtotal: {
            type: Number,
            required: true
        },

        shipping: {
            type: Number,
            default: 0
        },

        discount: {
            type: Number,
            default: 0
        },

        total: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Placed",
                "Confirmed",
                "Packed",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "Placed"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Order", orderSchema);