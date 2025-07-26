let map = document.querySelector("#map");
if (map) {
    if ("undefined" !== typeof ymaps) ymaps.ready((() => initMainMap()));
    else console.warn("Yandex Maps API не загружено для карты #map");

    function initMainMap() {
        try {
            var myMap = new ymaps.Map("map", {
                center: [55.764592, 37.506199],
                zoom: 18,
                controls: ["zoomControl"],
                behaviors: ["drag"]
            }, {
                searchControlProvider: "yandex#search"
            });
            const placemark1 = new ymaps.Placemark([55.764592, 37.506199], {}, {
                iconLayout: "default#image",
                iconImageHref: "img/location.svg",
                iconImageSize: [40, 49],
                iconImageOffset: [20, -10]
            });
            myMap.geoObjects.add(placemark1);
        } catch (error) {
            console.error("Ошибка при инициализации карты #map:", error);
        }
    }
}