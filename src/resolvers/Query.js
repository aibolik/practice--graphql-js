async function feed(root, { filter, first, skip, orderBy }, context, info) {
  const where = filter 
    ? {
      OR: [
        { url_contains: filter },
        { description_contains: filter }
      ]
    }
    : {}

  const queriedLinks = await context.db.query.links(
    { where, first, skip, orderBy }, `{ id }`
  )

  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `

  const linksConnections = await context.db.query.linksConnection({}, countSelectionSet)

  return {
    count: linksConnections.aggregate.count,
    linkIds: queriedLinks.map(link => link.id)
  }
}

function link(root, { id }, context, info) {
  return context.db.query.link({ where: { id } }, info)
}

module.exports = {
  feed,
  link
}