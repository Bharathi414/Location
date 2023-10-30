const button = document.querySelector("button");

button.addEventListener("click", () =>
{
    if(navigator.geolocation)
    {
        button.innerHTML = "Allow to detect location";
        navigator.geolocation.getCurrentPosition(onsuccess, onerror);
    }
    else
    {
        button.innerHTML = "Your browser not supported"
    }
})

function onsuccess(position)
{
    button.innerHTML = "Detecting your location, Please wait";
    let {latitude, longitude} = position.coords;
    let apikey = "c828328f3524438cafae3f7aefa1c7d5";

    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apikey}`)
    .then(response => response.json()).then(result => {
        let alldetails = result.results[0].components;
        let {county, postcode, country} = alldetails;

        console.log(county, postcode, country);

        button.innerHTML = `${county} ${postcode} ${country}`;
    })
}

function onerror(error)
{
    if(error.code === 1)
    {
        button.innerHTML = "You denied the request"
    }
    else if(error.code === 2)
    {
        button.innerHTML = "You denied the request"
    }
    else
    {
        button.innerHTML = "Something went wrong"
    }
    button.setAttribute("disabled", "true");
}