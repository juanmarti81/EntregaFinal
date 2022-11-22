import express from 'express'
import productRouter from './routes/products/index.js'
import cartRouter from './routes/cart/index.js'
import productMongoRouter from './routes/products/index_Mongo.js'
import cartMongoRouter from './routes/cart/index_Mongo.js'
import productFirebaseRouter from './routes/products/index_Firebase.js'
import cors from 'cors'

const app = express()

const options = {
  origin: '*'
}

// EXPRESS IMPORTS
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(options))

// ROUTES
// FILESYSTEM ROUTES
app.use('/products', productRouter)
app.use('/cart', cartRouter)
// MONGO ROUTES
app.use('/mongoproducts', productMongoRouter)
app.use('/mongocarts', cartMongoRouter)
// FIREBASE ROUTES
app.use('/firebaseproducts', productFirebaseRouter)


// SERVER START
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => console.log('Server is runinng on PORT', PORT))
server.on('error', err => console.log('Error: ', err))