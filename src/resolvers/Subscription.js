function newLinkSubscribe(parent, args, context, info) {
  console.log('debug:context.db:', context.db)
  console.log('debug:context.db.subscription', context.db.subscription)
  console.log('debug:context.db.subscription.link', context.db.subscription.link)
  return context.db.subscription.link(
    { where: { mutation_in: ['CREATED'] } },
    info,
  )
}

const newLink = {
  subscribe: newLinkSubscribe
}

module.exports = {
  newLink
}