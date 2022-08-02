const list = document.querySelector('div#fruit-list')

fetch('http://localhost:3000/Fruits')
    .then(resp => resp.json())
    .then(fruits => {
        renderFruits(fruits)
        renderDetails(fruits[0])
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
