import express from 'express'
import { ProductDAO } from "../../DAO/index.js"

const productRouter = express.Router()

// CREATE A PRODUCT
productRouter.post('/', async (req, res) => {
  const data = req.body
  if (!data){
    return res.status(401).send({response: "error", data: "No recibimos el producto a agregar"})
  }
  try {
    const response = await ProductDAO.create(data)
    return res.status(200).send({response: "success", data: response})
  } catch (error) {
    return res.status(500).send({response: "error", data: response})
  }

  
})

// GET ALL PRODUCTS OR ONE PRODUCT
productRouter.get('/:id?', async (req, res) => {
  // Check if id was received and return one product
  if (req.params.id){
    try {
      const data = await ProductDAO.getOnlyOne(Number(req.params.id))
      return res.status(200).send({response: "success", data: data})
    } catch (error) {
      return res.status(500).send({response: "error", data: "No pudimos recuperar el producto: " + error})
    }
  }

  // Return all products
  try {
    const data = await ProductDAO.getAll()
    return res.status(200).send({response: "success", data: data})
  } catch (error) {
    return res.status(500).send({response: "error", data: "No pudimos recuperar los productos: " + error})
  }
})

// DELETE THE CART
productRouter.delete('/delete/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({response: "Debe indicar el carrito a eliminar"})
  }
  try {
    const data = await ProductDAO.delete(req.params.id)
    return res.status(200).send({response: "success", data: data})
  } catch (error) {
    return res.status(200).send({response: "error", data: "No pudimos eliminar el carrito: " + error})
  }
})

// UPDATE A PRODUCT IN THE CART
productRouter.put('/:id', async (req, res) => {
  if (!req.params.id || !req.body) {
    return res.status(400).send({data:"Faltaron datos necesarios para realizar la actualización"})
  }
  try {
    const {id} = req.params
    const body = req.body
    const data = await ProductDAO.updateProduct(id, body)
    return res.status(200).send({response: "success", data: data})
  } catch (error) {
    return res.status(500).send({response: "error", data: "No pudimos actualizar el carrito: " + error})
  }
})

export default productRouter