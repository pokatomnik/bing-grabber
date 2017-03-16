'use strict';

function queryBuilder(params) {
  return 'https://www.bing.com/search?q=' + params.query + '&first=' + params.from;
}

module.exports = queryBuilder;