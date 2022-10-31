import fs from 'fs';

export default class ProductModel {
  constructor(filename) {
    this.file = `./models/${filename}.db.json`
  }

  create = async (product) => {
    try {
      const fileContent = await this.getAll()
      const fecha = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString()
      const newProduct = {...product, id: fileContent.length + 1, timestamp: fecha}
      fileContent.push(newProduct)
      await fs.promises.writeFile(this.file, JSON.stringify(fileContent, 'utf-8'))
      return {newProduct}
    } catch (error) {
      return {response: 'error: ' + error}
    }
  }

  getAll = async () => {
    try {
        const file = await fs.promises.readFile(this.file, 'utf-8')
        return JSON.parse(file)
    } catch (error) {
        throw new Error(`Error reading file ${error}`)
    }
  }

  getOnlyOne = async (id) => {
    try {
      const products = await this.getAll()
      const filteredProduct = products.filter(e => e.id === id)
      return filteredProduct
    } catch (error) {
      return {response: error}
    }
    
  }

  delete = async (id) => {
    try {
      const products = await this.getAll()
      const filteredProduct = products.filter(e => e.id != id)
      await fs.promises.writeFile(this.file, JSON.stringify(filteredProduct),'utf-8')
      return {response: "success"}
    } catch (error) {
      return {response: error}
    }
    
  }

  update = async (id, product) => {
    try {
      const products = await this.getAll()
      const objIndex = products.findIndex((obj => obj.id === id))
      const foundProduct = products[objIndex];
      products[objIndex] = {...foundProduct, ...product}

      await fs.promises.writeFile(this.file, JSON.stringify(products),'utf-8')
      return {product}
    } catch (error) {
      return {response: error}
    }

  }

  updateProduct = async (id, product) => {
    console.log(id, product)
    try {
      const products = await this.getAll()
      const objIndex = products.findIndex((obj) => obj.id === Number(id))
      products[objIndex] = product
      await fs.promises.writeFile(this.file, JSON.stringify(products),'utf-8')
      return {product}
    } catch (error) {
      return {response: error}
    }

  }
}