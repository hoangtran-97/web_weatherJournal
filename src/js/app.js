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

const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=5c0b432177045e7711375fd8ddaf789c";
//if no country code > default to USA
const zip = "00400,fi";
const URL_GET_ZIP = baseURL + zip + apiKey
const getWeatherByZip = async () => {
    const response = await fetch(URL_GET_ZIP)
    try {
        const data = await response.json();
        console.log(data);
    }
    catch (error) {
        console.log("error", error)
    }
}
getWeatherByZip()

const postData = async (url = '', data = {}) => {
    console.log(data)
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
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

//postData('/test', { animal: 'lion' })