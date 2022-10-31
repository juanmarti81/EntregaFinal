import express from 'express'
import productModel from '../../models/productsModel.js'

const productRouter = express.Router()

let productmodel = new productModel()

productRouter.post('/', async (req, res) => {
  const data = req.body
  console.log(data)
  const response = await productmodel.createProduct(data)
  console.log(response)
  if (response.response === "success"){
    return res.status(200).send(response)
  } else {
    return res.status(500).send(response)
  }
})

productRouter.get('/:id?', async (req, res) => {
  if (req.params.id){
    console.log("PARAMETROS: ", req.params.id)
    const data = await productmodel.getOneProduct(Number(req.params.id))
    console.log(data)
    return res.status(200).send({data:data})
  }
  const data = await productmodel.getAllProducts()
  return res.status(200).send({data: data})
})


productRouter.delete('/delete/:id', async (req, res) => {
  const data = await productmodel.deleteProduct(req.params.id)
  return res.status(200).send({data: data})
})

productRouter.put('/:id', async (req, res) => {
  const data = await productmodel.updateProduct(req.params.id, req.body)
  return res.status(200).send('Producto actualizado')
})


export default productRouter