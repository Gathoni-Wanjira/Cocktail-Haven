
fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
        
        .then(response =>response.json())
        .then(alcoholic_cocktails => console.log(alcoholic_cocktails))
           