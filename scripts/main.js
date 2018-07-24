(function () {

    class Api {

        constructor() {
            this.baseURL = 'http://food2fork.com/api/search';
            this.proxy = `http://localhost:2337/${this.baseURL}?q=chicken&key=`;
            this.appKey = 'd5e62a3de04b06d4f256f8b0996071ae';
        }

        getQuary() {
          

            return fetch(this.proxy  + this.appKey).then(response => {
                return response.json()
            })

        }
    }





    document.body.querySelector('.button-container').addEventListener('click', event => {
        event.preventDefault();
        const food = new Api()
        food.getQuary().then(data => {
            return console.log(data.recipes)
        })
    });

    //
})();
