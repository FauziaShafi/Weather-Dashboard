var searchInput = document.querySelector("#searchInput");
var submitBtn = document.querySelector(".searchBtn");
var resultDiv = document.querySelector("#container-city");
var buttonDiv = document.querySelector(".buttonDiv");
var cityArray = [];
var titleEl;

var userInput= function () {
  resultDiv.textContent = "";
   
 var cityName= searchInput.value;
 
   cityArray.push(cityName);
   localStorage.setItem("nameOfCity", JSON.stringify(cityArray));
   
  getCoords(cityName);
   renderCity();
   
}

function getCoords(search) {
  
    var requestUrl =
      "https://api.openweathermap.org/geo/1.0/direct?q=" +
      search +
      "&limit=1&appid=239529aec488e9d55251f62f4ce517fd";
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
         
        fetchWeather(data[0].lat, data[0].lon, search);
      });
  }


  function fetchWeather(lat, lon ,cityName) {
    var requestUrl =
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,hourly,alerts&appid=239529aec488e9d55251f62f4ce517fd&units=imperial";
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log("fetchWeather -data --");
       
        //create div with class row
        var divCity = document.createElement("div");
        divCity.classList.add("col-md-9");
        var divRow1 = document.createElement("div");
        divRow1.classList.add("row");

        var divClass = document.createElement("div");
        divClass.classList.add("col-12", "d-flex", "flex-column", "justify-content-center","p-3");
        var timeToday =data.current.dt;
        const dateToday = new Date(timeToday*1000).toLocaleDateString("en-US");

         titleEl = document.createElement('h3');
       
       
        titleEl.textContent = cityName;
        titleEl.innerHTML = cityName + " ( " + dateToday  + ")";
       console.log("city Name ",cityName );
       var bodyContentEl = document.createElement('p');
       
       bodyContentEl.innerHTML =
         '<strong>Temp:</strong> ' + data.current.temp + ' F' + '<br/>' + 
         '<strong>Wind:</strong> ' + data.current.wind_speed + ' MPH'+ '<br/>' + 
         '<strong>Humidity:</strong> ' + data.current.humidity + ' %'+'<br/>' + 
         '<strong>UV Index:</strong> ' + data.current.uvi ;
          

        // AppendElements
         resultDiv.append(divCity);
         divCity.append(divRow1);
         divRow1.append(divClass);
         divClass.append(titleEl);
         divClass.append(bodyContentEl);

// forcast div

          var secondRow = document.createElement("div");
            secondRow.classList.add("row","m-3");
            secondRow.innerHTML = "<h3> 5-day Forcast-</h3>" ;

            resultDiv.append(secondRow);

            var thirdRow = document.createElement("div");
            thirdRow.classList.add("row","m-3");
            resultDiv.append(thirdRow);
            
           

         for(var i= 1; i< 6 ; i++) {
            //  secondRow.innerHTML = "";
            
            var timeEl =data.daily[i].dt;
               const date = new Date(timeEl*1000).toLocaleDateString("en-US");

            
            var forCastRow = document.createElement("div");
            forCastRow.classList.add("col-2", "d-flex","flex-column","m-3","forcast", "p-2" );
            forCastRow.innerHTML = 
            '<span>Date:<span> ' + date + '<br/>' + 
            
            '<span>Temp:<span> ' + data.daily[i].temp.day + ' F'  + '<br/>' +
            '<span>Wind:</span> ' + data.daily[i].wind_speed + ' MPH'+ '<br/>' + 
            '<span>Humidity:</span> ' + data.daily[i].humidity  ;
            thirdRow.append(forCastRow);
           
            
         }
         
    
      });
  }
// Create buttons  

  function renderCity() {
      console.log("Render city function---")
      buttonDiv.innerHTML = "";
     
    for (var i = 0; i <cityArray.length; i++) {
        var city = cityArray[i];
        var btn = document.createElement("button");
        btn.textContent = city;
        btn.classList.add("btn", "btn-block", "m-2","cityBtn");
       
        buttonDiv.appendChild(btn);
      }
  
  }
  
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    userInput();
})

buttonDiv.addEventListener("click", function(event) {
  if(event.target.matches("button")) {
    var query = event.target.textContent;
    resultDiv.textContent = "";
    getCoords(query);

  }
})
