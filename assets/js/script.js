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
        console.log(result[i].name);
        console.log(result[i].calories);
        var nutritionList = document.createElement('ul');
        var ingredientName = result[i].name;
        var name = 
        nutritionList.textContent = ingredientName;
        nutritionSection.appendChild(nutritionList);
        var ingredientCalories = result[i].calories;
        nutritionList.textContent = ingredientCalories;
        nutritionSection.appendChild(nutritionList);
        var ingredientCarbs = result[i].carbohydrates_total_g;
        nutritionList.textContent = ingredientCarbs;
        nutritionSection.appendChild(nutritionList);
        var ingredientChol = result[i].cholesterol_mg;
        nutritionList.textContent = ingredientChol;
        nutritionSection.appendChild(nutritionList);
        var ingredientSatFat = result[i].fat_saturated_g;
        nutritionList.textContent = ingredientSatFat;
        nutritionSection.appendChild(nutritionList);        
        var ingredientFat = result[i].fat_total_g;
        nutritionList.textContent = ingredientFat;
        nutritionSection.appendChild(nutritionList);  
        var ingredientSugar = result[i].sugar_g;
        nutritionList.textContent = ingredientSugar;
        nutritionSection.appendChild(nutritionList);  
        var ingredientServe = result[i].serving_size_g;
        nutritionList.textContent = ingredientServe;
        nutritionSection.appendChild(nutritionList);  
        var ingredientSodium = result[i].sodium_mg;
        nutritionList.textContent = ingredientSodium;
        nutritionSection.appendChild(nutritionList);  
        var ingredientProtein = result[i].protein_g;
        nutritionList.textContent = ingredientProtein;
        nutritionSection.appendChild(nutritionList);  
        var ingredientFiber = result[i].fiber_g;
        nutritionList.textContent = ingredientFiber;
        nutritionSection.appendChild(nutritionList);  
        var ingredientPotassium = result[i].potassium_mg;
        nutritionList.textContent = ingredientPotassium;
        nutritionSection.appendChild(nutritionList);  
    } 
};

/* function renderNutrition(result){
    for (var i = 0; i < result.length; i++)
    nutritionSection.innerHTML = '';      
    var nutritionListItem = document.createElement('li');
    nutritionListItem.textContent = nutrition;
    nutritionSection.appendChild(nutritionListItem);
}; */
