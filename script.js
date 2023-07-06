
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



function getCategories (category) {

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
                                drinksName.className="drink-name" 
                                drinksName.innerText = drink.strDrink


                                const drinksLink = document.createElement("p")
                                drinksLink.className="drink-link"
                                drinksLink.innerText = "See Ingredients"

                                
                                drinksDiv.appendChild(drinksImg);
                                drinksDiv.appendChild(drinksName);
                                drinksDiv.appendChild(drinksLink);


                                drinksContainer.appendChild(drinksDiv);
                
                        });

                        
                })

}



document.querySelector("#Alco").addEventListener('click', (e) => {
        console.log("alcoholic");
        e.preventDefault ();
        getCategories ("Beer");
        

})


document.querySelector("#Non-Alco").addEventListener('click', (e) => {
        e.preventDefault ();
        getCategories ("Soft Drink");

})

document.querySelector("#Ordi-drinks").addEventListener('click', (e) => {
        e.preventDefault ();
        getCategories ("Ordinary Drink");

})

document.querySelector("#Cockta").addEventListener('click', (e) => {
        e.preventDefault ();
        getCategories ("Cocktail");

})

