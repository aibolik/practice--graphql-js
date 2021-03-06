const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

function post(root, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.createLink({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  }, info)
}

async function updateLink(root, { id, url, description }, context, info) {
  const userId = getUserId(context)
  const link = await context.db.query.link({ where: { id } }, ` { postedBy { id } } `)

  if (link.postedBy.id !== userId) {
    throw new Error('Current user is not author of this post')
  }

  return context.db.mutation.updateLink({
    data: {
      url,
      description
    },
    where: { id }
  }, info)
}

async function deleteLink(root, { id }, context, info) {
  const userId = getUserId(context)
  const link = await context.db.query.link({ where: { id } }, ` { postedBy { id } } `)

  if (link.postedBy.id !== userId) {
    throw new Error('Current user is not author of this post')
  }

  return context.db.mutation.deleteLink({
    where: { id },
  }, info)
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)

  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, `{ id }`)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

async function login(parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)

  if (!user) {
    throw new Error(`No such user found`)
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error(`Invalid password`)
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context)

  const linkExists = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: args.linkId }
  })
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }

  return context.db.mutation.createVote({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } }
    }
  }, info)
}

module.exports = {
  post,
  updateLink,
  deleteLink,
  signup,
  login,
  vote
}