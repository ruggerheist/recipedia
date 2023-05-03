const searchButton = document.getElementById('search-button');
let instructionSection = document.querySelector('#instructions-section');
let ingredientSection = document.getElementById('ingredient-section');
let searchResults = document.querySelector('.search-results');
const maxResults = 10;
let ingredientString = '';
let nutritionSection = document.getElementById('nutrition-section');

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
    console.log(ingredients); 

    ingredientString = ingredients.join(' '); 
    returnNutrition();
    renderInstructions(recipe);
};
function renderInstructions(recipe){
    var instructions = recipe.instructions;    
    instructionSection.innerHTML = instructions;
    console.log(instructions);
};
//TO DO:
//style recipe buttons so the one that is clicked is highlighted in some way for the user to know what recipe theyre on
//link ingredients return to the nutrition api
//add local storage
//add readme
//style page
async function returnNutrition() {
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
 function renderNutrition(result){
    for (var i = 0; i < result.length; i++){
        let currentFood = result[i];
        console.log(result[i].name);
        console.log(result[i].calories);
        let nutritionList = document.createElement("div");
        nutritionList.setAttribute("class", "card-body");
        var ingredientName = result[i].name;
        ingredientName = document.createElement("h2");
        ingredientName.textContent = `${currentFood.name}`;
        nutritionSection.append(ingredientName);
        var ingredientCalories = result[i].calories;
        ingredientCalories = document.createElement("p");
        ingredientCalories.textContent = `calories: ${currentFood.calories}`;
        nutritionSection.append(ingredientCalories);
        var ingredientCarbs = result[i].carbohydrates_total_g;
        ingredientCarbs = document.createElement("p");
        ingredientCarbs.textContent = `carbs: ${currentFood.carbohydrates_total_g} g`;
        nutritionSection.append(ingredientCarbs);
        var ingredientCholesterol = result[i].cholesterol_mg;
        ingredientCholesterol = document.createElement("p");
        ingredientCholesterol.textContent = `cholesterol: ${currentFood.cholesterol_mg} mg`;
        nutritionSection.append(ingredientCholesterol);
        var ingredientSatFat = result[i].fat_saturated_g;
        ingredientSatFat = document.createElement("p");
        ingredientSatFat.textContent = `saturated fat: ${currentFood.fat_saturated_g} g`;
        nutritionSection.append(ingredientSatFat);
        var ingredientFat = result[i].fat_total_g;
        ingredientFat = document.createElement("p");
        ingredientFat.textContent = `fat: ${currentFood.fat_total_g} g`;
        nutritionSection.append(ingredientFat);
        var ingredientSugar = result[i].sugar_g;
        ingredientSugar = document.createElement("p");
        ingredientSugar.textContent = `sugar: ${currentFood.sugar_g} g`;
        nutritionSection.append(ingredientSugar);
        var ingredientServe = result[i].serving_size_g;
        ingredientServe = document.createElement("p");
        ingredientServe.textContent = `serve: ${currentFood.serving_size_g} g`;
        nutritionSection.append(ingredientServe);
        var ingredientSodium = result[i].sodium_mg;
        ingredientSodium = document.createElement("p");
        ingredientSodium.textContent = `sodium: ${currentFood.sodium_mg} mg`;
        nutritionSection.append(ingredientSodium);
        var ingredientProtein = result[i].protein_g;
        ingredientProtein = document.createElement("p");
        ingredientProtein.textContent = `protein: ${currentFood.protein_g} g`;
        nutritionSection.append(ingredientProtein);
        var ingredientFiber = result[i].fiber_g;
        ingredientFiber = document.createElement("p");
        ingredientFiber.textContent = `fiber: ${currentFood.fiber_g} g`;
        nutritionSection.append(ingredientFiber);
        var ingredientPotassium = result[i].potassium_mg;
        ingredientPotassium = document.createElement("p");
        ingredientPotassium.textContent = `potassium: ${currentFood.potassium_mg} mg`;
        nutritionSection.append(ingredientPotassium);
        
 } 
};


























