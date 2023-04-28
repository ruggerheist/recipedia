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

    let search = document.getElementById('search-input').value;
    console.log(search);

    const recipeSearch = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${search}`;
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': 'effefb22a0mshedad0fade81d69ep1bd3e5jsn76027a95a97b',
            'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
        }
    };
        try { //api call pulling recipe name, instructions and ingredients
            const response = await fetch(recipeSearch, options);
            const result = await response.json();
            console.log(result);
            var recipeCard = document.querySelector('.recipe-name'); // this needs getElement or querySelector
            recipeCard.innerHTML = '';
            for (var i = 0; i < 5; i++) {
                console.log(result[i].title);
                var recipeName = result[i].title;
                var recipeInstructions = result[i].instructions;
                recipeCard = document.querySelector('.recipe-name'); // this needs getElement or querySelector
                var recipeTitleTag = document.createElement('h2');
                var instructionsList = document.createElement('li');
                instructionsList.textContent = result[i].instructions;
                recipeElement.appendChild(instructionsList);
                recipeTitleTag.textContent = recipeName;
                recipeCard.appendChild(recipeTitleTag);
                var ingredients = result[i].ingredients;
                var ingredientListCard = result[i].ingredients;
                ingredientListCard = document.createElement('li');
                ingredientListCard.textContent = ingredients;
                ingredientElement.appendChild(ingredientListCard);
            }
        } catch (error) {
            console.error(error);
        }
    //}

    //fetchFunction();

}
searchButton.addEventListener('click', renderSearch);