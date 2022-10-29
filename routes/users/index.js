import express from "express";

const usersRouter = express.Router()

usersRouter.get('/:id?', (req, res) => {
  if (req.params.id){
    return res.status(200).send('Un usuario')
  }
  return res.status(200).send('Listado de usuarios')
})

usersRouter.post('/', (req, res) => {
  return res.status(200).send('Usuario creado')
})

usersRouter.post('/delete/:id', (req, res) => {
  return res.status(200).send('Usuario eliminado')
})

usersRouter.post('/update/:id', (req, res) => {
  return res.status(200).send('Usuario actualizado')
})

export default usersRouter