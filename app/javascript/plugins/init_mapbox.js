import mapboxgl from 'mapbox-gl';

const mapElement = document.getElementById('map');

const buildMap = () => {
  mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
  return new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10'
  });
};

const addMarkersToMap = (map, markers) => {
  markers.forEach((marker) => {
    new mapboxgl.Marker()
      .setLngLat([ marker.lng, marker.lat ])
      .addTo(map);
  });
};



const initMapbox = () => {
  const mapElement = document.getElementById('map');
  if (mapElement) {
     mapboxgl.accessToken = mapElement.dataset.mapboxApiKey;
    const map = buildMap();
    const markers = JSON.parse(mapElement.dataset.markers);
    markers.forEach((marker) => {
    new mapboxgl.Marker()
    .setLngLat([ marker.lng, marker.lat ])
    .addTo(map);
    });
    if (markers.length === 0) {
    map.setZoom(1);
    } else if (markers.length === 1) {
    map.setZoom(14);
    map.setCenter([markers[0].lng, markers[0].lat]);
    } else {
    const bounds = new mapboxgl.LngLatBounds();
    markers.forEach((marker) => {
    bounds.extend([marker.lng, marker.lat]);
    });
    map.fitBounds(bounds, { duration: 0, padding: 75 })
    }
  }
};

export { initMapbox };

