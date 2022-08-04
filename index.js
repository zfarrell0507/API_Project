const list = document.querySelector('div#fruit-list')
const fruitForm = document.getElementById('new-fruit')
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

fetch('http://localhost:3000/Fruits')
    .then(resp => resp.json())
    .then(fruits => {
        fruits.forEach(renderFruits)
        renderDetails(fruits[0])
    })

function renderFruits(fruit) {
        const name = document.createElement('h2')
        name.textContent = fruit.name
        list.append(name)
        name.addEventListener('click', () => renderDetails(fruit))
    
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
}

function fruitCombo(currentFruit) {
    comboNames.push(currentFruit.name)
    tCarbs += currentFruit.carbohydrates
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
    comboVal.textContent = (Object.entries(map))
}
function removeFromCombo(currentFruit) {
    let index = comboNames.indexOf(currentFruit.name);
    if (index > -1) {
        comboNames.splice(index, 1);
    tCarbs -= currentFruit.carbohydrates
    totalCarbs.textContent = tCarbs.toFixed(2)
    tProtein -= currentFruit.protein
    totalProtein.textContent = tProtein.toFixed(2)
    tFat -= currentFruit.fat
    totalFat.textContent = tFat.toFixed(2)
    tCal -= currentFruit.calories
    totalCalories.textContent = tCal.toFixed(2)
    tSugar -= currentFruit.sugar
    totalSugar.textContent = tSugar.toFixed(2)
    let maps = comboNames.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
    comboVal.textContent = (Object.entries(maps))
    }
    else {
        alert("This fruit is no longer in the inventory")
    }
}

fruitForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let newFruit = {
        image: e.target.image.value,
        name: e.target.name.value,
        carbohydrates: parseInt(e.target.carbohydrates.value),
        protein: parseInt(e.target.protein.value),
        fat: parseInt(e.target['new-fat'].value),
        calories: parseInt(e.target.calories.value),
        sugar: parseInt(e.target.sugar.value)
    }
    fruitForm.reset()
    
    fetch('http://localhost:3000/Fruits', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newFruit)
    })
    .then(resp => resp.json())
    .then(fruit => renderFruits(fruit))
})
