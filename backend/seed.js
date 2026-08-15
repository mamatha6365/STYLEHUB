require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
    {
        name: "Classic Pink Dress",
        brand: "StyleHub",
        category: "Women",
        price: 499,
        description: "Elegant pink dress for modern fashion.",
        image: "assets/images/products/pink-dress.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["pink"]
    },
    {
        name: "Premium Men's Shirt",
        brand: "StyleHub",
        category: "Men",
        price: 347,
        description: "Comfortable premium shirt for everyday wear.",
        image: "assets/images/products/mens-shirt.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue", "Black", "White"]
    },
    {
        name: "Casual Denim Jacket",
        brand: "StyleHub",
        category: "Men",
        price: 699,
        description: "Trendy denim jacket with a modern fit.",
        image: "assets/images/products/denim-jacket.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue", "Black", "White"]
    },
    {
        name: "Women's Handbag",
        brand: "StyleHub",
        category: "Women",
        price: 299,
        description: "Stylish handbag for everyday use.",
        image: "assets/images/products/handbag.jpg",
        sizes: ["S"],
        colors: ["Blue", "Black", "White"]
    },
    {
        name: "Kids Casual Outfit",
        brand: "StyleHub",
        category: "Kids",
        price: 200,
        description: "Comfortable and stylish kids outfit.",
        image: "assets/images/products/kids-outfit.jpg",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Blue", "Black", "White"]
    }
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Product.deleteMany();
        await Product.insertMany(products);

        console.log("Products added successfully");
        process.exit();
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

seed();