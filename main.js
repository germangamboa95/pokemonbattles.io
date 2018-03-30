$( document ).ready(function() {
    $('.main-selection').before('<h2 class="title">Choose your Pokemon!</h2>');
    createCards(5);


    $('.main-selection').on('click', '.card',  function() {
        console.log(this);
    });


});


const userSelection = {
    card: '',
    health: '',
    multiplier: 
};


function createCards(num) {

    for (let i = 0; i <  num; i++) {
        //let id = Math.floor(Math.random() * 100);
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then(res => res.json())
            .then(data => {
                let image = data.sprites.front_default;
                let html = `<div value="${data.stats[0].base_stat}" class="card col-md-3" style="width: 18rem;">
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">Health: ${data.stats[0].base_stat}</p>
                </div>
              </div>`;
              html = $(html);
              console.log(html);
                $('.main-selection').append(html);
            });
    }
}


