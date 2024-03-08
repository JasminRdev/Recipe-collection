const express = require("express");
const mongoose = require("mongoose");

const app = express()

app.use(express.json())



const path = require('path');

const pathToFrontend = path.join(__dirname, '../frontend/ejs/public');

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '../frontend/ejs/views'));

mongoose.connect('mongodb://localhost/my_database', {})
.then(() => {
    console.log('Connected to MONGODB')
})
.catch((error) => {
    console.log('Error connecting to MONGODB: ' + error)
})




app.use(express.static(pathToFrontend));

app.get('/', (req, res) => {
    res.render('index');
});


app.get('/about', (req, res) => {
    res.render('about')
})


app.get("/login", (req, res) => {
    res.render('login')
})

// app.get('/', (req, res) => {
//     try{
//         res.send("Hello")
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

app.get("/api/recipes", async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// const User = require('./models/user')

// const newUser = new User({
//     username: "jonny",
//     email: 'john@example.com',
//     password: 'password123'
// })

// newUser.save()
//     .then((user) => {
//     console.log('User added: ', user);
// })
//     .catch((error) => {
//         console.error('Error adding user: ', error);
//     })



const Recipe = require('./models/recipe')

//add 

// const newRecipe = new Recipe({
//     title: "Apple pie",
//     description: "40 min, 180° mostly apples",
//     ingredients: ["5 apples", "130g flour", "2 eggs", "100ml milk", "30g sugar", "30g oil"],
//     oftenness: 1,
//     stars: 7,
//     onPlanningList: false,
//     timeConsuming: "Middle",
//     mealTimes: ["Snack"],
//     nutritionScore: "Normal"
// })

// newRecipe.save()
//     .then((recipe) => {
//         console.log("recipe added: ", recipe);
//     })
//     .catch((error) => {
//         console.error('Error adding recipe: ', error);
//     })


//edit 

// Recipe.findOneAndUpdate(
//     {_id: "65e08450d098ee8fa7b6af52"},
//     {$set: {stars: 4}},
//     {new: true}
//     )
//     .then(updatedRecipe => {
//         console.log("Updated recipe: ", updatedRecipe);
//     })
//     .catch((error) => {
//         console.error('Error updating recipe: ', error);
//     })

    
        
//del

// Recipe.findOneAndDelete({_id: "65e07ffcbc302eb427f96a50"})
// .then(deletedRecipe => {
//     console.log("Deleted meal: ", deletedRecipe);
// })
// .catch((error) => {
//     console.error('Error deleting meal: ', error);
// })



//find and output console

// Recipe.find({})
//     .then(recipes => {
//         console.log(recipes)
//     })
//     .catch((error) => {
//         console.error('Error finding recipes: ', error);
//     })




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server runs on PORT ${PORT}`)
})
