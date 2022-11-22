import mongoose from 'mongoose';
import * as dotenv from "dotenv"

dotenv.config()
const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?readPreference=primary&ssl=false`

const productsSchema = new mongoose.Schema({
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'products'}],
})

const carts = new mongoose.model('carts', productsSchema)

export default class CartMongoModel {
  conn = ''
  constructor() {
    this.conn = mongoose.connect(url)
  }

  // CREATE A NEW CART IN DB
  create = async () => {
    try {
      const newCart = new carts()
      const result = await newCart.save()
      return {response: "success", data: result}
    }catch (error) {
      console.log(error)
      return {response: "error", data: error}
    }
  }

  // ADD A PRODUCT TO A CART
  insertProduct = async (cartId, productId) => {
    console.log("Buscando cartid: ", cartId)
    console.log("Buscando productid: ", productId)
    try {
      const data = await carts.findOneAndUpdate({_id: cartId}, {$push: {products: productId}})
      return {response: "success", data: data}
    } catch (error) {
      return {response: "error", data: error}
    }
  }

  // GET ALL PRODUCTS FROM A CART
  getCart = async (id) => {
    console.log("Buscando id: ", id)
    try {
      const oneCart = await carts.findById({_id: id}).populate('products')
      return {response: "success", data: oneCart}
    } catch (error) {
      return {response: "error", data: error}
    } 
  }

  // DELETE A CART
  deleteCart = async (id) => {
    try {
      const data = await carts.deleteOne({_id: id})
      return {response: "success", data: data}
    } catch (error) {
      return {response: "error", data: error}
    }
  }

  // DELETE A PRODUCT FROM A CART
  deleteProduct = async (cartId, productId) => {
    try {
      const data = await carts.findOneAndUpdate({_id: cartId}, {$pull: {products: productId}})
      return this.getCart(cartId)
    } catch (error) {
      return {response: "error", data: error}
    }
  }

}