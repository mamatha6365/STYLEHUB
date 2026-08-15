
const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");

const router = express.Router();

/* CREATE ORDER */
router.post("/", auth, async (req, res) => {
    try {
        const {
            items,
            shippingAddress,
            paymentMethod,
            subtotal,
            shipping,
            discount,
            total
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const order = await Order.create({
            user: req.user._id,
            items,
            shippingAddress,
            paymentMethod: paymentMethod || "COD",
            subtotal,
            shipping: shipping || 0,
            discount: discount || 0,
            total
        });

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Unable to place order"
        });
    }
});


/* GET MY ORDERS */
router.get("/my", auth, async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        })
        .populate("items.product")
        .sort({ createdAt: -1 });

        res.json({
            success: true,
            orders
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to load orders"
        });
    }
});


/* GET SINGLE ORDER */
router.get("/:id", auth, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        }).populate("items.product");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.json({
            success: true,
            order
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid order ID"
        });
    }
});


/* CANCEL ORDER */
router.put("/:id/cancel", auth, async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (["Shipped", "Delivered", "Cancelled"].includes(order.status)) {
            return res.status(400).json({
                success: false,
                message: "This order cannot be cancelled"
            });
        }

        order.status = "Cancelled";

        await order.save();

        res.json({
            success: true,
            message: "Order cancelled",
            order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to cancel order"
        });
    }
});


module.exports = router;