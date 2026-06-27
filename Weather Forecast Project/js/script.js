let main = document.getElementById("main");
let temp = document.getElementById("temp");
let city = document.getElementById("city");
let wind = document.getElementById("wind");
let humidity = document.getElementById("humidity");
let weatherIcon = document.getElementById("weather-icon");
let description = document.getElementById("description");

async function weather(c) {
  let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${c}&appid=0fde24f18909b27ce870124bbcdf96d5`;
  let res = await fetch(url);
  let data = await res.json();

  if (data.cod == "404") {
    alert("City Not Found. Please Enter Again.");
    document.querySelector("#search input").value = "";
    main.style.display = "none";
  } else {
    console.log(
      "Condition:",
      data.weather[0].main,
      "Description:",
      data.weather[0].description
    );
    temp.innerHTML = Math.round(data.main.temp) + "℃";
    city.innerHTML = data.name;
    wind.innerHTML = data.wind.speed + " km/h";
    humidity.innerHTML = data.main.humidity + "%";
    description.innerHTML = data.weather[0].description;
    main.style.display = "block";

    let condition = data.weather[0].main.toLowerCase();
    if (condition === "clear") icon = "clear.png";
    else if (condition === "clouds") icon = "clouds.png";
    else if (condition === "rain") icon = "rain.png";
    else if (condition === "drizzle") icon = "drizzle.png";
    else if (condition === "snow") icon = "snow.png";
    else if (["mist", "fog", "haze", "smoke"].includes(condition))
      icon = "mist.png";

    weatherIcon.src = `img/${icon}`;
  }
}

function search() {
  let n = document.querySelector("#search input");
  if (n.value.trim() == "") {
    alert("Please Enter City Name:");
  } else {
    weather(n.value.trim());
  }
}
