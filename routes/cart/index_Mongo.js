import express from "express";
import {cartsMongo} from "../../DAO/index.js"
import {productsMongo} from "../../DAO/index.js"

const cartMongoRouter = express.Router()

// CREAR UN CARRITO 
cartMongoRouter.post('/', async (req, res) => {
  try {
    const cart_format = {products: []}
    const cart = await cartsMongo.create(cart_format)
    return res.status(200).send({response: "success", data: cart.data})
  } catch (error) {
    return res.status(500).send({response: "error", data:"Error al crear el carrito: " + error})
  }
})

// AGREGAR PRODUCTO A UN CARRITO
cartMongoRouter.post("/:id/products", async (req, res) => {
  console.log(req.body.productId)
  console.log(req.params.id)
  const {productId} = req.body
  const {id} = req.params

  if (!productId || !id) { 
    return res.status(401).send({response: "error", data: "No se recibieron todos los datos."})
  }

  try {
    const cart = await cartsMongo.getCart(id)
    if (cart === null) { return res.status(401).send({response: "error", data: "El carrito no existe"}) }

    const product = await productsMongo.getOnlyOne(productId)
    if (product === null) { return res.status(401).send({response: "error", data: "El producto no existe"}) }

    const updated_cart = cartsMongo.insertProduct(id, productId)

    return res.status(200).send({response: "success", data: updated_cart.data})
  } catch (error) {
    return res.status(500).send({response: "error", data: "Se produjo un error al agregar el producto: " + error})
  }
  
})

// LISTAR PRODUCTOS DE UN CARRITO
cartMongoRouter.get('/:id/products', async (req, res) => {
  if (!req.params.id){
    return res.status(401).send({response: "error", data: 'No hay un carrito seleccionado'})
  }
  try {
    const {id} = req.params
    const cart = await cartsMongo.getCart(id)
    if (cart.response === 'error') { return res.status(401).send({response: "error", data: "El carrito no existe"}) }
    return res.status(200).send({response: "sucess", data: cart.data})
  } catch (error) {
    return res.status(500).send({response: "error", data: "Se produjo un error al recuperar el carrito: " + error})
  }
})

// ELIMINAR UN CARRITO Y SUS PRODUCTOS 
cartMongoRouter.delete('/:id', async (req, res) => {
  if (!req.params.id){
    return res.status(401).send({response: "error", data: 'No encotramos el carrito seleccionado'})
  }

  try {
    const {id} = req.params
    const cart = await cartsMongo.deleteCart(id)
    if (cart.response === 'error') { return res.status(401).send({response: "error", data: "El carrito no existe"}) }
    return res.status(200).send({response: "success", data: cart.data})
  } catch (error) {
    return res.status(500).send({response: "error", data: error})
  }
})

// ELIMINAR UN PRODUCTO DEL CARRITO
cartMongoRouter.put('/:id/products/:id_product', async (req, res) => {
  const {id} = req.params
  const {id_product} = req.params

  if (!id || !id_product) {
    return res.status(401).send({response: "error", data: "No se recibieron todos los datos necesatios"})
  }

  const cart = await cartsMongo.getCart(id)
  if (cart.data === null) { return res.status(401).send({response: "error", data: "El carrito no existe"}) }

  try {
    const response = await cartsMongo.deleteProduct(id, id_product)
    if (cart.response === 'error') { return res.status(401).send({response: "error", data: "El producto no existe"}) }
    return res.status(200).send({response: "success", data: response.data})
  } catch (error) {
    return res.status(500).send({response: "error", data: "Error al eliminar el producto: " + error})
  }
})

export default cartMongoRouter