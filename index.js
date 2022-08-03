const list = document.querySelector('div#fruit-list')
const fruitForm = document.getElementById('new-fruit')
let fruitsArray = []
let currentFruit = {}

/*const add = document.getElementById('add_btn')
const remove = document.getElementById('remove_btn')
let totalCarbs = document.getElementById('carbs')
let totalProtein = document.querySelector('span#proteins')
let totalFat = document.querySelector('span#total-fat')
let totalCalories = document.querySelector('span#total-calories')
let totalSugar = document.querySelector('span#total-sugar')
let tCarbs = 0
let tProtein = 0
let tFat = 0
let tCal = 0
let tSugar = 0 */
//const divDetail = document.querySelector('div#fruit-detail')

fetch('http://localhost:3000/Fruits')
    .then(resp => resp.json())
    .then(fruits => {
        renderFruits(fruits)
        renderDetails(fruits[0])
        fruitsArray
    })

function renderFruits(fruits) {
    fruits.forEach(fruit => {
        const name = document.createElement('h2')
        name.textContent = fruit.name
        list.append(name)
        name.addEventListener('click', () => renderDetails(fruit))
    })
}

function renderDetails(fruit) {
    currentFruit = fruit
    const img = document.querySelector('img#fruit_img')
    img.src = fruit.image
    const nameDis = document.querySelector('h2#fruit_name')
    nameDis.textContent = fruit.name
    const carbs = document.querySelector('span#carbohydrates')
    carbs.textContent = fruit.carbohydrates
    const protein = document.querySelector('span#protein')
    protein.textContent = fruit.protein
    const fat = document.querySelector('span#fat')
    fat.textContent = fruit.fat
    const calorie = document.querySelector('span#calories')
    calorie.textContent = fruit.calories
    const sugar = document.querySelector('span#sugar')
    sugar.textContent = fruit.sugar
    //add.addEventListener('click', (fruit) => fruitCombo(fruit))
    //remove.addEventListener('click', (fruit) => removeFromCombo(fruit))
}
/*
function fruitCombo(fruit) {
    console.log(tCarbs)
    console.log(fruit.target.carbohydrates.value)
    tCarbs + fruit.target.carbohydrates
    totalCarbs.textContent = tCarbs
    console.log(tCarbs)
    console.log(totalCarbs)
    tProtein += parseInt(fruit.target.protein)
    totalProtein.textContent = tProtein
    tFat += parseInt(fruit.target.fat)
    totalFat.textContent = tFat
    tCal += parseInt(fruit.target.calories)
    totalCalories.textContent = tCal
    tSugar += parseInt(fruit.target.sugar)
    totalSugar.textContent = tSugar
}
function removeFromCombo(fruit) {
    console.log(fruit)
}*/

fruitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newFruit = {
        image: e.target.image.value,
        name: e.target.name.value,
        carbohydrates: e.target.carbohydrates.value,
        protein: e.target.protein.value,
        fat: e.target.new-fat.value,
        calories: e.target.calories.value,
        sugar: e.target.sugar.value
    }
    fruitForm.reset()
    fruitsArray.push(newFruit)
    renderFruits(fruitsArray)
})