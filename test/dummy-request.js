/**
 * Created by Danilian on 22.03.2017.
 */

'use strict';

var Promise = require('bluebird');

function successfullDummyRequest(method, url, params) {
  return Promise.resolve({
    body: '<ul>' +
      '<li class="b_algo"><h2><a href="http://example.com/1">First link</a></h2></li>' +
      '<li class="b_algo"><h2><a href="http://example.com/2">Second link</a></h2></li>' +
      '<li class="b_algo"><h2><a href="http://example.com/3">Third link</a></h2></li>' +
    '</ul>',
    getBody: function () {
      return this.body;
    },
    statusCode: 200
  });
}

function failedDummyRequest(method, url, params) {
  return Promise.resolve({
    body: '',
    getBody: function () {
      return this.body;
    },
    statusCode: 400
  });
}

function getMultiplePagesSuccess(params) {
  if (params.pageNumber === 1) {
    return Promise.resolve([{
      href: 'http://example.com/1',
      text: 'First link (page 1)'
    }, {
      href: 'http://example.com/2',
      text: 'Second link (page 1)'
    }, {
      href: 'http://example.com/3',
      text: 'Third link (page 1)'
    }]);
  } else if (params.pageNumber === 2) {
    return Promise.resolve([{
      href: 'http://example.com/4',
      text: 'First link (page 2)'
    }, {
      href: 'http://example.com/5',
      text: 'Second link (page 2)'
    }, {
      href: 'http://example.com/6',
      text: 'Third link (page 2)'
    }]);
  }
}

module.exports = {
  successful: successfullDummyRequest,
  failed: failedDummyRequest,
  getMultiplePagesSuccess: getMultiplePagesSuccess
};