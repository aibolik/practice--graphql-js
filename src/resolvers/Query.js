function feed(root, args, context, info) {
  return context.db.query.links({}, info)
}

function link(root, { id }, context, info) {
  return context.db.query.link({ where: { id } }, info)
}

module.exports = {
  feed,
  link
}