const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const resolvers = {
  Query: {
    info: () => `This is the API of Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.db.query.links({}, info)
    },
    link: (root, { id }, context, info) => {
      return context.db.query.link({ where: { id } }, info)
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
    updateLink: (root, { id, url, description }, context, info) => {
      return context.db.mutation.updateLink({
        data: {
          url,
          description
        }, 
        where: { id }
      }, info)
    },
    deleteLink: (root, { id }, context, info) => {
      return context.db.mutation.deleteLink({
        where: { id },
      }, info)
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