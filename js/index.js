document.addEventListener("DOMContentLoaded", () => {
    //Loading content to page
    let pageNumber = 1;
    fetcher();
    //creating "Add Monster" form
    const form = document.createElement('form')
    const name = document.createElement('input')
    name.setAttribute('id', 'name')
    name.setAttribute('placeholder', 'Name...')
    const age = document.createElement('input')
    age.setAttribute('id', 'age')
    age.setAttribute('placeholder', 'Age...')
    const description = document.createElement('input')
    description.setAttribute('id', 'description')
    description.setAttribute('placeholder', 'Description...')
    const btn = document.createElement('button')
    btn.textContent = 'Create'
    form.append(name, age, description, btn)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        function formDeets () {
            const name = document.getElementById('name').value
            const age = document.getElementById('age').value
            const description = document.getElementById('description').value
            return {
                name: name,
                age: age,
                description: description
            }
        }
        fetch('http://localhost:3000/monsters', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body:JSON.stringify(formDeets())
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            cardCreator(data)
            document.getElementById('name').value = ''
            document.getElementById('age').value = ''
            document.getElementById('description').value = ''
        })
        .catch(message => console.log(message))
    })
    document.getElementById('create-monster').append(form)

    //adding functionality to the next and previous buttons

    document.getElementById('back').addEventListener('click', () => {
        if (pageNumber > 1) {
            pageNumber -= 1
            fetcher()
        }
    })
    document.getElementById('forward').addEventListener('click', () => {
        if (pageNumber < 60) {
            pageNumber += 1
            fetcher()
        }
    })



    function fetcher () {
        //remove content
        document.getElementById('monster-container').replaceChildren()
        //fetching data
        fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNumber}`)
        .then(resp => resp.json())
        .then(data => {
                data.forEach(monster => {
                cardCreator(monster)
            });
        })
    }
    //creating card
    const cardCreator = (monster) => {
        const newDiv = document.createElement('div')
        newDiv.id = monster.id
        const name = document.createElement('h2')
        name.textContent = monster.name
        const age = document.createElement('h4')
        age.textContent = monster.age
        const description = document.createElement('p')
        description.textContent = monster.description
        newDiv.append(name, age, description)
        document.getElementById('monster-container').append(newDiv)
    
    }
})