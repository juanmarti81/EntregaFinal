import { fs } from 'fs';

class ProductModel {
  constructor() {
    this.file = "products.db.json"
  }

  createProduct = async (product) => {
    try {
      const fileContent = await fs.promises.readFile(this.file, 'utf-8').json()
      const newProduct = {...product, id: fileContent.length + 1}
      fileContent.push(newProduct)
      await fs.promises.writeFile(this.file, JSON.stringify(fileContent, 'utf-8'))
    } catch (error) {
      throw new Error(`Error al escribir el archivo: ${error}`)
    }
  }

  getAllProducts = async () => {
    try {
        const file = await fs.promises.readFile(this.name, 'utf-8')
        return JSON.parse(file)
    } catch (error) {
        throw new Error(`Error reading file ${error}`)
    }
  }

  getOneProduct = async (id) => {
    const products = await this.getAllProducts()
    const filteredProduct = products.filter(e => e.id === Number)
    return filteredProduct
  }

  deleteProduct = async (id) => {
    const products = await this.getAllProducts()
    const filteredProduct = products.filter(e => e.id != Number)
    await fs.promises.writeFile(this.file, JSON.stringify(filteredProduct),'utf-8')
    return filteredProduct
  }

  updateProduct = async (product) => {}
}