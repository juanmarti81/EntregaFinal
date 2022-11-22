import admin from "firebase-admin"
import serviceAccount from "./config_firebase.json" assert { type: 'json' }

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const connect = async() => {
  try {
    const db_firestore = app.firestore()
    console.log("Conectado a Firebase")
    return db_firestore
  }catch (error) {
    console.log(error)
  }
}

export default connect