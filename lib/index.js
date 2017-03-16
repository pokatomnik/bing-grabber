'use strict';

var request = require('then-request');
var queryBuilder = require('./query-builder.js');
var Promise = require('bluebird');
var cheerio = require('cheerio');

function getOnePage(query, pageNumber, selectorString) {
  var selector = selectorString !== undefined ? selectorString : 'li.b_algo > h2 > a';
  var from = (pageNumber-1) * 10 + 1;
  return new Promise(function (resolve, reject) {
    request('GET', queryBuilder({
      query: query,
      from: from
    }), {})
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

        $ = cheerio.load(body);

        responseNodes = $(selector);
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

function getPages(query, pagesAmount, selectorString) {
  var selector = selectorString !== undefined ? selectorString : 'li.b_algo > h2 > a';
  var asyncValues = [];
  for (var i=1; i<=pagesAmount; i++) {
    asyncValues.push([query, i, selectorString]);
  }
  return Promise.mapSeries(asyncValues, function (args) {
    return getOnePage.apply(null, args);
  });
}

module.exports = {
  getOnePage: getOnePage,
  getPages: getPages
}