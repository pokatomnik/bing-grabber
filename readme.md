A simple js library that fetches bing search results using dirty-way (directly from html)
------------------------------------------------------------------------
![dependencies](https://david-dm.org/pokatomnik/bing-grabber.svg)
[![Coverage Status](https://coveralls.io/repos/pokatomnik/bing-grabber/badge.svg?branch=master)](https://coveralls.io/r/pokatomnik/bing-grabber?branch=master)

**Installation**

`npm install bing-grabber`

**Tests**

`npm test`

**Just show me how it works!**

Fetch some pages:

    var grabber = require('bing-grabber');
    grabber.getPages({
	    query: 'Bing grabber',
	    pagesAmount: 2, // how many pages to fetch
	    selector: 'li.b_algo > h2 > a' // Default selector. Works for now. Optional field.
	})
		.then(console.log) // An array of arrays (pages) of results. Each item in array contains 'href' and 'text' fields
		.catch(console.error)
  
  Fetch single page:
  

    grabber.getOnePage({
	    query: 'Bing grabber',
	    pageNumber: 2
    })
	    .then(console.log) // An array of results from page
	    .catch(console.error)
	    
  Full available parameters list:
  * query: string to search
  * pagesAmount - only for getPages - how many pages to fetch
  * pageNumber - only for getOnePage - which page to fetch
  * selector - selector used to find results from bing search page
  * requestParams - params for then-request (see https://www.npmjs.com/package/then-request)

Please note, this library uses https://www.bing.com to fetch all results. So please, do bot abuse.
Actually, bing does not protect its search results and you may not see any captcha challenges or block pages.
Have fun!