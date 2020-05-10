var Crawler = require("crawler");
var crawler = new Crawler();
const cheerio = require('cheerio');
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

crawler.direct({
    uri: 'https://www.sccgov.org/sites/covid19/Pages/dashboard.aspx',
    skipEventRequest: false, // default to true, direct requests won't trigger Event:'request'
    callback: function(error, response) {
        if(error) {
            console.log(error)
        } else {
            html = response.body;
            const $ = cheerio.load(html);
            let cities = []; 
            let numbers = []; 
		

	    $('th[class=tg-vfn0]').each((i, elem) => {
		cities.push(elem.firstChild.data);
	    } );
	    $('td[class=tg-kftd]').each((i, elem) => {
		cities.push(elem.firstChild.data);
	    } );
	    $('td[class=tg-0lax]').each((i, elem) => {
		numbers.push(elem.firstChild.data);
	    } );
//		console.log(cities, numbers);
		let result = {};
		cities.forEach((elem, i) =>{
			result[elem] = numbers[i];
		});
		console.log(today);
		console.log(result);
        }
    }
});
