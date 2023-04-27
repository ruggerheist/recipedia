// tried linking the search field to the url. no errors but its not logging or searching

//this async function with try and catch was specific to this api and wouldnt work with standard fetch
const searchButton = document.getElementById('search-button');

async function renderSearch(event) {
    event.preventDefault();
    const searchElement = document.createElement('ul');
    const searchResults = document.createElement('li');
    const recipeElement = document.querySelector('#ingredient-section');
    const ingredientElement = document.createElement('ul');
    const directionList = document.createElement('ol');
    const directions = document.createElement('li');
    const savedSearches = document.createElement('div');

    
    console.log('hello');

    let search = document.getElementById('search-input').value;
    console.log(search);

    const recipeSearch = `https://tasty.p.rapidapi.com/recipes/list?from=0&size20&q=${search}`
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
        try { //api call pulling recipe name, instructions and ingredients
            const response = await fetch(recipeSearch, options);
            const result = await response.json();
            console.log(result);
            var recipeCard = document.querySelector('.recipe-name'); // this needs getElement or querySelector
            recipeCard.innerHTML = '';
            for (var i = 0; i < 5; i++) {
                console.log(result.results[i].name);
                var recipeName = result.results[i].name;
                var recipeInstructions = result.results[i].instructions;
                recipeCard = document.querySelector('.recipe-name'); // this needs getElement or querySelector
                var recipeTitleTag = document.createElement('h2');
                recipeTitleTag.textContent = recipeName;
                recipeCard.appendChild(recipeTitleTag);
                for (var j = 0; j < result.results[i].instructions.length; j++) {
                    console.log(result.results[i].instructions[j].display_text);
                    var ingredients = result.results[i].sections[0].components[j];
                    console.log(ingredients); //console log only displaying 1 recipe undefined in console
                    var instructionsList = recipeInstructions[j].display_text;
                    var instructionsListCard = document.createElement('li');
                    instructionsListCard.textContent = instructionsList;
                    recipeElement.appendChild(instructionsListCard);
                    for (var k = 0; k < result.results[i].sections[0].components[k].length; k++){
                        console.log(result.results[i].sections[0].components[k]);
                        var ingredientListCard = result.results[i].sections[0].components[k];
                        ingredientListCard = document.createElement('li');
                        ingredientListCard.textContent = ingredientElement.appendChild(ingredientListCard);
                    }

                }

            }
        } catch (error) {
            console.error(error);
        }
    //}

    //fetchFunction();

}
searchButton.addEventListener('click', renderSearch);