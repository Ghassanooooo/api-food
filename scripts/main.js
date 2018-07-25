(function () {

    class Api {

        constructor() {
            this.baseURL = 'http://food2fork.com/api/';
            this.proxy = `http://localhost:2337/${this.baseURL}`;
            this.appKey = 'd5e62a3de04b06d4f256f8b0996071ae';
        }

        getQuary(q) {
            //  http://food2fork.com/api/search?key=d5e62a3de04b06d4f256f8b0996071ae&q=chicken

            return fetch(this.proxy + 'search' + '?key=' + this.appKey + `&q=${q}`).then(response => response.json());

        }



        getId(id) {
            //  http://food2fork.com/api/get?key=d5e62a3de04b06d4f256f8b0996071ae&rId=35120

            return fetch(this.proxy + 'get' + '?key=' + this.appKey + `&rId=${id}`).then(response => response.json());

        }



    }
    $('#myModal').modal('toggle')

    let output = document.querySelector('#response')


    const food = new Api()
    food.getQuary('Cajun Chicken Pasta').then(data => {
        data.recipes.map((res) => {
            return output.innerHTML += `

                        <div class="card" style="width: 18rem;margin-bottom:25px">
                        <img class="card-img-top" src="${res.image_url}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${res.title}</h5>
                            <p class="card-text"> ${res.publisher}</p>
                            <a href="${res.source_url}" class="btn btn-primary" target="_blank">Go source</a>
                        </div>
                        </div>
                         `
        })

    });

    //
})();
