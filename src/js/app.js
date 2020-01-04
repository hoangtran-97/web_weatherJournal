const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=5c0b432177045e7711375fd8ddaf789c";
const sections = document.querySelectorAll(".section")
const navigationBar = document.getElementById("navigation")
const navigationFragment = document.createDocumentFragment();
const lottie = {
    all: "https://assets8.lottiefiles.com/packages/lf20_kd7SIg.json",
    thunderstorm: "https://assets8.lottiefiles.com/temp/lf20_Kuot2e.json",
    drizzle: "https://assets2.lottiefiles.com/packages/lf20_xzgLBZ.json",
    rain: "https://assets10.lottiefiles.com/temp/lf20_rpC1Rd.json",
    snow: "https://assets5.lottiefiles.com/temp/lf20_WtPCZs.json",
    mist: "https://assets5.lottiefiles.com/temp/lf20_kOfPKE.json",
    clear: "https://assets8.lottiefiles.com/temp/lf20_Stdaec.json",
    clouds: "https://assets2.lottiefiles.com/temp/lf20_VAmWRg.json"
}

document.getElementById("check-weather").addEventListener("click", () => getWeatherByZip());
document.getElementById("generate").addEventListener("click", () => saveNewEntry());
//Nav bar
sections.forEach((section) => {
    const anchor = document.createElement("a");
    const anchorText = document.createTextNode(section.id);
    anchor.appendChild(anchorText);
    anchor.href = `#${section.id}`;
    anchor.id = `navigation-${section.id}`
    navigationFragment.appendChild(anchor);
})
navigationBar.appendChild(navigationFragment);

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

const getData = async (url = "") => {
    const response = await fetch(url, {
        method: "GET",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        }
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}

const getWeatherByZip = async () => {
    const zipcode = document.getElementById("zip").value;
    const countryCode = document.getElementById("country").value;
    let weatherInfo = {}
    if (!zipcode) {
        alert("Please Enter Zip Code!")
        return
    }
    const URL_GET_ZIP = `${baseURL}${zipcode},${countryCode}&units=metric${apiKey}`
    const response = await fetch(URL_GET_ZIP)
    try {
        weatherInfo = await response.json();
    }
    catch (error) {
        console.log("error", error)
    }
    weatherInfo.cod == 200 ?
        postData("/weather", weatherInfo).then(
            updateUI()
        ) :
        alert("City Not Found!")
}

const saveNewEntry = async () => {
    const zipcode = document.getElementById("zip").value;
    const entry = document.getElementById("feelings").value;
    if (!zipcode) {
        alert("Please Get The Weather Info First!")
        return
    }
    if (!entry) {
        alert("Please Enter Your Feelings!")
        return
    }
    const weatherString = document.getElementById("status-weather").innerHTML;
    const weather = weatherString.slice(5)
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const dateTime = `${day}/${month}/${year} - ${hour}:${minute}`;
    const newEntry = {};
    newEntry.dateTime = dateTime;
    newEntry.entry = entry;
    newEntry.weather = weather;
    document.getElementById("feelings").value = "";
    //entry.value = "";
    //i dont know why entry.value = "" does not work 
    postData("/entry", newEntry).then(
        updateUI()
    );
}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const projectData = await request.json();
        const { currentWeather, entries } = projectData
        const { weather, main, name } = currentWeather
        const lottiePlayer = document.getElementById("lottie-player");
        const statusIcon = document.getElementById("status-icon");
        statusIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}.png`
        console.log("projectData", projectData)
        document.getElementById("city").innerHTML = name;
        document.getElementById("city-temp").innerHTML = `${main.temp}&#176 C`;
        document.getElementById("city-description").innerHTML = weather[0].description;
        document.getElementById("status-weather").innerHTML = `It's ${main.temp}&#176 C, ${weather[0].description}`

        switch (weather[0].main) {
            case "Thunderstorm":
                lottiePlayer.load(lottie.thunderstorm)
                break;
            case "Drizzle":
                lottiePlayer.load(lottie.drizzle)
                break;
            case "Rain":
                lottiePlayer.load(lottie.rain)
                break;
            case "Snow":
                lottiePlayer.load(lottie.snow)
                break;
            case "Mist":
                lottiePlayer.load(lottie.mist)
                break;
            case "Clear":
                llottiePlayer.load(lottie.clear)
                break;
            case "Clouds":
                lottiePlayer.load(lottie.clouds)
                break;
            default:
                lottiePlayer.load(lottie.all)
        }
        lottiePlayer.setSpeed(1)
        if (entries) {
            updateUIHistory(entries)
        }
    } catch (error) {
        console.log("error", error);
    }
}
const updateUIHistory = (entries) => {
    const history = document.getElementById("history-list")
    history.innerHTML = ""
    const historyFragment = document.createDocumentFragment();
    const holderDate = document.getElementById("date")
    const holderTemp = document.getElementById("temp")
    const holderContent = document.getElementById("content")
    holderDate.innerHTML = entries[0].dateTime
    holderTemp.innerHTML = entries[0].weather
    holderContent.innerHTML = entries[0].entry
    entries.forEach((entry) => {
        const entryBlock = document.createElement("div")
        const dateTime = document.createElement("p")
        const entryContent = document.createElement("p")
        const weatherStatus = document.createElement("p")
        dateTime.innerHTML = entry.dateTime
        entryContent.innerHTML = entry.entry
        weatherStatus.innerHTML = entry.weather
        entryBlock.appendChild(dateTime)
        entryBlock.appendChild(weatherStatus)
        entryBlock.appendChild(entryContent)
        entryBlock.className = "entry-block"
        historyFragment.appendChild(entryBlock)
    })
    history.appendChild(historyFragment)


}
//fetch projectData if there is any
updateUI()