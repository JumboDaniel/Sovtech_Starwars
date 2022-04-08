const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const{typeDefs, resolvers}= require('./schema')
const cors = require('cors');
const app = express()

//allow cross origin
app.use(cors())

const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.start().then(res => {
    server.applyMiddleware({ app });
    app.listen({ port: 5000 }, () =>
        console.log('Now browse to http://localhost:5000' + server.graphqlPath)
    )
   })