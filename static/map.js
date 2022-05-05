mapboxgl.accessToken = 'pk.eyJ1IjoiMTk3MDI4NDUiLCJhIjoiY2wycnk5ZHZkMDBxODNjb2JpNmZubHNqMiJ9.4Fd-52wvMYZgiKLdJr9p0w';
        var map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-0.54973125, 53.228848],
            zoom: 11
        });
        
map.addSource('map', {
type: 'geojson',
data: 'https://raw.githubusercontent.com/Connor-Bull/Lincolnshire-Crime-Analysis/main/data/map.geojson?token=GHSAT0AAAAAABUBG7BNIK2XRLTH45MRRU3IYTTZ7MQ'
});