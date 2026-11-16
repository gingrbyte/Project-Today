// ----------------- DOM Elements ----------------- \\

const weatherResult = document.querySelector("#weather-result");

// ----------------- Await API  ----------------- \\

const weather = async () => {
   try {
      const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,sunrise,sunset,uv_index_max&hourly=temperature_2m,weather_code,apparent_temperature,rain,precipitation");
      const weatherData = await response.json();

      console.log(weatherData);
      console.log(weatherData.hourly);


      const dataHourly = weatherData.hourly;

      const hourlyTime = dataHourly.time;
      const hourlyTemp = dataHourly.temperature_2m;
      const hourlyRain = dataHourly.rain;

      // console.log(hourlyTime, hourlyTemp, hourlyRain);

   // Get Date, Time, Temp, Rain
      hourlyTemp.forEach((temperature, index) => {
         const totalTime = hourlyTime[index];
         const timeConvert = new Date(hourlyTime[index]);
         const time = parseFloat(timeConvert.getHours());
         
      // Create Date-object
         const date = new Date(totalTime);
      // Create Day-Comparator
         const daysArr = [
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat"
         ]
         const day = daysArr[date.getDay()];

         const temp = hourlyTemp[index];
         const rain = hourlyRain[index];

         console.log(`
            ${day} | ${time} | ${temp}°C | ${rain} mm
         `);

// -----------------  Weather Card ----------------- \\
      //Custom Card Weather
         const cardBody = document.createElement("article");
         const cardTitle = document.createElement("h3");
         const cardList = document.createElement("ul");
         const cardListItem = document.createElement("li");

         weatherResult.appendChild(cardBody)
         cardBody.appendChild(cardTitle)
         cardBody.appendChild(cardList)
         cardList.appendChild(cardListItem)
         
         cardTitle.textContent += `${day}`;
         cardListItem.innerHTML += `${time}`;
         // cardListItem.innerHTML += `${time} | ${temp}°C | ${rain} mm`
         // cardListItem.innerHTML += `${time} | ${temp}°C | ${rain} mm`

      });
   }
   //ERROR
   catch(error) {
         console.log(error);
   }
};
// ----------------- Call Function ----------------- \\
weather();