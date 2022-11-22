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
    // check if id is not a number
    if (isNan(req.params.id)) {
      return res.status(400).send({response: error, data: "El id debe ser numérico"})
    }
    try {
      const data = await ProductDAO.getOnlyOne(Number(req.params.id))
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
    const data = await ProductDAO.getAll()
    if (data === []) {
      return res.status(400).send({response:"error", data: "No hay productos en la base de datos"})
    }
    return res.status(200).send({response: "success", data: data})
  } catch (error) {
    return res.status(500).send({response: "error", data: "No pudimos recuperar los productos: " + error})
  }
})

// DELETE THE PRODUCT
productRouter.delete('/delete/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({response: "Debe indicar el PRODUCTO a eliminar"})
  }
  try {
    const data = await ProductDAO.delete(req.params.id)
    return res.status(200).send({response: "success", data: data})
  } catch (error) {
    return res.status(200).send({response: "error", data: "No pudimos eliminar el PRODUCTO: " + error})
  }
})

// UPDATE A PRODUCT
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
    return res.status(500).send({response: "error", data: "No pudimos actualizar el producto: " + error})
  }
})

export default productRouter