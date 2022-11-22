import express, { response } from 'express'
import { productsMongo } from "../../DAO/index.js"

const productMongoRouter = express.Router()

// CREATE A PRODUCT
productMongoRouter.post('/', async (req, res) => {
  const data = req.body
  console.log(data)
  if (!data){
    return res.status(401).send({response: "error", data: "No recibimos el producto a agregar"})
  }
  try {
    const response = await productsMongo.create(data)
    if (response.response === 'error') {
      return res.status(500).send({response: "error", data: response.data})
    }
    return res.status(200).send({response: "success", data: response})
  } catch (error) {
    return res.status(500).send({response: "error", data: response})
  }
})

// GET ALL PRODUCTS OR ONE PRODUCT
productMongoRouter.get('/:id?', async (req, res) => {
  console.log("GET ALL PRODUCTS OR ONE PRODUCT")
  // Check if id was received and return one product
  if (req.params.id){
    try {
      const data = await productsMongo.getOnlyOne(req.params.id)
      if (data === []) {
        return res.status(400).send({response:"error", data: "El id de producto no existe en la base de datos"})
      }
      return res.status(200).send({response: "success", data: data})
    } catch (error) {
      return res.status(500).send({response: "error", data: "No pudimos recuperar el producto: " + error})
    }
  }

  // Return all products
  try {
    const data = await productsMongo.getAll()
    if (data === []) {
      return res.status(400).send({response:"error", data: "No hay productos en la base de datos"})
    }
    return res.status(200).send({response: "success", data: data})
  } catch (error) {
    return res.status(500).send({response: "error", data: "No pudimos recuperar los productos: " + error})
  }
})

// DELETE THE PRODUCT
productMongoRouter.delete('/delete/:id', async (req, res) => {
  console.log("DELETE THE PRODUCT: ", req.params.id)
  if (!req.params.id) {
    return res.status(400).send({response: "Debe indicar el producto a eliminar"})
  }
  try {
    const response = await productsMongo.delete(req.params.id)
    console.log(response)
    if (response.response === 'error') {
      return res.status(500).send({response: "error", data: "No pudimos eliminar el producto: " + response.data})
    }
    return res.status(200).send({response: "success", data: response.data})
  } catch (error) {
    return res.status(500).send({response: "error", data: "No pudimos eliminar el producto: " + error})
  }
})

// UPDATE A PRODUCT
productMongoRouter.put('/:id', async (req, res) => {
  if (!req.params.id || !req.body) {
    return res.status(400).send({data:"Faltaron datos necesarios para realizar la actualización"})
  }
  try {
    const {id} = req.params
    const body = req.body
    const response = await productsMongo.updateProduct(id, body)
    if (response.response === 'error') {
      return res.status(500).send({response: "error", data: "No pudimos eliminar el producto: " + response.data})
    }
    return res.status(200).send({response: "success", data: response.data})
  } catch (error) {
    return res.status(500).send({response: "error", data: "No pudimos actualizar el carrito: " + error})
  }
})

export default productMongoRouter