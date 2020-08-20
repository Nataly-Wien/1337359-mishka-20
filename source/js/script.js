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
