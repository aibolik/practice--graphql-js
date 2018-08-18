const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    info: () => `This is the API of Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
    // TODO: update implementation
    link: (root, args) => {
      let { id } = args
      let link = links.find((link) => link.id === id)
      return link
    }
  },
  Mutation: {
    post: (root, args, context, info) => {
      return context.db.mutation.createLink({
        data: {
          url: args.url,
          description: args.description
        }
      }, info)
    },
    // TODO: update implementation
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
    // TODO: update implementation
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
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'https://eu1.prisma.sh/aibol-kussain-535939/practice--graphql-js/dev',
      secret: 'practicegraphqlJS',
      debug: true
    })
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))