
  const geoApiUrl = 'https://api.opencagedata.com/geocode/v1/json?';
  const geoApiKey = 'b3089684ec6d40349472c534a20d58fc';
  const islamicUrl = 'http://api.aladhan.com/v1/timings/';
  const cityInput = document.querySelector('.cityinput');
  const cityButton = document.querySelector('.citybutton');
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1; // JS months start at 0
  let year = currentDate.getFullYear();
  let currentHour = currentDate.getHours();
  let currentMinutes = currentDate.getMinutes();
  const timestamp = new Date().getTime();
  const url = `https://example.com/api/data?timestamp=${timestamp}`;

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  let formattedDate = day + "-" + month + "-" + year;

  async function getCoordinates(city){
    const response1 = await fetch(geoApiUrl + 'q=' + city + '&key=' + geoApiKey);
    const data1 = await response1.json();
      
    console.log(data1);
  
    const latitude = data1.results[0].geometry.lat;
    const longitude = data1.results[0].geometry.lng;

    const response2 = await fetch(islamicUrl + formattedDate + '?latitude=' + latitude + '&longitude=' + longitude + '&method=12');
    const data2 = await response2.json();
      
    console.log(data2);


    fajrTime = data2.data.timings.Fajr;
    sunriseTime = data2.data.timings.Sunrise;
    dhuhrTime = data2.data.timings.Dhuhr;
    asrTime = data2.data.timings.Asr;
    maghribTime = data2.data.timings.Maghrib;
    ishaTime = data2.data.timings.Isha;

    const [fajrHoursString, fajrMinutesString] = fajrTime.split(':');
    fajrHours = parseInt(fajrHoursString);
    fajrMinutes = parseInt(fajrMinutesString);

    const [sunriseHoursString, sunriseMinutesString] = sunriseTime.split(':');
    sunriseHours = parseInt(sunriseHoursString);
    sunriseMinutes = parseInt(sunriseMinutesString);

    const [dhuhrHoursString, dhuhrMinutesString] = dhuhrTime.split(':');
    dhuhrHours = parseInt(dhuhrHoursString);
    dhuhrMinutes = parseInt(dhuhrMinutesString);

    const [asrHoursString, asrMinutesString] = asrTime.split(':');
    asrHours = parseInt(asrHoursString);
    asrMinutes = parseInt(asrMinutesString);
    
    const [maghribHoursString, maghribMinutesString] = maghribTime.split(':');
    maghribHours = parseInt(maghribHoursString);
    maghribMinutes = parseInt(maghribMinutesString);

    const [ishaHoursString, ishaMinutesString] = ishaTime.split(':');
    ishaHours = parseInt(ishaHoursString);
    ishaMinutes = parseInt(ishaMinutesString);

    document.querySelector('.date').innerHTML = data2.data.date.readable;
    document.querySelector('.fajr').innerHTML = 'Koha e Sabahut: ' + data2.data.timings.Fajr;
    document.querySelector('.sunrise').innerHTML = 'Lindja e Diellit: ' +  data2.data.timings.Sunrise;
    document.querySelector('.dhuhr').innerHTML = 'Koha e Drekës: ' +  data2.data.timings.Dhuhr;
    document.querySelector('.asr').innerHTML = 'Koha e Ikindisë: ' +  data2.data.timings.Asr;
    document.querySelector('.maghrib').innerHTML = 'Koha e Akshamit: ' +  data2.data.timings.Maghrib;
    document.querySelector('.isha').innerHTML = 'Koha e Jacisë: ' +  data2.data.timings.Isha;

    if (currentHour < fajrHours || (currentHour === fajrHours && currentMinutes < fajrMinutes)) {   
      let countdownInterval = setInterval(() => {
        let countdownHours = fajrHours - currentHour;
        let countdownMinutes = fajrMinutes - currentMinutes;
    
        if (countdownMinutes < 0) {
          countdownMinutes += 60;
          countdownHours -= 1;
          document.querySelector('.countdown').innerHTML = 'Sabahu edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }
        else {
          document.querySelector('.countdown').innerHTML = 'Sabahu edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }
        
    
        currentHour = new Date().getHours();
        currentMinutes = new Date().getMinutes();
    
        if (currentHour >= fajrHours && currentMinutes >= fajrMinutes) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }

    else if ((currentHour > fajrHours || (currentHour === fajrHours && currentMinutes > fajrMinutes)) && (currentHour < sunriseHours || (currentHour === sunriseHours && currentMinutes < sunriseMinutes))) {   
      let countdownInterval = setInterval(() => {
        let countdownHours = sunriseHours - currentHour;
        let countdownMinutes = sunriseMinutes - currentMinutes;
    
        if (countdownMinutes < 0) {
          countdownMinutes += 60;
          countdownHours -= 1;
          document.querySelector('.countdown').innerHTML = 'Lindja e Diellit edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }

        else if (countdownHours === 0) {
          document.querySelector('.countdown').innerHTML = 'Lindja e Diellit edhe&nbsp;<b>' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }

        else {
          document.querySelector('.countdown').innerHTML = 'Lindja e Diellit edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }
        
    
        currentHour = new Date().getHours();
        currentMinutes = new Date().getMinutes();
    
        if (currentHour >= sunriseHours && currentMinutes >= sunriseMinutes) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }

    else if ((currentHour > sunriseHours || (currentHour === sunriseHours && currentMinutes > sunriseMinutes)) && (currentHour < dhuhrHours || (currentHour === dhuhrHours && currentMinutes < dhuhrMinutes))) {   
      let countdownInterval = setInterval(() => {
        let countdownHours = dhuhrHours - currentHour;
        let countdownMinutes = dhuhrMinutes - currentMinutes;
    
        if (countdownMinutes < 0) {
          countdownMinutes += 60;
          countdownHours -= 1;
          document.querySelector('.countdown').innerHTML = 'Dreka edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }

        else if (countdownHours === 0) {
          document.querySelector('.countdown').innerHTML = 'Lindja e Diellit edhe&nbsp;<b>' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }

        else {
          document.querySelector('.countdown').innerHTML = 'Dreka edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }
        
    
        currentHour = new Date().getHours();
        currentMinutes = new Date().getMinutes();
    
        if (currentHour >= dhuhrHours && currentMinutes >= dhuhrMinutes) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
    
    else if ((currentHour > dhuhrHours || (currentHour === dhuhrHours && currentMinutes > dhuhrMinutes)) && (currentHour < asrHours || (currentHour === asrHours && currentMinutes < asrMinutes))) {   
      let countdownInterval = setInterval(() => {
        let countdownHours = asrHours - currentHour;
        let countdownMinutes = asrMinutes - currentMinutes;
    
        if (countdownMinutes < 0) {
          countdownMinutes += 60;
          countdownHours -= 1;
          document.querySelector('.countdown').innerHTML = 'Ikindia edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }

        else if (countdownHours === 0) {
          document.querySelector('.countdown').innerHTML = 'Lindja e Diellit edhe&nbsp;<b>' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }

        else {
          document.querySelector('.countdown').innerHTML = 'Ikindia edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }
        
    
        currentHour = new Date().getHours();
        currentMinutes = new Date().getMinutes();
    
        if (currentHour >= asrHours && currentMinutes >= asrMinutes) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
    
    else if ((currentHour > asrHours || (currentHour === asrHours && currentMinutes > asrMinutes)) && (currentHour < maghribHours || (currentHour === maghribHours && currentMinutes < maghribMinutes))) {   
      let countdownInterval = setInterval(() => {
        let countdownHours = maghribHours - currentHour;
        let countdownMinutes = maghribMinutes - currentMinutes;
    
        if (countdownMinutes < 0) {
          countdownMinutes += 60;
          countdownHours -= 1;
          document.querySelector('.countdown').innerHTML = 'Akshami edhe&nbsp;<b>' + countdownHours + ' orë e ' + '&nbsp;</b><b>minuta</b>';
        }

        else if (countdownHours === 0) {
          document.querySelector('.countdown').innerHTML = 'Lindja e Diellit edhe&nbsp;<b>' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }

        else {
          document.querySelector('.countdown').innerHTML = 'Akshami edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }
        
    
        currentHour = new Date().getHours();
        currentMinutes = new Date().getMinutes();
    
        if (currentHour >= maghribHours && currentMinutes >= maghribMinutes) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }
    
    else if ((currentHour > maghribHours || (currentHour === maghribHours && currentMinutes > maghribMinutes)) && (currentHour < ishaHours || (currentHour === ishaHours && currentMinutes < ishaMinutes))) {   
      let countdownInterval = setInterval(() => {
        let countdownHours = ishaHours - currentHour;
        let countdownMinutes = ishaMinutes - currentMinutes;
    
        if (countdownMinutes < 0) {
          countdownMinutes += 60;
          countdownHours -= 1;
          document.querySelector('.countdown').innerHTML = 'Jacia edhe&nbsp;<b>' + countdownHours + ' orë e ' + '&nbsp;</b><b>minuta</b>';
        }

        else if (countdownHours === 0) {
          document.querySelector('.countdown').innerHTML = 'Lindja e Diellit edhe&nbsp;<b>' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }

        else {
          document.querySelector('.countdown').innerHTML = 'Jacia edhe&nbsp;<b>' + countdownHours + ' orë e ' + countdownMinutes + '&nbsp;</b><b>minuta</b>';
        }
        
    
        currentHour = new Date().getHours();
        currentMinutes = new Date().getMinutes();
    
        if (currentHour >= ishaHours && currentMinutes >= ishaMinutes) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }

    else if (currentHour >= ishaHours || (currentHour === ishaHours && currentMinutes >= ishaMinutes)){
      document.querySelector('.countdown').innerHTML = '<b>Kohët e namazit kanë përfunduar!</b>';
    }
    
    

  };

  cityButton.addEventListener("click", ()=>{
    var container = document.querySelector('.container');
    getCoordinates(cityInput.value);
    container.style.display = 'flex';
    setTimeout(() => {
      container.style.opacity = 1;
    }, 10);
  });
  
  if (currentHour === 0 && currentMinutes === 0) {
    getCoordinates(cityInput.value);
  }
