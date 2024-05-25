const porta = 3003

const express = require('express')
const app = express()
const bd = require('./bd')

app.use(express.json()); 
app.use(express.urlencoded(
{extended: true}));

app.use( (req, res, next) => {
  console.log('middleware 1...')
  next()
}) //qualquer request nessa porta vai ter essa resposta

app.get('/produtos', (req, res) => {
  res.send({nome: 'Notebook', preco: 123.4})
})

app.get('/produtos', (req, res) => {
  res.send(bd.getProdutos())
})

app.get('/produtos/:id', (req, res) => {
  res.send(bd.getProduto(req.params.id))
})

app.post('/produtos/:id', (req, res, next) => {
  res.send(bd.getProduto(req.params.id))
  const produto = bd.salvarProduto({
    nome: req.body.name, 
    preco: req.body.preco,
  })
    res.send(produto)

})

app.put('/produtos/:id', (req, res, next) => {
  res.send(bd.getProduto(req.params.id))
  const produto = bd.salvarProduto({
    nome: req.body.name, 
    preco: req.body.preco,
  })
    res.send(produto)

})


app.listen(porta, () => {
  console.log(`server está executando na porta ${porta}`)
})
