const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const{typeDefs, resolvers}= require('./schema')
const cors = require('cors');
const app = express()
const path = require('path');
require('dotenv').config()

//allow cross origin
app.use(cors())

// app.use(express.static(path.join(__dirname, 'public')));

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen(process.env.PORT || 5000, () =>
        console.log('Now browse to http://localhost:5000' + server.graphqlPath)
    )
   })
