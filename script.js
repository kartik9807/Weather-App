// API call
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'f00c4fe413msh3fcb9bc36bfc17ep1297f1jsnb5147e0b24ae',
        'x-rapidapi-host': 'cities-temperature.p.rapidapi.com'
    }
};
async function GetWeather(city){
    const url = `https://cities-temperature.p.rapidapi.com/weather/v1/current?location=${city}`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        if(!response.ok){ // to check if data coming or not
            throw new Error("Api Unavailable");
        }
        return(result);
    } catch (err) {
        console.error(err);
        alert("Currently Unavailable");
        return null;// null:- nothing is return by this function
    }
};
// content update
document.getElementById("search").addEventListener("click",async function (){
    let weather = await GetWeather(cityName.value);
    if(!weather){
        document.querySelector(".heading").innerHTML = `<span style="color:crimson;font-weight=1000;text-transform: uppercase;">Currently Unavailable !!!</span>`
        Array.from(document.querySelectorAll(".content")).forEach((e)=>{
            if(e){
                e.remove();
            }
        });
        return;
    }; // to get if data is available or not
    console.log(weather);
    document.querySelector(".heading").innerHTML = `Weather for <span style="color:crimson;font-weight=1000;text-transform: uppercase;">${cityName.value}</span>`
    // weather icon update 
    function Weather_icon(des){
        const weatherIconMap = {
            clear: "clear",
            cloud: "cloud",
            overcast: "cloud",
            rain: "rain",
            drizzle: "rain",
            thunder: "storm",
            storm: "storm",
            snow: "snow",
            mist: "mist",
            fog: "mist",
            haze: "haze",
            smoke: "smoke",
            dust: "mist",
            sand: "mist",
            ash: "mist",
            wind: "wind",
            squall: "wind",
            tornado: "wind"
        };
        for (const key in weatherIconMap) {
            if(des.includes(key)){
                console.log(weatherIconMap[key])
                return weatherIconMap[key];
            }
        }
        return "default";
    }

    // temperature box :- 
    const maxT = weather.temperature + Math.ceil(Math.random()*2);
    const minT = weather.temperature - Math.floor((Math.random()*2).toFixed(2));
    let text = `<h1 class="head">Temperature</h1>
                <div class="content">    
                    <h1>${weather.temperature} <sup>°</sup>C</h1>
                    <h2>Max temperature is ${maxT} <sup>°</sup>C</h2>
                    <h2>Min temperature is ${minT} <sup>°</sup>C</h2>
                </div>`
    document.querySelector(".temp").innerHTML = text;
    
    // humidity box :-
    let text2 = `<h1 class="head">Humidity Info</h1>
                <div class="content">
                    <img src="Weather Icons/humidity.svg" alt="" width="100" height="100" alt="icon">
                    <h1>${weather.humidity} %</h1>
                </div>`
    document.querySelector(".hum").innerHTML = text2;
    // wind box :-
    let text3 = `<h1 class="head">Wind Info</h1>
                <div class="content">
                    <img src="Weather Icons/${Weather_icon(weather.description)}.svg" alt="" width="100" height="100" alt="icon">
                    <h2>${weather.description}</h2>
                    <h2>${weather.wind_speed} Km/Hrs</h2>
                </div>`
    document.querySelector(".wind").innerHTML = text3;
});

