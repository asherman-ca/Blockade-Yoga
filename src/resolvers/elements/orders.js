const orderQueries = {
  async order(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to view order')
    }
    const order = await ctx.db.query.order({
      where: { id: args.id }
    }, info)
    const isOwner = order.user.id === ctx.request.userId
    const isElevated = ctx.request.user.permissions.includes('ADMIN')
    if (!isOwner && !isElevated) {
      throw new Error('Insufficient elevation')
    }
    return order
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request
    if (!userId) {
      throw new Error('Must be signed in to view orders')
    }
    return ctx.db.query.orders({
      where: { user: { id: userId}}
    }, info)
  }
}

module.exports = { orderQueries }