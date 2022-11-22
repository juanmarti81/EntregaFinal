import connect from "../DB/firebase/conn.js"

export default class ProductsFirebaseModel {
  db_firestore = ''
  constructor() {
    this.db_firestore = connect()
  }

  // CREATE A NEW RECORD IN DB
  create = async (product) => {
    try {
      let products = ""
      connect().then(db => {
        products = db.collection("products").add(product)
      })
      return {response: "success", data: products.data}
    }catch (error) {
      console.log(error)
      return {response: "error", data: error}
    }
  }

  // GET ALL PRODUCTS FROM DB
  getAll = async () => {
    try {
      // let products = ""
      const document = await connect()
      .then(db => {
        return db.collection("products").get()
      })
      console.log(document)
      const products = document.docs.map(doc =>{ return {...doc.data(), id:doc.id}} )
      return {response: "success", data: products}
    } catch (error) {
      return {response: "error", data: error}
    }
  }

  // GET ONLY ONE PRODUCT FROM DB
  getOnlyOne = async (id) => {
    try {
      // let product = ""
      const product = await connect()
      .then(db => {
        return db.collection("products").doc(id).get()
      })
      console.log(product)
      return {response: "success", data: product.data()}
    } catch (error) {
      return {response: "error", data: error}
    }
  }

  // DELETE A PRODUCT FROM DB
  delete = async (id) => {
    try {
      const data = await connect()
      .then(db => {
        return db.collection("products").doc(id).delete()
      })
      console.log(data)
      return {response: "success", data: data}
    } catch (error) {
      return {response: "error", data: error}
    }
  }

  // UPDATE A PRODUCT FROM DB
  updateProduct = async (id, product) => {
    try {
      const data = await connect()
      .then(db => {
        return db.collection("products").doc(id).update(product)
      })
      console.log(data)
      return {response: "success", data: data.data}
    } catch (error) {
      return {response: "error", data: error}
    }
  }

}