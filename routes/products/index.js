import express from 'express'

const productRouter = express.Router()

productRouter.get('/:id?', (req, res) => {
  if (req.params.id){
    return res.status(200).send('Un producto')
  }
  return res.status(200).send('Listado de productos')
})

productRouter.post('/', (req, res) => {
  return res.status(200).send('Producto creado')
})

productRouter.delete('/delete/:id', (req, res) => {
  return res.status(200).send('Producto eliminado')
})

productRouter.put('/:id', (req, res) => {
  return res.status(200).send('Producto actualizado')
})

export default productRouter