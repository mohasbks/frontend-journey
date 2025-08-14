const API_KEY = '7b0065499f904f3abee85032251408';
const API_BASE_URL = 'https://api.weatherapi.com/v1';

const citySelect = document.getElementById('citySelect');
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const customBtn = document.getElementById('customBtn');
const loading = document.getElementById('loading');
const weatherContent = document.getElementById('weatherContent');
const dateTimeElement = document.getElementById('dateTime');

function updateDateTime() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    dateTimeElement.textContent = now.toLocaleDateString('ar-EG', options);
}

async function getWeatherData(city) {
    try {
        loading.style.display = 'block';
        weatherContent.style.display = 'none';
        
        const currentResponse = await fetch(`${API_BASE_URL}/current.json?key=${API_KEY}&q=${city}&lang=ar`);
        const currentData = await currentResponse.json();
        
        const forecastResponse = await fetch(`${API_BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&lang=ar`);
        const forecastData = await forecastResponse.json();
        
        const astronomyResponse = await fetch(`${API_BASE_URL}/astronomy.json?key=${API_KEY}&q=${city}`);
        const astronomyData = await astronomyResponse.json();
        
        displayCurrentWeather(currentData, astronomyData);
        displayForecast(forecastData);
        
        loading.style.display = 'none';
        weatherContent.style.display = 'block';
    } catch (error) {
        loading.textContent = 'حدث خطأ في جلب البيانات';
        console.error('Error fetching weather data:', error);
    }
}

function displayCurrentWeather(data, astronomyData) {
    document.getElementById('cityName').textContent = data.location.name;
    document.getElementById('country').textContent = data.location.country;
    document.getElementById('temperature').textContent = Math.round(data.current.temp_c);
    document.getElementById('weatherIcon').src = data.current.condition.icon;
    document.getElementById('condition').textContent = data.current.condition.text;
    document.getElementById('humidity').textContent = data.current.humidity + '%';
    document.getElementById('windSpeed').textContent = data.current.wind_kph + ' كم/س';
    document.getElementById('feelsLike').textContent = Math.round(data.current.feelslike_c) + '°C';
    document.getElementById('pressure').textContent = data.current.pressure_mb + ' مليبار';
    document.getElementById('sunrise').textContent = astronomyData.astronomy.astro.sunrise;
    document.getElementById('sunset').textContent = astronomyData.astronomy.astro.sunset;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';
    
    data.forecast.forecastday.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('ar-EG', { weekday: 'long' });
        
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <div class="forecast-date">${dayName}</div>
            <div class="forecast-icon">
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}">
            </div>
            <div class="forecast-temp">${Math.round(day.day.avgtemp_c)}°C</div>
            <div class="forecast-temp-range">
                ${Math.round(day.day.mintemp_c)}° - ${Math.round(day.day.maxtemp_c)}°
            </div>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}

searchBtn.addEventListener('click', () => {
    let city;
    if (cityInput.style.display === 'none') {
        city = citySelect.value;
    } else {
        city = cityInput.value.trim();
    }
    if (city) {
        getWeatherData(city);
    }
});

customBtn.addEventListener('click', () => {
    if (cityInput.style.display === 'none') {
        citySelect.style.display = 'none';
        cityInput.style.display = 'block';
        customBtn.textContent = 'المدن المصرية';
        cityInput.focus();
    } else {
        citySelect.style.display = 'block';
        cityInput.style.display = 'none';
        customBtn.textContent = 'مدينة أخرى';
    }
});

citySelect.addEventListener('change', () => {
    getWeatherData(citySelect.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        }
    }
});

updateDateTime();
setInterval(updateDateTime, 60000);
getWeatherData('Cairo');
