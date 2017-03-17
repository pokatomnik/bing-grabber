/**
 * Created by Danilian on 17.03.2017.
 */
'use strict';

var Promise = require('bluebird');
var cheerio = require('cheerio');
var _ = require('lodash');
var getOnePage = require('./get-one-page');

var defaultMultiplePagesParams = {
  pagesAmount: 1,
  selector: 'li.b_algo > h2 > a',
  type: 'web'
}

/*
 Available parameters:
 query (required) - what to search
 pagesAmount (default 1) - how many pages to fetch
 selector (default 'li.b_algo > h2 > a')
 */
function getPages(p) {
  var params = _.assign(_.cloneDeep(defaultMultiplePagesParams), _.cloneDeep(p));
  if (!params.query) { return Promise.reject(new Error('Nothing to search')); }
  var asyncValues = [];
  for (var i=1; i<=params.pagesAmount; i++) {
    asyncValues.push({
      query: params.query,
      pageNumber: i,
      selector: params.selector,
      requestParams: params.requestParams
    });
  }

  return Promise.mapSeries(asyncValues, function (p) {
    return getOnePage(p);
  });
}

module.exports = getPages;