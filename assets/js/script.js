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
    for (let i = 0; i < maxResults; i++) { 
        let recipeButton = document.createElement('button');
        recipeButton.innerHTML = recipes[i].title;
        recipeButton.id += `recipe-btn-${i}`;
        recipeButton.className += 'r-btn';
        recipeButton.addEventListener('click', function (){
            let id = recipeButton.id.split('-')[2];
            renderIngredients(recipes[id])});
        searchResults.appendChild(recipeButton);        
    }    
};

function renderIngredients(recipe){
    ingredientSection.innerHTML = '';    
    let ingredients = recipe.ingredients.split('|');
    ingredients.forEach(ingredient => {    
        let ingredientListItem = document.createElement('li');
        ingredientListItem.textContent = ingredient;
        ingredientSection.appendChild(ingredientListItem);
    })    
    renderInstructions(recipe);
};

function renderInstructions(recipe){
    let instructions = recipe.instructions;    
    instructionSection.innerHTML = instructions;
};

//TO DO:
//style recipe buttons so the one that is clicked is highlighted in some way for the user to know what recipe theyre on
//link ingredients return to the nutrition api
//add local storage
//add readme
//style page
// Defining the API URL and headers
let nutritionListItem = document.querySelector('.nutrition-list-item');

async function returnNutrition(ingredientString) {
    const url = `https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${ingredientString}`;
    console.log(url);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'effefb22a0mshedad0fade81d69ep1bd3e5jsn76027a95a97b',
            'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        renderNutrition(result);
    } catch (error) {
        console.error(error);
    }
};
        function renderNutrition(result) {
            for (let i = 0; i < result.length; i++) {
              let currentFood = result[i];
              console.log(currentFood);
              console.log(currentFood.name);
              console.log(currentFood.calories);
              console.log(currentFood.carbohydrates_total_g);
              console.log(currentFood.cholesterol_mg);
              console.log(currentFood.fat_saturated_g);
              console.log(currentFood.fat_total_g);
              console.log(currentFood.sugar_g);
              console.log(currentFood.serving_size_g);
              console.log(currentFood.sodium_mg);
              console.log(currentFood.protein_g);
              console.log(currentFood.fiber_g);
              console.log(currentFood.potassium_mg);
          
              