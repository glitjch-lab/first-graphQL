const { ApolloServer } = require('apollo-server');


let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

// implementation of schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },
  Mutation: {

    createLink: (parent, args) => {

      let idCount = links.length;

        const link = {
          id: `link-${idCount++}`,
          description: args.description,
          url: args.url,
        }
        links.push(link)
        return link
    },

    updateLink: (parent, args) => {
      const updatedLink = {
        id: args.id,
        url: args.url,
        description: args.description,
      };
      links.forEach(link => {
        if (link.id === updatedLink.id) {
          link.url = updatedLink.url
          link.description = updatedLink.description
        } 
      })
      return updatedLink;
    },

    deleteLink: (parent, args) => {
      const updated = links.filter(link => {
        link.id !== args.id
      })
      links.length = 0;
      links.push(updated);
      return links;
    },
  },
}


// bundling schema and implementation here, in server! 

const fs = require('fs');
const path = require('path');


const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf-8'
  ),
  resolvers,
})

server
  .listen()
    .then(({ url }) => 
      console.log(`Server is running on ${url}`)
    );