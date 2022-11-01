import ProductModel from "../models/dbModel.js"

const ProductDAO = new ProductModel("products")
const CartDAO = new ProductModel("cart")

export {ProductDAO, CartDAO}