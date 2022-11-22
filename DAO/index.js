import ProductModel from "../models/dbModel.js"
import ProductsMongoModel from "../models/productsMongoModel.js"
import CartMongoModel from "../models/cartMongoModel.js"
import ProductsFirebaseModel from "../models/productsFirebaseModel.js"

const ProductDAO = new ProductModel("products")
const CartDAO = new ProductModel("cart")

const productsMongo = new ProductsMongoModel()
const cartsMongo = new CartMongoModel()

const productsFirebase = new ProductsFirebaseModel()

export {ProductDAO, CartDAO, productsMongo, cartsMongo, productsFirebase}