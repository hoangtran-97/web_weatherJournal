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
    postData("/weather", weatherInfo).then(
        updateUI()
    )

}
document.getElementById("check-weather").addEventListener("click", () => getWeatherByZip());
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

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const projectData = await request.json();
        const { weather, main, name } = projectData
        const lottiePlayer = document.getElementById("lottie-player");
        console.log("projectData", projectData)
        document.getElementById('city').innerHTML = name;
        document.getElementById('city-temp').innerHTML = `${main.temp}&#176 C`;
        document.getElementById('city-description').innerHTML = weather[0].description;
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
    } catch (error) {
        console.log("error", error);
    }
}