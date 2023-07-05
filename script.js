
document.querySelector("form").addEventListener('submit', (e) => {
        e.preventDefault()
        fetchUserInput();
})

const userInput = document.querySelector("input")

function fetchUserInput() {

        console.log('mojito')

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput.value}`)
                .then(response => {
                        return response.json()
                })
                .then(search_results => {
                        console.log(search_results)
                        array.forEach(result=> {
                                // dynamic nodes
                                // Assign
                                // Append
                        });
                })
}
