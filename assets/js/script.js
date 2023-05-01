const searchButton = document.getElementById('search-button');
let instructionSection = document.querySelector('#instructions-section');
let ingredientSection = document.getElementById('ingredient-section');
let searchResults = document.querySelector('.search-results'); 
const maxResults = 10;

searchButton.addEventListener('click', performSearch);

async function performSearch(event) {
    event.preventDefault();
    let search = document.getElementById('search-input').value;
    const recipeSearch = `https://recipe-by-api-ninjas.p.rapidapi.com/v1/recipe?query=${search}&offset=${maxResults}`;
    const options = {
        method: 'GET',
        headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': 'effefb22a0mshedad0fade81d69ep1bd3e5jsn76027a95a97b',
            'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
        }
    };
        try { 
            const response = await fetch(recipeSearch, options);
            const recipes = await response.json();
            renderRecipeButtons(recipes);
        } catch (error) {
            console.error(error);
        }
};

function renderRecipeButtons(recipes) {
    searchResults.innerHTML = '';
    for (var i = 0; i < maxResults; i++) { 
        let recipeButton = document.createElement('button');
        recipeButton.innerHTML = recipes[i].title;
        recipeButton.id += `recipe-btn-${i}`;
        recipeButton.className += 'r-btn';
        recipeButton.addEventListener('click', function (){
            var id = recipeButton.id.split('-')[2];
            renderIngredients(recipes[id])});
        searchResults.appendChild(recipeButton);        
    }    
};

function renderIngredients(recipe){
    ingredientSection.innerHTML = '';    
    var ingredients = recipe.ingredients.split('|');
    ingredients.forEach(ingredient => {    
        var ingredientListItem = document.createElement('li');
        ingredientListItem.textContent = ingredient;
        ingredientSection.appendChild(ingredientListItem);
    })    
    renderInstructions(recipe);
};

function renderInstructions(recipe){
    var instructions = recipe.instructions;    
    instructionSection.innerHTML = instructions;
};

//TO DO:
//style recipe buttons so the one that is clicked is highlighted in some way for the user to know what recipe theyre on
//link ingredients return to the nutrition api
//add local storage
//add readme
//style page
