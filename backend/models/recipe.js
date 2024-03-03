const mongoose = require('mongoose')

const enumValidator = {
    validator: function(value) {
        const uniqueMeals = new Set(value);
        return value.length === uniqueMeals.size && value.every(meal => ["Breakfast", "Lunch", "Dinner", "Snack"].includes(meal))
    },
    message: props => `${props.value} is not valid combi of meal choice`
}

const recipeSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true, unique: true},
    ingredients: {type: [String], required: true},
    oftenness: {type: Number, default: 1},
    stars: {type: Number, min: 0, max:10, required: true},
    onPlanningList: {type: Boolean, required: true},
    timeConsuming: {type: String, enum: ["Very fast", "Fast", "Middle", "Long"], required: true},
    mealTimes: {type: [String], enum:["Breakfast", "Lunch", "Dinner", "Snack"], validate: enumValidator, required: true},
    nutritionScore: {type: String, enum: ["Healthy", "Normal", "Porky Porky"], required: true},
    createdOn: {type: Date, default: new Date, required: true, immutable: true}

})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;