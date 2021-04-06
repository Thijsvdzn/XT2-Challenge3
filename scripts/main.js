// Set Mapbox api token
mapboxgl.accessToken = 'pk.eyJ1IjoidGhpanMxNDAzIiwiYSI6ImNrbWtqaDR6ZjExdm4ydnFvOGRsOTZxazYifQ.cbwaz9hmcENviMVMODDI1g';

// Initiate map
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [5.353663, 52.096382],
  zoom: 7,
});

// All functions when you click on the map
map.on('style.load', function() {
    map.on('click', function(e) {
        // Create all variables needed to get the api data
        var url = 'https://api.openweathermap.org/data/2.5/onecall';
        var apiKey ='33db5614cf82129b9d4a54cfc003037c';
        var coordinates = e.lngLat;
        
        // Everything to get the api working
        var request = url + '?lat=' + coordinates.lat + '&lon=' + coordinates.lng + '&appid=' + apiKey;
       
        fetch(request)

        .then(function(response) {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
	
        .then(function(response) {
            console.log(response);
            onAPISucces(response);
        })
	
        // If something goes wrong an error will de displayed
            .catch(function (error) {
            console.error('Request failed', error);
        });

        // If the api succeeded this function will run
        function onAPISucces(response) {
            // Get all relevant data for the popup
            var weather = response.current.weather[0].description;
            var temperature = Math.floor(response.current.temp - 273.15);
            var wind = response.current.wind_speed;
            
            

            // Put the lat and lng into a html element
            var weatherBox = document.getElementById('info');
            weatherBox.innerHTML = 'Coordinates for landing:<br>Lattitude = ' + coordinates.lat + '<br> Longitude = ' + coordinates.lng ;
            
            // Put the data into a popup
            if(wind > 5){
                var popup = new mapboxgl.Popup()
                    .setLngLat([coordinates.lng, coordinates.lat])
                    .setHTML('Temperature: ' + temperature + '&#176;C <br>Weather: ' + weather + "<br>Wind speed: " + wind + '<br> <strong>Not advisable to land</strong>')
                    .addTo(map);
            } else {
                var popup = new mapboxgl.Popup()
                    .setLngLat([coordinates.lng, coordinates.lat])
                    .setHTML('Temperature: ' + temperature + '&#176;C <br>Weather: ' + weather + "<br>Wind speed: " + wind + '<br><strong>Advisable to land</string>')
                    .addTo(map);  
            }
            

        
        }
    });
});