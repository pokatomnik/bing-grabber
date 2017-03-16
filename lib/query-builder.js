'use strict';

const qs = require('querystring');

function queryBuilder(params) {
  return 'https://www.bing.com/search?q=' +
    qs.escape(params.query) +
    '&first=' +
    params.pageNumber;
}

module.exports = queryBuilder;