import express from 'express'
import productRouter from './routes/products/index.js'
import cartRouter from './routes/cart/index.js'


const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/products/', productRouter)
app.use('/cart/', cartRouter)


const server = app.listen(PORT, () => console.log('Server is runinng on PORT', PORT))
server.on('error', err => console.log('Error: ', err))