/**
 * Created by Danilian on 17.03.2017.
 */
'use strict';

var request = require('then-request');
var queryBuilder = require('./query-builder.js');
var Promise = require('bluebird');
var cheerio = require('cheerio');
var _ = require('lodash');
var defaultOnePageParams = {
  pageNumber: 1,
  selector: 'li.b_algo > h2 > a',
  type: 'web'
};
/*
 Available parameters:
 query (required) - what to search
 pageNumber (default 1) - what page to fetch
 selector (default 'li.b_algo > h2 > a')
 */
function getOnePage(p) {
  return new Promise(function (resolve, reject) {

    var params = _.assign(_.cloneDeep(defaultOnePageParams), _.cloneDeep(p));
    if (!params.query) {
      reject(new Error('Nothing to search'));
    }
    var pageNumber = (params.pageNumber-1) * 10 + 1;

    request('GET', queryBuilder({
      query: params.query,
      pageNumber: pageNumber
    }), params.requestParams || {})
      .then(function (response) {
        var
          $,
          body,
          responseNodes,
          results;

        if (response.statusCode !== 200) {
          return reject(new Error('Invalid http response'));
        }

        body = response.getBody();
        $ = cheerio.load(body.toString());

        responseNodes = $(params.selector);
        results = [];
        responseNodes.each(function (i, elem) {
          results.push({
            href: elem.attribs.href,
            text: $(this).text()
          });
        });
        resolve(results);
      })
      .catch(reject);
  });
}

module.exports = getOnePage;