const mutations = {
  async signup(parent, args, ctx, info) {
    // in case people cap their emails
    args.email = args.email.toLowerCase();
    // hash their password
    const password = await bcrypt.hash(args.password, 10);
    // create user
    const initialPermissions = args.email === 'admin@admin.com' ? ['USER', 'ADMIN'] : ['USER']
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: initialPermissions }
      }
    }, info);
    // create jwt for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set the JWT as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    // return user to browser
    return user;
  },
};

module.exports = mutations;
