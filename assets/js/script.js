const searchButton = document.getElementById('search-button');
let instructionSection = document.querySelector('#instructions-section');
let ingredientSection = document.getElementById('ingredient-section');
let searchResults = document.querySelector('.search-results'); //change to id in html
//const recipes = [];

searchButton.addEventListener('click', performSearch);


async function performSearch(event) {
    event.preventDefault();
    /* const searchElement = document.createElement('ul');
    const searchResults = document.createElement('li');   
    /* const instructionsElement = document.createElement('ol');
    const directions = document.createElement('li');
    const savedSearches = document.createElement('div'); */

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
            const recipes = await response.json();
            console.log(recipes);
            renderRecipeButtons(recipes);
        } catch (error) {
            console.error(error);
        }
};

 function renderRecipeButtons(recipes) {
    searchResults.innerHTML = '';
    for (var i = 0; i < 5; i++) {
        console.log(recipes[i].title);  
        let recipeButton = document.createElement('button');
        recipeButton.innerHTML = recipes[i].title;
        recipeButton.className += 'recipe-btn';
        recipeButton.addEventListener('click', renderIngredients(recipes[i]));
        searchResults.appendChild(recipeButton);        
    }    
};

function renderIngredients(recipe){
    ingredientSection.innerHTML = '';    
    var ingredients = recipe.ingredients.split('|');
    console.log(ingredients);
    ingredients.forEach(ingredient => {    
        var ingredientListItem = document.createElement('li');
        ingredientListItem.textContent = ingredient;
        ingredientSection.appendChild(ingredientListItem);
    })    
    renderInstructions(recipe);
};

function renderInstructions(recipe){
    instructionSection.innerHTML = '';
    var instructions = recipe.instructions.split('|');
    instructions.forEach(instruction => {
        var instructionsListItem = document.createElement('li');
        instructionsListItem.textContent = instruction;
        instructionElement.appendChild(instructionsListItem);               
    })
     
};