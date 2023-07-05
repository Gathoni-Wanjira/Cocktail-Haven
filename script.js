
const form = document.querySelector("form").addEventListener('submit', fetchUserInput)
const userInput = document.querySelector("input")


function fetchUserInput (){

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${userInput}`)       
.then(response =>response.json())
.then(cocktailsByName => console.log(cocktailsByName))

}
           