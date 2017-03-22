/**
 * Created by Danilian on 22.03.2017.
 */

'use strict';

var assert = require('assert');
var test = require('testit');
var mockRequire = require('mock-require');
var _ = require('lodash');

test('./lib/query-builder.js', function () {
  var queryBuilder = require('../lib/query-builder.js');
  test('Simple query', function () {
    assert(queryBuilder({
      query: 'hello, world',
      pageNumber: 1
    }) === 'https://www.bing.com/search?q=hello%2C%20world&first=1');
  });
  test('With non-latin symbols', function () {
    assert(queryBuilder({
        query: 'привет, мир',
        pageNumber: 1
      }) === 'https://www.bing.com/search?q=%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82%2C%20%D0%BC%D0%B8%D1%80&first=1');
  });
});

test('./lib/get-one-page.js', function () {
  test('Simple query', function (done) {
    mockRequire('then-request', require('./dummy-request').successful);
    var getOnePage = mockRequire.reRequire('../lib/get-one-page');
    getOnePage({
      query: 'hello, world!',
      pageNumber: 2
    })
      .then(function (result) {
        assert(result.length === 3);
        assert(result[0].href === 'http://example.com/1');
        assert(result[1].href === 'http://example.com/2');
        assert(result[2].href === 'http://example.com/3');
        assert(result[0].text === 'First link');
        assert(result[1].text === 'Second link');
        assert(result[2].text === 'Third link');
        mockRequire.stop('then-request');
        done();
      })
      .catch(function () {
        mockRequire.stop('then-request');
        done(new Error('Not ok!'));
      });
  });

  test('Query is undefined', function (done) {
    mockRequire('then-request', require('./dummy-request').failed);
    var getOnePage = mockRequire.reRequire('../lib/get-one-page');
    getOnePage({
      pageNumber: 42
    })
      .then(function () {
        mockRequire.stop('then-request');
        done(new Error('Must be failed here!'));
      })
      .catch(function (error) {
        assert(_.isEqual(error, new Error('Nothing to search')));
        mockRequire.stop('then-request');
        done();
      });
  });
});

test('./lib/get-pages.js', function () {
  test('Two pages from search', function (done) {
    mockRequire('../lib/get-one-page.js', require('./dummy-request').getMultiplePagesSuccess);
    var getPages = mockRequire.reRequire('../lib/get-pages.js');
    getPages({
      query: 'hello, world!',
      pagesAmount: 2
    })
      .then(function (result) {
        assert(result.length === 2);
        assert(result[0].length === 3);
        assert(result[1].length === 3);
        mockRequire.stop('then-request');
        done();
      })
      .catch(function () {
        mockRequire.stop('then-request');
        done(new Error('Not ok!'))
      });
  });

  test('Multiple pages without query', function (done) {
    var getPages = require('../lib/get-pages');
    getPages({
      pagesAmount: 42
    })
      .then(function () {
        done(new Error('Must be failed here!'));
      })
      .catch(function (error) {
        assert(_.isEqual(error, new Error('Nothing to search')));
        done();
      });
  });
});