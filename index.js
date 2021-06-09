const express = require ('express')
const mongoose = require ('mongoose')
const url = 'mongodb://localhost/users'
const app = express()

mongoose.connect(url, { useNewUrlParser:true })
const con = mongoose.connection
con.on('open', () => {
    console.log('Connected...')
})

app.use(express.json())

const usersRouter = require('./routers/users')
app.use('/users', usersRouter)
app.listen(9000, () => {
    console.log('Server started!')
})