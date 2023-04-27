// tried linking the search field to the url. no errors but its not logging or searching

//this async function with try and catch was specific to this api and wouldnt work with standard fetch



function renderSearch(ingredients, instructions) {
const searchElement = document.createElement('ul');
const searchResults = document.createElement('li');
const recipeElement = document.querySelector('#ingredient-section');
const ingredientList = document.createElement('li');
const directionList = document.createElement('ol');
const directions = document.createElement('li');
const savedSearches = document.createElement('div');


let search = document.getElementById('search-field').value;
console.log(search);
    
const recipeSearch = `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${search}`
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
        "content-type": "application/json",
        "date": "Fri, 18 Feb 2022 07:08:16 GMT",
        "server": "RapidAPI-1.2.8",
        "transfer-encoding": "chunked",
        "x-rapidapi-region": "AWS - ap-southeast-1",
        "x-rapidapi-version": "1.2.8"
	}
};
async function fetchFunction(){
    try {
        const response = await fetch(recipeSearch, options);
        const result = await response.json();
        console.log(result);
        for (var i = 0; i < 5; i++){
            console.log(result.results[i].name);
            var recipeName = result.results[i].name;
            var recipeInstructions = result.results[i].instructions;
            var recipeCard = document.createElement('div');
            var recipeTitleTag = document.createElement('h2');
            recipeTitleTag.textContent = recipeName;
            recipeCard.appendChild(recipeTitleTag);
            for (var j = 0; j < result.results[i].instructions.length; j++){
                console.log(result.results[i].instructions[j].display_text);
                var instructionsList = recipeInstructions[j].display_text;
                var instructionsListCard = document.createElement('li');
                instructionsListCard.textContent = instructionsList;
                recipeElement.appendChild(instructionsListCard);               
            
            }
                
        }
    } catch (error) {
        console.error(error);
    }
    }
    search.addEventListener('submit', renderSearch())
    fetchFunction();

}