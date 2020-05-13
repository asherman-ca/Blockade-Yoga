const { hasPermission } = require('../../utils');

const userQueries = {
  me(parent, args, ctx, info) {
    if(!ctx.request.userId){
      return null;
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId }
    }, info);
  },
  async users (parent, args, ctx, info) {
    if(!ctx.request.userId){
      throw new Error('Please log in');
    };
    hasPermission(ctx.request.user, ['ADMIN', 'PERMISSIONUPDATE']);
    return ctx.db.query.users({}, info);
  },
}

module.exports = { userQueries }