let loadCount = 0;

$(document).ready(function() {
  createCards(4);
  $('.main-selection').hide();


  $('.main-selection').on('click', '.card', function() {
    userSelection.card = this;
    $(userSelection.card).attr("data", 'user');
    userSelection.health = this.attributes.value.value;


    $('.title, .jumbotron').hide();
    $('.battle-spot').append(userSelection.card);
    let opponents = $('.main-selection .card');
    $('.opponent-selection').append(opponents);
    $('.opponent-selection').before('<h2 class="choose-opp">Choose your opponent!</h2>');
    $('.battle-spot').before('<h2 class="chosen">Your chosen pokemon</h2>');

  });

  $('.opponent-selection').on('click', '.card', function() {

    currentEnemy.card = this;
    $(currentEnemy.card).attr("data", 'enemy');
    currentEnemy.health = this.attributes.value.value;
    $('.battle-spot').append(currentEnemy.card);
    $('.chosen , .choose-opp').hide();

    $('.battle-spot').before('<h2 class="title">FIGHT!</h2>');

    let opponents = $('.opponent-selection .card');
    $('.waiting-room').append(opponents).addClass('justify-content-end');

    $('.battle-spot').append('<button class="btn btn-danger">ATTACK!</button>');
    $('.battle-spot').append('<div class=" col-md-3 stats">');
  });

  $('.battle-spot').on('click', '.btn', function() {

    attack();
    addPower();




    $('[data="enemy"] .card-text .health').text(currentEnemy.health);
    $('[data="user"] .card-text .health').text(userSelection.health);
    $('[data="enemy"] .card-text .attack').text(currentEnemy.base_power);
    $('[data="user"] .card-text .attack').text(userSelection.curent_power);
    //Needs to be an if
    if (userSelection.health < 0) {
      $('body').html(`<div class="d-flex  justify-content-center flex-column align-items-center h-100"    > <h1 class="bg-danger text-white p-1 px-2">YOU LOSE!</h1> </div>`);
    }
    if (currentEnemy.health < 0) {
      $('.dead').append(currentEnemy.card);
      $('.btn, .title').hide();
      $('.opponent-selection').append($('.waiting-room .card'));
      $('.chosen , .choose-opp').show();
      let remaining = $('.dead .card').length;
      $('.stats').hide();
      if (remaining == 3) {
        $('body').html(`<div class="d-flex  justify-content-center flex-column align-items-center h-100"> <h1 class="bg-success text-white p-1 px-2">You WIN!</h1> </div>`);
      }
    }





  });


});



const userSelection = {
  card: '',
  health: '',
  multiplier: 10,
  base_power: 20,
  curent_power: 10
};

const currentEnemy = {
  card: '',
  health: '',
  multiplier: 0,
  base_power: 10
};

function addPower() {
  userSelection.curent_power += userSelection.multiplier;
}

function attack() {
  currentEnemy.health -= userSelection.curent_power;
  userSelection.health -= currentEnemy.base_power;





  let html =
    `
    <ul class="list-group">
      <li class="list-group-item">You took ${userSelection.curent_power} points from the enemy!</li>
      <li class="list-group-item">The enemy took ${currentEnemy.base_power}</li>
    </ul>
  `;
  $('.stats').html(html);

}


function loader(prog) {
  let precent = (prog/4) * 100;
  let html =`
  <div class="progress" style="width: 100%; border-radius: 1em;">
<div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: ${precent}%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>
  `;
  $('.loader').html(html);
  if(precent == 100) {
    $('.loader').hide();
  }
}

function createCards(num) {

  for (let i = 0; i < num; i++) {
    let id = Math.floor(Math.random() * 420) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => res.json())
      .then(data => {
        let image = data.sprites.front_default;
        let html = `<div value="${data.stats[0].base_stat}" class="card col-md-2" >
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body p-0 text-center">
                  <h6 class=" mx-0">${data.name}</h6>
                  <p class="card-text m-0">Health: <span class="health">${data.stats[0].base_stat}</span></p>
                  <p class="card-text m-0">Attack: <span class="attack">10</span></p>

                </div>
              </div>`;
        html = $(html);
        loadCount++;
        console.log(loadCount);

        $('.main-selection').append(html);
        loader(loadCount);
        if(loadCount === 4) {
          $('.main-selection').show();
          $('.main-selection').before('<h2 class="title">Choose your Pokemon!</h2>');
        }
      });
  }
}
