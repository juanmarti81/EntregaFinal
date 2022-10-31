import express from 'express'
// import productModel from '../../models/productsModel.js'
import { ProductDAO } from "../../DAO/index.js"

const productRouter = express.Router()

// CREATE A PRODUCT
productRouter.post('/', async (req, res) => {
  const data = req.body
  const response = await ProductDAO.create(data)
  if (response.response === "success"){
    return res.status(200).send({data: response})
  } else {
    return res.status(500).send({data: response})
  }
})

// GET ALL PRODUCTS OR ONE PRODUCT
productRouter.get('/:id?', async (req, res) => {
  if (req.params.id){
    const data = await ProductDAO.getOnlyOne(Number(req.params.id))
    return res.status(200).send({data: data})
  }
  const data = await ProductDAO.getAll()
  return res.status(200).send({data: data})
})


productRouter.delete('/delete/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({response: "Debe indicar el carrito a eliminar"})
  }
  const data = await ProductDAO.delete(req.params.id)
  return res.status(200).send({data: data})
})

productRouter.put('/:id', async (req, res) => {
  if (!req.params.id || !req.body) {
    return res.status(400).send({data:"Faltaron datos necesarios para realizar la actualización"})
  }
  const {id} = req.params
  const body = req.body
  const data = await ProductDAO.updateProduct(id, body)
  return res.status(200).send({data: data})
})


export default productRouter