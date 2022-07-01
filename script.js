let theme = $(".theme");
let loader = $(".loader");
let txt = $(".ml10");
if (window.localStorage.theme == "dark") { document.body.classList.remove("light-theme");
  document.body.classList.add("dark-theme");
  theme.html("Light Mode");
} else {
  document.body.classList.add("light-theme");
  document.body.classList.remove("dark-theme");
  theme.html("Dark Mode");
}
$(document).ready(function () {
  let nav = $("#nav");
  let main = $("#main");
  let toggler = $(".toggler");
  let theme = $(".theme");
  $(theme).click(function () {
    // document.body.classList.toggle("dark-theme");
    if (document.body.classList.contains("dark-theme")) {
      theme.html("Dark Mode");
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
      window.localStorage.theme = "light";
    } else {
      theme.html("Light Mode");
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      window.localStorage.theme = "dark";
    }
  });
  $(toggler).click(function (e) {
    e.preventDefault();
    $(main).toggleClass("active");
    $(this).toggleClass("fa-times");
  });
});

let button = $(".button");
let inputValue = $(".inputValue");

let Feel = $("#feel");
let Humid = $("#humid");
let Wind = $("#wind");
let Pressure = $("#pressure");
let Name = $("#name");
let Temp = $("#temp");
let Descriprion = $("#description");
let Marker = $("#marker");
let Slash = $("#slash");
let Max = $("#max");
let Min = $("#min");
let Country = $("#country");
let Desc = $("#desc");
let Day = $("#day");
let More = $(".more");
let Time = $("#time");
let Direction = $("#direction");
let Img = $("#img");
More.hide();
Descriprion.hide();
Marker.hide();
Slash.hide();
$(document).ready(function () {
  $(window).on("resize", function (e) {
    checkScreenSize();
  });

  checkScreenSize();

  function checkScreenSize() {
    var newWindowWidth = $(window).width();
    if (newWindowWidth < 600) {
      $(inputValue).focusin(function (e) {
        e.preventDefault();
        $(".temp").addClass("hidden");
        $(".more").addClass("hidden");
      });
      $(inputValue).focusout(function (e) {
        e.preventDefault();
        $(".temp").removeClass("hidden");
        $(".more").removeClass("hidden");
      });
    } else {
      $(".temp").removeClass("hidden");
      $(".more").removeClass("hidden");
    }
  }
});

function getDirection(direction) {
  if (direction > 348.75 || direction <= 11.25) {
    direction = "N";
  } else if (direction > 11.25 && direction <= 33.75) {
    direction = "NNE";
  } else if (direction > 33.75 && direction <= 56.25) {
    direction = "NE";
  } else if (direction > 56.25 && direction <= 78.75) {
    direction = "ENE";
  } else if (direction > 78.75 && direction <= 101.25) {
    direction = "E";
  } else if (direction > 101.25 && direction <= 123.75) {
    direction = "ESE";
  } else if (direction > 123.75 && direction <= 146.25) {
    direction = "SE";
  } else if (direction > 146.25 && direction <= 168.75) {
    direction = "SSE";
  } else if (direction > 168.75 && direction <= 191.25) {
    direction = "S";
  } else if (direction > 191.25 && direction <= 213.75) {
    direction = "SSW";
  } else if (direction > 213.25 && direction <= 236.75) {
    direction = "SW";
  } else if (direction > 236.75 && direction <= 258.25) {
    direction = "WSW";
  } else if (direction > 258.25 && direction <= 281.75) {
    direction = "W";
  } else if (direction > 281.75 && direction <= 303.25) {
    direction = "WNW";
  } else if (direction > 303.25 && direction <= 326.75) {
    direction = "NW";
  } else if (direction > 326.75 && direction <= 348.75) {
    direction = "NNW";
  }
  return direction;
}

let date = new Date();
let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = weekdays[date.getDay()];
function setTime() {
  let date = new Date();
  let Hours = date.getHours();
  Hours == 0 ? (Hours = "12") : Hours;
  let Minutes = date.getMinutes();
  let Seconds = date.getSeconds();
  Seconds < 10 ? (Seconds = "0" + Seconds) : Seconds;
  Minutes < 10 ? (Minutes = "0" + Minutes) : Minutes;
  Hours > 12 ? (Hours -= 12) : Hours;
  Hours < 10 ? (Hours = "0" + Hours) : Hours;

  // console.log(Hours + ":" + Minutes);
  Time.html(Hours + ":" + Minutes + ":" + Seconds );
}
setTime();
setInterval(setTime, 1000);
let form = $(".input");
function clickButton() {
  click_event = jQuery.Event("click");
  $(Time).trigger(click_event);
}
function runScript(e) {
  //See notes about 'which' and 'key'
  if (e.keyCode == 13) {
    return false;
  }
}
function getLocation() {
  let lng, lat;
  navigator.geolocation.getCurrentPosition((position) => {
    lng = position.coords.longitude;
    lat = position.coords.latitude;
  });
  var popup = $("#popup-wrapper");

  if (lat == null && window.localStorage.lat == null) {
    // alert("GPS not activated!");
    let error = $("#err");
    error.html("Please enable the GPS.");

    popup.addClass("show");
  } else {
    popup.removeClass("show");
  }
}
getLocation();

function stars() {
  let count = 200;
  let scene = $("#nav");
  let i = 0;
  while (i < count) {
    let star = document.createElement("i");
    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);
    let duration = Math.random() * 10;
    let size = Math.random() * 2;

    star.style.left = x + "px";
    star.style.top = y + "px";
    star.style.width = 1 + size + "px";
    star.style.height = 1 + size + "px";
    star.style.animationDuration = 6 + duration + "s";
    star.style.animationDelay = duration + "s";

    scene.append(star);
    i++;
  }
}
stars();
// setInterval(clickButton, 1000);
// let api = `https://pro.openweathermap.org/data/2.5/forecast/climate?q=${inputValue},in&appid=b5f558462160da78810acd0bb997a9fd`;
form.submit(function (e) {
  txt.show();
  loader.show();
  e.preventDefault();
  // PLEASE USE YOUR OWN APPID!
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${inputValue.val()}&appid=b5f558462160da78810acd0bb997a9fd`
  )
    .then((response) => response.json())
    .then((data) => {
      clickButton();
      console.log(data);
      txt.hide();
      loader.hide();
      inputValue.val("");
      let max = Math.ceil(data.main.temp_min - 273.15);
      let min = Math.floor(data.main.temp_min - 273.15);
      let temp = Math.floor(data.main.temp - 273.15);
      let desc = data.weather[0].main;
      let name = data.name;
      let country = data.sys.country;
      let feel = Math.floor(data.main.feels_like - 273.15);
      let humidity = data.main.humidity;
      let pressure = data.main.pressure;
      let wind = data.wind.speed;
      let direction = data.wind.deg;
      let img = data.weather[0].icon;
      Img.attr("src", `icons/${img}.png`);
      let dir = getDirection(direction);
      Direction.html(dir);

      More.show();
      Wind.html(wind);
      Feel.html(feel);
      Humid.html(humidity);
      Pressure.html(pressure);
      Name.html(name);
      Temp.html(temp + " <sup>°C</sup> ");
      Descriprion.show();
      Marker.show();
      Slash.show();
      Max.html(max + "°C");
      Min.html(min + "°C");
      Country.html(country);
      Desc.html(desc);
      Day.html(day);
    })
    .catch((err) => {
      let error = $("#err");
      error.html("No match found.");
      $("#popup-wrapper").addClass("show");
    });
});

$(document).ready(function () {
  let long;
  let lat;
  if (navigator.geolocation) {
    var storedValues = window.localStorage.long;
    if (!storedValues) {
      navigator.geolocation.getCurrentPosition((position) => {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        window.localStorage.lat = lat;
        window.localStorage.long = long;

        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b5f558462160da78810acd0bb997a9fd`;

        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            loader.hide();
            txt.hide();

            let max = Math.ceil(data.main.temp_min - 273.15);
            let min = Math.floor(data.main.temp_min - 273.15);
            let temp = Math.floor(data.main.temp - 273.15);
            let desc = data.weather[0].main;
            let name = data.name;
            let country = data.sys.country;
            let feel = Math.floor(data.main.feels_like - 273.15);
            let humidity = data.main.humidity;
            let pressure = data.main.pressure;
            let wind = data.wind.speed;
            let img = data.weather[0].icon;
            Img.attr("src", `icons/${img}.png`);
            More.show();
            let direction = data.wind.deg;

            let dir = getDirection(direction);
            Direction.html(dir);
            Wind.html(wind);
            Feel.html(feel);
            Humid.html(humidity);
            Pressure.html(pressure);
            Name.html(name);
            Temp.html(temp + " <sup>°C</sup> ");
            Descriprion.show();
            Marker.show();
            Slash.show();
            Max.html(max + "°C");
            Min.html(min + "°C");
            Country.html(country);
            Desc.html(desc);
            Day.html(day);
          });
        // fetch(
        //   `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=b5f558462160da78810acd0bb997a9fd`
        // )
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log(data);
        //     inputValue.val("");
        //   })
        //   .catch((err) => alert("Wrong"));
      });
    } else {
      let long = window.localStorage.long;
      let lat = window.localStorage.lat;
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b5f558462160da78810acd0bb997a9fd`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          loader.hide();
          txt.hide();
          let max = Math.ceil(data.main.temp_min - 273.15);
          let min = Math.floor(data.main.temp_min - 273.15);
          let temp = Math.floor(data.main.temp - 273.15);
          let desc = data.weather[0].main;
          let name = data.name;
          let country = data.sys.country;
          let img = data.weather[0].icon;
          Img.attr("src", `icons/${img}.png`);
          let feel = Math.floor(data.main.feels_like - 273.15);
          let humidity = data.main.humidity;
          let pressure = data.main.pressure;
          let wind = data.wind.speed;
          More.show();
          let direction = data.wind.deg;

          let dir = getDirection(direction);
          Direction.html(dir);
          Wind.html(wind);
          Feel.html(feel);
          Humid.html(humidity);
          Pressure.html(pressure);
          Name.html(name);
          Temp.html(temp + " <sup>°C</sup> ");
          Descriprion.show();
          Marker.show();
          Slash.show();
          Max.html(max + "°C");
          Min.html(min + "°C");
          Country.html(country);
          Desc.html(desc);
          Day.html(day);
        });
    }
  } else {
    alert("Please allow access to your location.");
  }
});
