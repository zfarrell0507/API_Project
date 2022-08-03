const list = document.querySelector('div#fruit-list')
const fruitForm = document.getElementById('new-fruit')
let fruitsArray = []
let currentFruit = []
let comboNames = []

const add = document.getElementById('add_btn')
add.addEventListener('click', () => fruitCombo(currentFruit))
const remove = document.getElementById('remove_btn')
remove.addEventListener('click', () => removeFromCombo(currentFruit))
let totalCarbs = document.getElementById('carbs')
let totalProtein = document.querySelector('span#proteins')
let totalFat = document.querySelector('span#total-fat')
let totalCalories = document.querySelector('span#total-calories')
let totalSugar = document.querySelector('span#total-sugar')
let tCarbs = 0
let tProtein = 0
let tFat = 0
let tCal = 0
let tSugar = 0
const comboVal = document.getElementById('combo')
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
    console.log(currentFruit)
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
}

function fruitCombo(currentFruit) {
    console.log(currentFruit)
    comboNames.push(currentFruit.name)
    console.log(comboNames)
    tCarbs += currentFruit.carbohydrates
    console.log(currentFruit.carbohydrates)
    console.log(tCarbs)
    totalCarbs.textContent = tCarbs.toFixed(2)
    tProtein += currentFruit.protein
    totalProtein.textContent = tProtein.toFixed(2)
    tFat += currentFruit.fat
    totalFat.textContent = tFat.toFixed(2)
    tCal += currentFruit.calories
    totalCalories.textContent = tCal.toFixed(2)
    tSugar += currentFruit.sugar
    totalSugar.textContent = tSugar.toFixed(2)
    let map = comboNames.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
    //for (const [key, value] of Object.entries(map)) {
    //comboVal.textContent = `${value}-${key}`
    //}
    console.log(map)
}
function removeFromCombo(currentFruit) {
    //comboNames.push(currentFruit.name)
    //console.log(comboNames)
    tCarbs -= currentFruit.carbohydrates
    console.log(currentFruit.carbohydrates)
    console.log(tCarbs)
    totalCarbs.textContent = tCarbs.toFixed(2)
    tProtein -= currentFruit.protein
    totalProtein.textContent = tProtein.toFixed(2)
    tFat -= currentFruit.fat
    totalFat.textContent = tFat.toFixed(2)
    tCal -= currentFruit.calories
    totalCalories.textContent = tCal.toFixed(2)
    tSugar -= currentFruit.sugar
    totalSugar.textContent = tSugar.toFixed(2)
}

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