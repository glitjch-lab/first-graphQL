const { ApolloServer } = require('apollo-server');

// schema
const typeDefs = `
  type Query {
    info: String!
  }
`

// implementation of schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`
  }
}

// bundling schema and implementation here, in server! 
const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server
  .listen()
    .then(({ url }) => 
      console.log(`Server is running on ${url}`)
    );