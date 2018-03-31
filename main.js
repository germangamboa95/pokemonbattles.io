$(document).ready(function() {
  $('.main-selection').before('<h2 class="title">Choose your Pokemon!</h2>');
  createCards(5);


  $('.main-selection').on('click', '.card', function() {
    userSelection.card = this;
    $(userSelection.card).attr("data", 'user');
    userSelection.health = this.attributes.value.value;


    $('.title').hide();
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
  });

  $('.battle-spot').on('click', '.btn', function() {
    attack();
    addPower();
    $('[data="enemy"] .card-text .health').text(currentEnemy.health);
    $('[data="user"] .card-text .health').text(userSelection.health);
    $('[data="enemy"] .card-text .attack').text(currentEnemy.base_power);
    $('[data="user"] .card-text .attack').text(userSelection.curent_power);

    if (userSelection.health < 0) {
      $('body').html('<h1>YOU LOST <br> GAME OVER!</h1>');
    }
    if (currentEnemy.health < 0) {
      $('.dead').append(currentEnemy.card);
      $('.btn, .title').hide();
      $('.opponent-selection').append($('.waiting-room .card'));
      $('.chosen , .choose-opp').show();
      let remaining = $('.dead .card').length;
      $('.stats').hide();
      if(remaining == 3) {
        $('body').html('<h1>You Win!</h1>');
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
    <ul>
      <li>You took ${userSelection.curent_power} points from enemy!</li>
      <li>The enemy tool ${currentEnemy.base_power}</li>
    </ul>
  `;
  $('.stats').html(html);

}

function createCards(num) {

  for (let i = 0; i < num; i++) {
    //let id = Math.floor(Math.random() * 100);
    fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
      .then(res => res.json())
      .then(data => {
        let image = data.sprites.front_default;
        let html = `<div value="${data.stats[0].base_stat}" class="card col-md-3" >
                <img class="card-img-top" src="${image}" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">Health: <span class="health">${data.stats[0].base_stat}</span></p>
                  <p class="card-text">Attack: <span class="attack">10</span></p>

                </div>
              </div>`;
        html = $(html);

        $('.main-selection').append(html);
      });
  }
}
