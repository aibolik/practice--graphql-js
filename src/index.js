const { GraphQLServer } = require('graphql-yoga')

let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of Hackernews Clone`,
    feed: () => links,
    link: (root, args) => {
      let { id } = args
      let link = links.find((link) => link.id === id)
      return link
    }
  },
  Mutation: {
    post: (root, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link)
      return link
    },
    updateLink: (root, args) => {
      const { id, url, description } = args
      let linkIndex = links.findIndex(link => link.id === id)
      if (linkIndex === -1) {
        return null
      }
      links[linkIndex] = {
        ...links[linkIndex],
        url: url ? url : links[linkIndex].url,
        description: description ? description : links[linkIndex].description
      }

      return links[linkIndex]
    },
    deleteLink: (root, args) => {
      const { id } = args
      let linkIndex = links.findIndex(link => link.id === id)
      if (linkIndex === -1) {
        return null
      }
      let link = { ...links[linkIndex] };
      links.splice(linkIndex, 1);
      return link
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))