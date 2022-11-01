import express from "express";
import {CartDAO, ProductDAO} from "../../DAO/index.js"

const cartRouter = express.Router()

// CREAR UN CARRITO 
cartRouter.post('/', async (req, res) => {
  try {
    const cart_format = {products: []}
    const cart = await CartDAO.create(cart_format)
    return res.status(200).send({response: "success", data: cart})
  } catch (error) {
    return res.status(500).send({response: "error", data:"Error al crear el carrito: " + error})
  }
})

// AGREGAR PRODUCTO A UN CARRITO
cartRouter.post("/:id/products", async (req, res) => {
  
  const {product_id} = req.body
  const {id} = req.params

  if (!product_id || id) { 
    return res.status(401).send({response: "error", data: "No se recibieron todos los datos."})
  }

  try {
    const cart = await CartDAO.getOnlyOne(Number(id))
    if (!cart) { return res.status(401).send("El carrito no existe") }

    const product = await ProductDAO.getOnlyOne(Number(product_id))
    if (!product) { return res.status(401).send({response: "error", data: "El producto seleccionado no existe"}) }

    const cart_copy = cart.reduce((a, b) => Object.assign(a, b), {})
    cart_copy.products.push(product)
    const updated_cart = CartDAO.update(Number(id), cart_copy)

    return res.status(200).send({response: "success", data: updated_cart})
  } catch (error) {
    return res.status(500).send({response: "error", data: "Se produjo un error al agregar el producto: " + error})
  }
  
})

// LISTAR PRODUCTOS DE UN CARRITO
cartRouter.get('/:id/products', async (req, res) => {
  if (!req.params.id){
    return res.status(401).send({response: "error", data: 'No hay un carrito seleccionado'})
  }
  const {id} = req.params
  const data = await CartDAO.getOnlyOne(Number(id))
  return res.status(200).send({data: data})
})

// ELIMINAR UN CARRITO Y SUS PRODUCTOS 
cartRouter.delete('/:id', async (req, res) => {
  if (!req.params.id){
    return res.status(401).send({response: "error", data: 'No encotramos el carrito seleccionado'})
  }

  try {
    const {id} = req.params
    const data = await CartDAO.delete(Number(id))
    return res.status(200).send({response: "success", data: data})
  } catch (error) {
    return res.status(500).send({response: "error", data: error})
  }
})

// ELIMINAR UN PRODUCTO DEL CARRITO
cartRouter.put('/:id/products/:id_product', async (req, res) => {
  const {id} = req.params
  const {id_product} = req.params

  if (!id || !id_product) {
    return res.status(401).send({response: "error", data: "No se recibieron todos los datos necesatios"})
  }

  const cart = await CartDAO.getOnlyOne(Number(id))
  if (!cart) { return res.status(401).send({response: "error", data: "El carrito no existe"}) }

  try {
    let cart_copy = cart.reduce((a, b) => Object.assign(a, b), {})
    const objIndex = cart_copy.products.findIndex((obj => obj[0].id === Number(id_product)))
    cart_copy.products.splice(objIndex, 1)
    const newProducts = {...cart_copy}
    const response = await CartDAO.update(Number(id), newProducts)
    return res.status(200).send({response: "success", data: response})
  } catch (error) {
    return res.status(500).send({response: "error", data: "Error al eliminar el producto: " + error})
  }
})

export default cartRouter