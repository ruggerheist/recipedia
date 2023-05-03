const searchButton = document.getElementById('search-button');
let instructionSection = document.querySelector('#instructions-section');
let ingredientSection = document.getElementById('ingredient-section');
let searchResults = document.querySelector('.search-results');
const maxResults = 10;
let searchHistory ;


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
        
        // var userInput = document.getElementById("search-input").value;
        // searchHistory.push(userInput)
        // localStorage.setItem("searched", JSON.stringify(searchHistory));

      
        recipeButton.addEventListener('click', function () {
            let id = recipeButton.id.split('-')[2];
            renderIngredients(recipes[id])
        });
        searchResults.appendChild(recipeButton);
    }
    var userInput = document.getElementById("search-input").value;
    searchHistory.push(userInput)
    localStorage.setItem("searched", JSON.stringify(searchHistory));
    renderSearchHistory()
};

// function displaySearchResults(searchResultItems){
//     var searchHistory = document.querySelector("#history-section")
//     searchHistory.innerHTML = ""

    // const li = document.createElement("li");
    // li.textContent = searchResultItems;
    // searchHistory.appendChild(li);


// window.addEventListener('DOMContentLoaded', () => {
function renderSearchHistory() {
    var searchResultItems = JSON.parse(localStorage.getItem("searched")) || []
    searchHistory = searchResultItems
    var searchRecipe = document.querySelector("#search-field")
    console.log(searchResultItems)
    console.log(searchRecipe)
    // if (searchResultItems !== null) {
    //     searchResultItems.push(searchRecipe)
    //     localStorage.setItem("searched", JSON.stringify(searchResultItems))
    //  }
     var searchHistorySection = document.querySelector("#history-section")
     searchHistorySection.innerHTML = ""
     searchResultItems.forEach(search => {
        var historyElement = document.createElement("button")
        historyElement.textContent = search;
        historyElement.dataset.search = search;
        historyElement.setAttribute("class", "history-results")
        searchHistorySection.appendChild(historyElement);
        historyElement.addEventListener("click", (event) => {
            var searchItem = event.target.dataset.search;
         document.querySelector (".history-results").value = searchItem
        })
     })
}

renderSearchHistory()

function renderIngredients(recipe) {
    ingredientSection.innerHTML = '';
    let ingredients = recipe.ingredients.split('|');
    ingredients.forEach(ingredient => {
        let ingredientListItem = document.createElement('li');
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
// returnNutrition(result)
// function renderNutrition(result) {
//     for (let i = 0; i < result.length; i++) {
//         let currentFood = result[i];
//         console.log(currentFood.name);
//         console.log(currentFood.calories);
//         console.log(currentFood.carbs);
//         console.log(currentFood.cholesterol);
//         console.log(currentFood.saturated_fat);
//         console.log(currentFood.fat);
//         console.log(currentFood.sugar);
//         console.log(currentFood.serving_size);
//         console.log(currentFood.sodium);
//         console.log(currentFood.protein);
//         console.log(currentFood.fiber);
//         console.log(currentFood.potassium);

//         let cardBody = document.createElement("div");
//         cardBody.setAttribute("class", "card-body");

//         let ingredientName = document.createElement("h2");
//         ingredientName.textContent = `${currentFood.name}`;
//         cardBody.append(ingredientName);

//         let ingredientCalories = document.createElement("p");
//         ingredientCalories.textContent = `calories: ${currentFood.calories}`;
//         cardBody.append(ingredientCalories);

//         let ingredientCarbs = document.createElement("p");
//         ingredientCarbs.textContent = `carbs: ${currentFood.carbs}`;
//         cardBody.append(ingredientCarbs);

//         let ingredientCholesterol = document.createElement("p");
//         ingredientCholesterol.textContent = `cholesterol: ${currentFood.cholesterol}`;
//         cardBody.append(ingredientCholesterol);

//         let ingredientSatFat = document.createElement("p");
//         ingredientSatFat.textContent = `saturated fat: ${currentFood.saturated_fat}`;
//         cardBody.append(ingredientSatFat);

//         let ingredientFat = document.createElement("p");
//         ingredientFat.textContent = `fat: ${currentFood.fat}`;
//         cardBody.append(ingredientFat);

//         let ingredientSugar = document.createElement("p");
//         ingredientSugar.textContent = `sugar: ${currentFood.sugar}`;
//         cardBody.append(ingredientSugar);

//         let ingredientServe = document.createElement("p");
//         ingredientServe.textContent = `serve: ${currentFood.serving_size}`;
//         cardBody.append(ingredientServe);

//         let ingredientSodium = document.createElement("p");
//         ingredientSodium.textContent = `sodium: ${currentFood.sodium}`;
//         cardBody.append(ingredientSodium);

//         let ingredientProtein = document.createElement("p");
//         ingredientProtein.textContent = `protein: ${currentFood.protein}`;
//         cardBody.append(ingredientProtein);

//         let ingredientFiber = document.createElement("p");
//         ingredientFiber.textContent = `fiber: ${currentFood.fiber}`;
//         cardBody.append(ingredientFiber);

//         let ingredientPotassium = document.createElement("p");
//         ingredientPotassium.textContent = `potassium: ${currentFood.potassium}`;
//         cardBody.append(ingredientPotassium);

//         nutritionListItem.append(cardBody);
//     }
// };