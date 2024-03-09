function buildRecipeUp(recipeResult, recipeContainer){
    recipeResult.forEach(item =>  {
        const titleItem = document.createElement('h2');
        const quickInfo = document.createElement('p');
        const description = document.createElement('h5');

        const listItem = document.createElement('article');
        const linkEl = document.createElement('a');
        let titlesRecipe = item.title;
        let titleWithoutSpaces = `${titlesRecipe.replace(/\s+/g,'-')}`
        linkEl.href = titleWithoutSpaces
        linkEl.setAttribute("id",titleWithoutSpaces )

        const mainContentRecipe = document.createElement('section');
        const image = document.createElement('img');
        const rating = document.createElement('aside')

        function stars(number) {
            for(let star = 0; star < number; star++) {
                const ratingTag = document.createElement('i')
                ratingTag.classList.add("fas")
                ratingTag.classList.add("fa-star")
                
                rating.appendChild(ratingTag)
            }
        }
        stars(item.stars)

        image.src = "cooking.jpg";
        image.alt = "cooking pan";
        image.classList.add("recipeImage")
        
        listItem.classList.add("containerApi")
        linkEl.classList.add("itemApi")

        let meal = item.mealTimes;
        let singularOrMultipe = item.oftenness === 1 ? "time" : "times"

        titleItem.textContent = `${item.title}`
        quickInfo.textContent = `${meal.join(", ")} - ${item.timeConsuming} - ${item.nutritionScore} - ${item.oftenness} ${singularOrMultipe} made`
        description.textContent = `${item.description}`
        

        mainContentRecipe.appendChild(titleItem);
        mainContentRecipe.appendChild(quickInfo);
        mainContentRecipe.appendChild(description);
        
        listItem.appendChild(linkEl)
        linkEl.appendChild(image);
        linkEl.appendChild(mainContentRecipe);
        linkEl.appendChild(rating)
        recipeContainer.appendChild(listItem);


})
}

function fetchAll() {
    cleanUp();

    fetch("/api/recipes")
    .then(res => res.json())
    .then(recipes => {
        const recipeContainer = document.getElementById('apiData')
        buildRecipeUp(recipes, recipeContainer);
    })
    .catch (error => {
        console.error("Error fetching recipes: ", error);
    })
}



function cleanUp() {
    const recipeContainer = document.getElementById('apiData');
    const childrenEls = recipeContainer.children;
    // loop starts in reverse to not skip any el
    for (let i = childrenEls.length - 1; i >= 0; i--) {
        const childEl = childrenEls[i];
        recipeContainer.removeChild(childEl);
        console.log(i, childEl);
    }
} 



const searchForm = document.getElementById("searchRecipes")

searchForm.addEventListener("submit", function(event){
    event.preventDefault()

    let formData = new FormData(this);

    for(let pair of formData.entries()) {
        const choosenCategory = pair[1]
        choosenCategory === "All categories" ? fetchAll() : fetch("/api/recipes")
        .then(res => res.json())
        .then(recipes => {
            const recipeResult = recipes.filter((item) => item.mealTimes.includes(choosenCategory)
        )
        

        const recipeContainer = document.getElementById('apiData')
        cleanUp();
        buildRecipeUp(recipeResult, recipeContainer );
    })
    }
})


fetchAll()


