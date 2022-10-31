import ProductModel from "../models/productsModel.js"

const ProductDAO = new ProductModel("products")
const CartDAO = new ProductModel("cart")

export {ProductDAO, CartDAO}