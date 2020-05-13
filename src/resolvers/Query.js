const { itemQueries } = require('./elements/items');
const { userQueries } = require('./elements/users');
const { orderQueries } = require('./elements/orders');

const Query = {
  ...itemQueries,
  ...userQueries,
  ...orderQueries
};

module.exports = Query;
