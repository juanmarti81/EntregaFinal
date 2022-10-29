import express from "express";

const cartRouter = express.Router()

cartRouter.get('/:id/products', (req, res) => {
  if (!req.params.id){
    return res.status(401).send('No hay un carrito seleccionado')
  }
  return res.status(200).send('Listado de productos en el carrito')
})

cartRouter.post('/:id/products', (req, res) => {
  return res.status(200).send('Producto agregado')
})

cartRouter.post('/', (req, res) => {
  return res.status(200).send('Carrito creado')
})

cartRouter.delete('/:id', (req, res) => {
  return res.status(200).send('Carrito eliminado')
})

cartRouter.delete('/:id/products/:id_product', (req, res) => {
  return res.status(200).send('Producto eliminado')
})

export default cartRouter