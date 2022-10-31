import fs from "fs";

export default class CartModel {
  constructor() {
    this.file = "./models/cart.db.json"
  }

  createCart = async () => {
    try {
      const fileContent = await fs.promises.readFile(this.file, 'utf-8')
      let contentParsed = JSON.parse(fileContent)
      const fecha = new Intl.DateTimeFormat('es-AR').format(Date.now())
      const newCart = {...cart, id: contentParsed.length + 1, timestamp: fecha, products: []}
      fileContent.push({...newCart})
      return newCart
    } catch (error) {
      return {'response': 'error: ' + error}
    }

  }

  addProduct = async (product_id, id) => {
    if (!id){
      const cart = await this.createCart()
      id = cart.id
    }
    try {
      const fileContent = await fs.promises.readFile(this.file, 'utf-8')
      let contentParsed = JSON.parse(fileContent)
      const fecha = new Intl.DateTimeFormat('es-AR').format(Date.now())
      contentParsed.map(e => {
        if (e.id === id) {
          e.products.push({...cart, timestamp: fecha})
        }
      })
      console.log(contentParsed)
      await fs.promises.writeFile(this.file, JSON.stringify(contentParsed, 'utf-8'))
      return {response: 'success'}
    } catch (error) {
      return {'response': 'error: ' + error}
    }
  }
}