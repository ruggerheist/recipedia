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
            var id = recipeButton.id.split('-')[2];           
            renderIngredients(recipes[id])});
        searchResults.appendChild(recipeButton); 
        
        var userInput = document.getElementById("search-input").value;localStorage.setItem("searched", userInput);
        var userInput = document.getElementById("search-input").value;
        localStorage.setItem("searched", userInput);

    //   var displaysearchResults = displaysearchResults(searchResultItems);

       function displaysearchResults(searchResultItems){
        searchHistory.innterHTML =""
        for (let i = 0; i< searchResultItems.length; i++){
            const li = document.createElement("li");
            li.textContent = searchResultItems[i];
            searchResults.appendChild(li);

            window.addEventListener('load', function() {
                const searchResultItems = JSON.parse(localStorage.getItem("searchResults")) || [];
                displaySearchResults(searchResultItems);
              });
        }
       }
        JSON.parse(localStorage.getItem("searchResults"));
    }    
        recipeButton.addEventListener('click', function () {
            let id = recipeButton.id.split('-')[2];
            renderIngredients(recipes[id])
        });
        searchResults.appendChild(recipeButton);
    }
};

function renderIngredients(recipe) {
    ingredientSection.innerHTML = '';
    let ingredients = recipe.ingredients.split('|');
    ingredients.forEach(ingredient => {
        let ingredientListItem = document.createElement('li');
        ingredientListItem.textContent = ingredient;
        ingredientSection.appendChild(ingredientListItem);

      
        // localStorage.setItem("searchResults", JSON.stringify(searchResults))

        

    })

    console.log(ingredients);   
    ingredientString = ingredients.join(' '); 
    returnNutrition();
    renderInstructions(recipe);  

};



function renderInstructions(recipe){
    var instructions = recipe.instructions;    

    renderInstructions(recipe);
    instructionSection.innerHTML = instructions;
};



//TO DO:
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
returnNutrition('chicken')
function renderNutrition(result) {
    for (let i = 0; i < result.length; i++) {
        let currentFood = result[i];
        console.log(currentFood.name);
        console.log(currentFood.calories);
        console.log(currentFood.carbs);
        console.log(currentFood.cholesterol);
        console.log(currentFood.saturated_fat);
        console.log(currentFood.fat);
        console.log(currentFood.sugar);
        console.log(currentFood.serving_size);
        console.log(currentFood.sodium);
        console.log(currentFood.protein);
        console.log(currentFood.fiber);
        console.log(currentFood.potassium);

        let cardBody = document.createElement("div");
        cardBody.setAttribute("class", "card-body");

        let ingredientName = document.createElement("h2");
        ingredientName.textContent = `${currentFood.name}`;
        cardBody.append(ingredientName);

        let ingredientCalories = document.createElement("p");
        ingredientCalories.textContent = `calories: ${currentFood.calories}`;
        cardBody.append(ingredientCalories);

        let ingredientCarbs = document.createElement("p");
        ingredientCarbs.textContent = `carbs: ${currentFood.carbs}`;
        cardBody.append(ingredientCarbs);

        let ingredientCholesterol = document.createElement("p");
        ingredientCholesterol.textContent = `cholesterol: ${currentFood.cholesterol}`;
        cardBody.append(ingredientCholesterol);

        let ingredientSatFat = document.createElement("p");
        ingredientSatFat.textContent = `saturated fat: ${currentFood.saturated_fat}`;
        cardBody.append(ingredientSatFat);

        let ingredientFat = document.createElement("p");
        ingredientFat.textContent = `fat: ${currentFood.fat}`;
        cardBody.append(ingredientFat);

        let ingredientSugar = document.createElement("p");
        ingredientSugar.textContent = `sugar: ${currentFood.sugar}`;
        cardBody.append(ingredientSugar);

        let ingredientServe = document.createElement("p");
        ingredientServe.textContent = `serve: ${currentFood.serving_size}`;
        cardBody.append(ingredientServe);

        let ingredientSodium = document.createElement("p");
        ingredientSodium.textContent = `sodium: ${currentFood.sodium}`;
        cardBody.append(ingredientSodium);

        let ingredientProtein = document.createElement("p");
        ingredientProtein.textContent = `protein: ${currentFood.protein}`;
        cardBody.append(ingredientProtein);

        let ingredientFiber = document.createElement("p");
        ingredientFiber.textContent = `fiber: ${currentFood.fiber}`;
        cardBody.append(ingredientFiber);

        let ingredientPotassium = document.createElement("p");
        ingredientPotassium.textContent = `potassium: ${currentFood.potassium}`;
        cardBody.append(ingredientPotassium);

        nutritionListItem.append(cardBody);
    }
};