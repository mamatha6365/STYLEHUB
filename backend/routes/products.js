
const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

/* GET ALL PRODUCTS */
router.get("/", async (req, res) => {
    try {
        const products = await Product.find().sort({
            createdAt: -1
        });

        res.json({
            success: true,
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Unable to load products"
        });
    }
});

router.get("/search/filter", async (req, res) => {
    try {

        const {
            search,
            category,
            minPrice,
            maxPrice
        } = req.query;

        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i"
                    }
                },
                {
                    brand: {
                        $regex: search,
                        $options: "i"
                    }
                }
            ];
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        const products = await Product.find(filter);

        res.json({
            success: true,
            products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Search failed"
        });
    }
});

/* GET SINGLE PRODUCT */
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.json({
            success: true,
            product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid product ID"
        });
    }
});

module.exports = router;