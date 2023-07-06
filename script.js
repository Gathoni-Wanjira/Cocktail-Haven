
document.querySelector("form").addEventListener('submit', (e) => {
        e.preventDefault();
        fetchUserInput();
})

const userInput = document.querySelector("input")

function fetchUserInput() {

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput.value}`)
                .then(response => {
                        return response.json()
                })
                .then(search_results => {
                        console.log(search_results)
                        fetchResults(search_results);

                })

}

function fetchResults(search_results) {

        const results_container = document.querySelector("#results")
        results_container.innerHTML = ""
        search_results.drinks.forEach((result, index) => {
                if (index < 4) {
                        const result_div = document.createElement("div")

                        const results_image = document.createElement("img")
                        results_image.src = result.strDrinkThumb

                        const ingredients_results = document.createElement("li")
                        ingredients_results.textContent = result.strIngredient



                        const results_title = document.createElement("h5")
                        results_title.textContent = result.strDrink

                        result_div.appendChild(results_image);
                        result_div.appendChild(results_title);
                        result_div.appendChild(ingredients_results)


                        results_container.appendChild(result_div);

                }
                else {
                        return
                }


        });
        const visibility = document.querySelector("#results-section")
        visibility.classList.replace("hide", "visible")

}



function getCategories(category) {

        const drinksContainer = document.querySelector("#drinks")
        drinksContainer.innerText = ""

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
                .then(response => {
                        return response.json()
                })
                .then(drink_array => {
                        console.log(drink_array)
                        drink_array.drinks.forEach(drink => {
                                const drinksDiv = document.createElement("div")


                                const drinksImg = document.createElement("img")
                                drinksImg.src = drink.strDrinkThumb



                                const drinksName = document.createElement("p")
                                drinksName.className = "drink-name"
                                drinksName.innerText = drink.strDrink


                                const drinksLink = document.createElement("p")
                                drinksLink.className = "drink-link"
                                drinksLink.innerText = "See Ingredients"
                                drinksLink.addEventListener('click', (e) => {
                                        seeIngredients(drink);
                                })


                                drinksDiv.appendChild(drinksImg);
                                drinksDiv.appendChild(drinksName);
                                drinksDiv.appendChild(drinksLink);


                                drinksContainer.appendChild(drinksDiv);

                        });


                })

}



document.querySelector("#Alco").addEventListener('click', (e) => {
        console.log("alcoholic");
        e.preventDefault();
        getCategories("Beer");


})


document.querySelector("#Non-Alco").addEventListener('click', (e) => {
        e.preventDefault();
        getCategories("Soft Drink");

})

document.querySelector("#Ordi-drinks").addEventListener('click', (e) => {
        e.preventDefault();
        getCategories("Ordinary Drink");

})

document.querySelector("#Cockta").addEventListener('click', (e) => {
        e.preventDefault();
        getCategories("Cocktail");

})

function seeIngredients(drink) {

const finalDrinkObject = formatIngredients(drink);



const clickDrink = document.createElement("div")



const clickImg = document.createElement("img")
clickImg.src = drink.strDrinkThumb

const clickName = document.createElement("p")
clickName.innerText = drink.strDrink

const clickList = document.createElement("div")
console.log(finalDrinkObject)
finalDrinkObject.ingredients.forEach (singleIngredient => {

        const ingredientEntry = document.createElement("p")
        ingredientEntry.innerText = singleIngredient

        clickList.appendChild(ingredientEntry);
        

})


const clickDescription = document.createElement("p")
clickDescription.innerText =drink.strInstructions


clickDrink.appendChild(clickImg);
clickDrink.appendChild(clickName);
clickDrink.appendChild(clickList);
clickDrink.appendChild(clickDescription);
console.log(clickList);
console.log(clickDescription);


document.body.appendChild(clickDrink);


}



function formatIngredients(drink) {
        const cleanObject = {}
        Object.keys(drink).forEach(key => {
                if (drink[key] !== undefined && drink[key] !== null && drink[key] != '') {
                        cleanObject[key] = drink[key]
                }
        })

        const updatedObject = {}
        updatedObject.ingredients = []

        Object.keys(cleanObject).forEach(key => {
                if (key === 'strInstructions') {
                        updatedObject[key] = cleanObject[key].replace(/(\r\n|\r|\n)/g, '<br>')
                } else if (!key.startsWith('strIngredient') && !key.startsWith('strMeasure')) {
                        updatedObject[key] = cleanObject[key]
                } else {
                        if (key.startsWith('strIngredient')) {     
                                let index = key.replace('strIngredient', '')
                                let quantity = cleanObject[`strMeasure${index}`]
                                let ingredient = cleanObject[key]
                                updatedObject.ingredients.push(`${quantity} ${ingredient}`)
                        }
                }
        })
        
        return updatedObject
}