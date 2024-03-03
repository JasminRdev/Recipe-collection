fetch("/api/recipes")
.then(res => res.json())
.then(recipes => {
    const recipeContainer = document.getElementById('apiData')
    recipes.forEach(item =>  {
        const listItem = document.createElement('p');
        listItem.textContent = `${item.title}`
        recipeContainer.appendChild(listItem);
    })
})
.catch (error => {
    console.error("Error fetching recipes: ", error);
})

console.log("new")