import fs from 'fs';

export default class ProductModel {
  constructor() {
    this.file = "./models/products.db.json"
  }

  createProduct = async (product) => {
    try {
      const fileContent = await fs.promises.readFile(this.file, 'utf-8')
      let contentParsed = JSON.parse(fileContent)
      const fecha = new Intl.DateTimeFormat('es-AR').format(Date.now())
      const newProduct = {...product, id: contentParsed.length + 1, timestamp: fecha}
      contentParsed.push(newProduct)
      console.log(contentParsed)
      await fs.promises.writeFile(this.file, JSON.stringify(contentParsed, 'utf-8'))
      return {response: 'success'}
    } catch (error) {
      return {'response': 'error: ' + error}
    }
  }

  getAllProducts = async () => {
    try {
        const file = await fs.promises.readFile(this.file, 'utf-8')
        return JSON.parse(file)
    } catch (error) {
        throw new Error(`Error reading file ${error}`)
    }
  }

  getOneProduct = async (id) => {
    console.log(id)
    const products = await this.getAllProducts()
    console.log("Todos los productos: ", products)
    const filteredProduct = products.filter(e => e.id === id)
    console.log("Producto: ", filteredProduct)
    return filteredProduct
  }

  deleteProduct = async (id) => {
    const products = await this.getAllProducts()
    const filteredProduct = products.filter(e => e.id != id)
    await fs.promises.writeFile(this.file, JSON.stringify(filteredProduct),'utf-8')
    return {response: "success"}
  }

  updateProduct = async (id, product) => {
    console.log(product)
    const products = await this.getAllProducts()
    const objIndex = products.findIndex((obj => obj.id == id))
    products[objIndex] = {...product, id: Number(id)}

    // console.log(products)
    await fs.promises.writeFile(this.file, JSON.stringify(products),'utf-8')
    return {response: "success"}
  }
}