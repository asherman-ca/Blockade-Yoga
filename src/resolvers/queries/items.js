const { forwardTo } = require('prisma-binding');

const itemQueries = {
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db')
}

module.exports = itemQueries;