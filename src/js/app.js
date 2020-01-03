const sections = document.querySelectorAll(".section")
const navigationBar = document.getElementById("navigation")
const navigationFragment = document.createDocumentFragment();

sections.forEach((section) => {
    const anchor = document.createElement("a");
    const anchorText = document.createTextNode(section.id);
    anchor.appendChild(anchorText);
    anchor.href = `#${section.id}`;
    anchor.id = `navigation-${section.id}`
    navigationFragment.appendChild(anchor);
})
navigationBar.appendChild(navigationFragment);

const baseURL = "api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=5c0b432177045e7711375fd8ddaf789c";
const zip = "00400";

const getWeatherByZip = async (baseURL, zip, apiKey) => {
    const response = await fetch(baseURL + zip + apiKey)
    try {
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log("error", error)
    }
}
getWeatherByZip()