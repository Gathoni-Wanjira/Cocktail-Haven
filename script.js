
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


                        const results_title = document.createElement("h5")
                        results_title.textContent = result.strDrink

                        result_div.appendChild(results_image);
                        result_div.appendChild(results_title);


                        results_container.appendChild(result_div);

                }
                else {
                        return
                }


        });
        const visibility = document.querySelector("#results-section")
        visibility.classList.replace("hide", "visible")


}
