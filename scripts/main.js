(function () {

    class Api {

        constructor() {
            this.baseURL = 'http://food2fork.com/api/';
            this.proxy = `http://localhost:2337/${this.baseURL}`;
            this.appKey = 'd5e62a3de04b06d4f256f8b0996071ae';

            this.state = {
                id: null
            }
        }

       

    getQuary(q) {
        //  http://food2fork.com/api/search?key=d5e62a3de04b06d4f256f8b0996071ae&q=chicken

        return fetch(this.proxy + 'search' + '?key=' + this.appKey + `&q=${q}`).then(response => response.json());

    }



    getId() {
        //  http://food2fork.com/api/get?key=d5e62a3de04b06d4f256f8b0996071ae&rId=35120

        return fetch(this.proxy + 'get' + '?key=' + this.appKey + `&rId=${this.state.id}`).then(response => response.json());

    }



}

    $('#myModal').modal();

let output = document.querySelector('.modal-body');
let button = document.querySelector('.form-inline');
let input = document.querySelector('input');

output.innerHTML = '<div class="loader">Loading...</div>';

const food = new Api();
button.addEventListener('submit', (e) => {
    e.preventDefault();
    output.innerHTML = '<div class="loader">Loading...</div>';
    food.getQuary(input.value).then(data => {

        return data.recipes;
    })
        .then(recipeId => {

            let randomIndex = Math.floor(Math.random() * recipeId.length - 1);
            let newId=recipeId[randomIndex].recipe_id;
            
            food.state.id = newId;
            

            return food.getId()
        })
        .then(res =>res.recipe)
        .then(recipe => {
            let id = recipe.recipe_id;
            let url = recipe.image_url;
            let source = recipe.source_url;
            let title = recipe.title;
            let ingredients = recipe.ingredients.map(ingredient => `<li class="list-group-item">${ingredient}</li>`).join('');
            console.log(recipe.recipe_id);

            console.log(food.state.id)


           if(food.state.id && id) {
               return output.innerHTML = `

                        <div class="card" style="width: 100%;">
                         <img class="card-img-top" src="${url}" alt="Card image cap">
                        <div class="card-body">
                        <h5 class="card-title" style="text-align:center">${title}</h5>

                            </div>
                            <ul class="list-group list-group-flush">
                                ${ingredients}
                            </ul>
                            <div class="card-body">
                                <a href="${source}" class="card-link" target="_blank">Source link</a>
                                
                                </div>

                            </div>
                    
                    `;}



        });
});


    //
}) ();
