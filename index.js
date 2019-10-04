const express = require("express")
const cors = require("cors")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = require('./src/typeDefs/index')
const resolvers = require('./src/resolvers/index')
const isAuth = require('./src/middlewares/isAuth')
const auth=require('./src/controllers/auth')

const PORT=process.env.PORT||4000

mongoose.connect("mongodb://sanjay:sanjay123@ds331198.mlab.com:31198/chutter",{useNewUrlParser:true})
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})

const app = express()

app.use(cors())

app.use(bodyParser.json());

app.post('/login', auth.login_handler)

app.post('/signup', auth.signup_handler)

//use isAuth as middleware for authentikeshan

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({app, path:"/graphql"})

app.listen(PORT,() => {
    console.log(`🚀  Server ready at ${PORT}`);
});