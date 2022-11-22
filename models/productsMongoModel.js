import mongoose from 'mongoose';
import * as dotenv from "dotenv"

dotenv.config()

const productsSchema = new mongoose.Schema({
    nombre: String,
    decripcion: String,
    precio: Number,
    stock: Number,
    imagen: String,
    codigo: String,
})

const url = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URL}/?readPreference=primary&ssl=false`

const products = new mongoose.model('products', productsSchema)

export default class ProductsMongoModel {
  conn = ''
  constructor() {
    this.conn = mongoose.connect(url)
  }

  // CREATE A NEW RECORD IN DB
  create = async (product) => {
    try {
      const newProduct = new products(product)
      const result = await newProduct.save()
      return result
    }catch (error) {
      console.log(error)
      return {response: "error", data: error}
    }
  }

  getAll = async () => {
    try {
        const response = await products.find()
        return response
    } catch (error) {
        throw new Error(`Error reading file ${error}`)
    }
  }

  getOnlyOne = async (id) => {
    console.log("Buscando id: ", id)
    try {
      const oneProduct = products.findById(id)
      return oneProduct
    } catch (error) {
      return {response: "error"}
    }
    
  }

  delete = async (id) => {
    try {
      const data = await products.deleteOne({_id: id})
      return {response: "success", data: data}
    } catch (error) {
      return {response: "error", data: error}
    }
  }

  updateProduct = async (id, product) => {
    console.log(id, product)
    try {
      const data = await products.findOneAndUpdate({_id: id}, product)
      return {response: "success", data: data}
    } catch (error) {
      return {response: "error", data: error}
    }
  }

}