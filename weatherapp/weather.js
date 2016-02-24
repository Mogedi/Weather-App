var units = "imperial";
var items= [];
var Ftest = 0;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getCoordinates, err);
    } else{
        alert("Your broswer doesn't support location detection.")
    }
}

function getCoordinates(position) {
    var current_latitude = position.coords.latitude;
    var current_longitude = position.coords.longitude;
    
    document.getElementById("title").innerHTML = "Weather App <hr>";
    
      
    var info = "http://api.openweathermap.org/data/2.5/weather?lat=" + current_latitude + "&lon=" + current_longitude + "&appid=44db6a862fba0b067b1930da0d769e98&units=" + units;
    
    
    
    $.ajax ({
            url: info,
            dataType: 'json',
            success: function (data) {
                items.push(data.main.temp);
                items.push(data.weather[0].main);
                items.push(data.name);
                items.push(data.sys.country);                
                
                var icon = document.getElementById("icon");
                var background = document.getElementById("container-fluid1");
                
                function icon_chose() {               
                    if (items[1] == "Clouds") {
                        document.getElementById("container-fluid1").style.backgroundImage = 'url("https://images.unsplash.com/photo-1448032279986-c25cf997c38e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=4c34d74f5aac6657ae12686e0888a003")';
                        return '<i class="wi wi-cloudy"></i>';
                    } else if (items[1] == "Rain") {
                        document.getElementById("container-fluid1").style.backgroundImage = 'url("https://images.unsplash.com/uploads/14116603688211a68546c/30f8f30b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=56050aee1473fa059ee4c04c78adf16d")';
                        return '<i class="wi wi-rain"></i>';
                    } else if (items[1] == "Thunderstorm") {
                        document.getElementById("container-fluid1").style.backgroundImage = 'url("https://images.unsplash.com/photo-1432927994002-af88b5da76a2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=2948999ac094b30d5889f02df306578e")';
                        return '<i class="wi wi-thunderstorm"></i>';
                    } else if (items[1] == "Snow") {
                        document.getElementById("container-fluid1").style.backgroundImage = 'url("https://images.unsplash.com/photo-1432057322224-8916b9ed202a?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=96ba854e20bae187d58f5a150ef331f6")';
                        return '<i class="wi wi-snow"></i>';
                    }  else if (items[1] == "Drizzle") {
                        document.getElementById("container-fluid1").style.backgroundImage = 'url("https://images.unsplash.com/photo-1428592953211-077101b2021b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=9d68a7748a61d3609c2f1417ab7fd7e0")';
                        return  '<i class="wi wi-rain-mix"></i>';
                    }  else if (items[1] == "Clear") {
                        document.getElementById("container-fluid1").style.backgroundImage = 'url("https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&s=8663f60a0fe57fed46dffc8c0ee2dd79")';
                        return '<i class="wi wi-day-sunny"></i>';
                    } else {    
                        return '<i class="wi wi-day-sunny"></i>';
                    }
                }
                
                
                $('<ul>', {
                    'class': 'interest-list',
                    html:items[2] + ', ' + items[3]
                    }).appendTo('#data');
                $('<ul>', {
                    'class': 'interest-list',
                    'id' : 'temp',
                    html: "Current Temp: " + items[0] + " F"
                    }).appendTo('#data');
                $('<ul>', {
                    'class': 'interest-list',
                    html: "Forecast: " + items[1]
                    }).appendTo('#data');
                $('<ul>', {
                    'class': 'interest-list',
                    'id' : 'icon',
                    html: icon_chose()
                    }).appendTo('#data');
                
                
               
                
            },
            statusCode :  {
                404 : function () {
                    alert("There is no data");
                }
            }
        });
        
}

function F(args) {
    console.log(items);
    if (Ftest == 1) {
        items[0] = ((items[0] * 1.8) + 32).toFixed(2);
    $( "#temp" ).replaceWith( "<ul id='temp'>Current Temp: " + items[0] + " F </ul>" ); 
    }
}
function C(args) {
    console.log(items);
    items[0] = ((items[0] - 32) / 1.8).toFixed(2);
    $( "#temp" ).replaceWith( "<ul id='temp'> Current Temp: " + items[0] + " C </ul>");
    Ftest = 1;
}


function err(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("access denied");
            break;
        case error.POSITION_UNAVALIBLE:
            alert("unavailible");
            break;
        case error.TIMEOUT:
            alert("timed out");
            break;
        case error.UNKNOWN_ERROR:
            alert("unknown");
            break;
    }
}


window.onload = function () {
    getLocation();
}


