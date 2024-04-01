
const API_KEY = '4a0b3aecc3e2ad0ccbbb28833de5dfaf'

const fetchData = position => {
    const {latitude, longitude} = position.coords
    fetch(`http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}


const setWeatherData = data => {
    console.log(data)
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    }

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key]
    })

    cleanUP()
}

const cleanUP = () => {
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')
    loader.style.display = 'none'
    container.style.display = 'flex'

}

const getDate = () => {
    const date = new Date()
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}
