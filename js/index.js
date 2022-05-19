document.addEventListener("DOMContentLoaded", () => {
    //Loading content to page
    fetch('http://localhost:3000/monsters/?_limit=20&_page=3')
    .then(resp => resp.json())
    .then(data => {
        const cardCreator = (monster) => {
            const newDiv = document.createElement('div')
            const name = document.createElement('h2')
            name.textContent = monster.name
            const age = document.createElement('h4')
            age.textContent = monster.age
            const description = document.createElement('p')
            description.textContent = monster.description
            newDiv.append(name, age, description)
            document.getElementById('monster-container').append(newDiv)
        }
        data.forEach(element => {
            cardCreator(element)
        });
    })

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
                name: `${name}`,
                age: `${age}`,
                description: `${description}`
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
            //append data to list
            const cardCreator = (monster) => {
                const newDiv = document.createElement('div')
                const name = document.createElement('h2')
                name.textContent = monster.name
                const age = document.createElement('h4')
                age.textContent = monster.age
                const description = document.createElement('p')
                description.textContent = monster.description
                newDiv.append(name, age, description)
                document.getElementById('monster-container').append(newDiv)
            }
            cardCreator(data)

            document.getElementById('name').value = ''
            document.getElementById('age').value = ''
            document.getElementById('description').value = ''
        })
        .catch(message => console.log(message))
    })
    document.getElementById('create-monster').append(form)

    

})