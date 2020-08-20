let menuButton = document.querySelector('.main-nav__button');
let mainMenu = document.querySelector('.main-nav__main-menu');
let userNav = document.querySelector('.main-nav__user-nav');

console.log(menuButton)

window.onload = function (evt) {
  if (menuButton.classList.contains('main-nav__button--hidden')) {
    menuButton.classList.remove('main-nav__button--hidden');
  }
  menuButton.classList.add('main-nav__button--burger');
  mainMenu.classList.add('main-nav__main-menu--closed');
  userNav.classList.add('main-nav__user-nav--closed');
}

menuButton.addEventListener('click', function (evt) {
  menuButton.classList.toggle('main-nav__button--burger');
  menuButton.classList.toggle('main-nav__button--cross');
  mainMenu.classList.toggle('main-nav__main-menu--closed');
  mainMenu.classList.toggle('main-nav__main-menu--open-over');
  userNav.classList.toggle('main-nav__user-nav--closed');
  userNav.classList.toggle('main-nav__user-nav--open-over');
});

ymaps.ready(function () {
  let north;
  let east;
  if (window.matchMedia('(min-width: 1150px)').matches) {
    north = 59.938822;
    east = 30.3229;
  } else if (window.matchMedia('(min-width: 768px)').matches) {
    north = 59.93876;
    east = 30.32285;
  } else {
    north = 59.93883;
    east = 30.322916;
  }

  const myMap = new ymaps.Map('map', {
    center: [north, east],
    zoom: 16
  }),
    myPin = new ymaps.Placemark([59.938635, 30.323118], {}, {
      iconLayout: 'default#image',
      iconImageHref: 'img/icon-map-pin.svg',
      iconImageSize: [66, 100],
      iconImageOffset: [-33, -100]
    });
  myMap.geoObjects.add(myPin);
});
