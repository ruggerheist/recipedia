const url = 'https://tasty.p.rapidapi.com/recipes/auto-complete?prefix=chicken%20soup';
const options = {
	method: 'GET',
	headers: {
		'content-type': 'application/octet-stream',
		'X-RapidAPI-Key': 'effefb22a0mshedad0fade81d69ep1bd3e5jsn76027a95a97b',
		'X-RapidAPI-Host': 'tasty.p.rapidapi.com',
        "access-control-allow-credentials": "true",
        "access-control-allow-headers": "ver",
        "access-control-allow-methods": "GET, POST",
        "access-control-allow-origin": "*",
        "connection": "keep-alive",
        "content-length": "276",
        "content-type": "application/json",
        "date": "Fri, 18 Feb 2022 07:08:04 GMT",
        "server": "RapidAPI-1.2.8",
        "x-rapidapi-region": "AWS - ap-southeast-1",
        "x-rapidapi-version": "1.2.8"
	}
};

var formElement = document.getElementById('search-field');
formElement.addEventListener('submit', function(event){
    event.preventDefault();

})

//this async function with try and catch was specific to this api and wouldnt work with standard fetch
async function fetchFunction(){
try {
	const response = await fetch(url, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}
}
fetchFunction();


function createPage(ingredients, instructions) {
// add ul and li for ingredients. ol and li directions
const ingredientElement = document.createElement('div');
const instructionElement = document.createElement('div');
const savedSearches = document.createElement('div');
}