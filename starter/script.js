'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = '') {
  const html = `<article class="country ${className}">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
  <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>⏲</span>${data.timezones[0]}</p>
    <p class="country__row"><span>🏛</span>${data.capital}</p>
    
  </div>
</article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};

/*
///////////////////////////////////////
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
  <img class="country__img" src="${data.flags.png}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${data.population}</p>
    <p class="country__row"><span>🗣️</span>${data.languages.ben}</p>
    <p class="country__row"><span>💰</span>${data.currencies.BDT.name}</p>
  </div>
</article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('Bangladesh');
getCountryData('Germany');
///////////////////////////////////////
*/

/*
///////////////////////////////////////

const getCountryAndNeighbour = function (country) {
  //AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    //Render country 1
    renderCountry(data);

    //Get neighbour country (2)
    const [neighbour] = data.borders;

    if(!neighbour) return;
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('Bangladesh');

//Another Callback Hell Example
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

*/

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// getCountryData('Bangladesh');
/////////////////////
/*
const getJSON = function (url, errMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errMsg} ${response.status}`);
    return response.json();
  });
};

// const getCountryData = function (country) {
//   //Country 1
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);

//       //Country (2)
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'dhshjs';

//       if (!neighbour) return;
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => {
//       if (!response.ok) throw new Error(`Country not found ${response.status}`);
//       return response.json();
//     })
//     .then(data => renderCountry(data[0], 'neighbour'))
//     .catch(err => {
//       console.error(`${err}🚫`);
//       renderError(`Something went wrong🚫 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };

// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

// getCountryData('ussdsdsa');
////////////////////

const getCountryData = function (country) {
  //Country 1
  return getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);

      //Country (2)
      const neighbour = data[0].borders[0];
      // const neighbour = 'dhshjs';

      if (!neighbour) throw new Error('NO neighbour found!!');
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.error(`${err}🚫`);
      renderError(`Something went wrong🚫 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('australia');
});
///////////////////////////////////////
*/
