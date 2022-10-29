import { express } from 'express'

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))



const server = app.listen(PORT, () => console.log('Server is runinng on PORT', PORT))
server.on('error', err => console.log('Error: ', err))