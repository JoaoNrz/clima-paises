const container=document.querySelector('.container');
const search=document.querySelector('.search-box button');
const weatherBox=document.querySelector('.weather-box');
const weatherDetails=document.querySelector('.weather-details');
const error404=document.querySelector('.not-found');

search.addEventListener('click', () => {
    const APIKey = '8d0b5b305a18b1b4aba7e40bf701150e';
    const city = document.querySelector('.search-box input').value;

    if(city==='')
        return;

        console.log("vai");
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&lang=pt_br`)
        .then(response => response.json())
        .then(json => {

        if(json.cod === '404')
        {
            container.style.heigth='400px';
            weatherBox.style.display='none';
            weatherDetails.style.display='none';
            error404.style.display='block';
            error404.classList.add('fadeIn');
            return;
        }
        error404.style.display='none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperatura=document.querySelector('.weather-box .temperatura');
        const descricao=document.querySelector('.weather-box .descricao');
        const humidade=document.querySelector('.weather-details .humidade span');
        const ventos=document.querySelector('.weather-details .ventos span');

        switch(json.weather[0].main)
        {
            case 'Clear':
                image.src=  "images/clear.png";
                break;
            
            case 'Clouds':
                image.src = 'images/cloud.png';
                break;
            
            case 'Haze':
                image.src ='images/mist.png';
                break;

            case 'Rain':
                image.src='images/rain.png';
                break;

            case 'Snow':
                image.src='images/snow.png';
                break;

            default:
                image.src = '';
        }

        temperatura.innerHTML = `${parseInt(json.main.temp)}<span>ºF</span>`;
        descricao.innerHTML=`${json.weather[0].description}`;
        humidade.innerHTML=`${json.main.humidity}%`;
        ventos.innerHTML=`${parseInt(json.wind.speed)}Km/h`;

        weatherBox.style.display='';
        weatherDetails.style.display='';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height="700px";


    });


});