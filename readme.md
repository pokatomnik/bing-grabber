A simple js library that fetches bing search results using dirty-way (directly from html)
------------------------------------------------------------------------
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