import express from 'express'
import productRouter from './routes/products/index.js'
import cartRouter from './routes/cart/index.js'
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
app.use('/products', productRouter)
app.use('/cart', cartRouter)


// SERVER START
const PORT = process.env.PORT || 3001
const server = app.listen(PORT, () => console.log('Server is runinng on PORT', PORT))
server.on('error', err => console.log('Error: ', err))