//implemented with Darksky API, which will depreciate in 2021
window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    //fd9d9c6418c23d94745b836767721ad1
    //61bbaae2f63f32da32c845cdb2eea9a8
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            //cors: cross origin resource sharing
            //darksky does not allow api access from localhost, need to use cors-anywhere or look into jasonp
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const proxy1 = "https://cors-proxy.htmldriven.com/?url="
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            //fetch.then.then (runs only when you get info back)
            fetch(api)
                .then(response => {
                    //converse the response into json
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    //ES15 shorthand for data.currently.temperature + summary
                    const{temperature, summary, icon} = data.currently;
                    //set DOM elements from API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //set icon
                    setIcons(icon, document.querySelector(".icon"));
                });
        });

        
    }else{
        h1.textContent = "Browser unsupported";
    }
    //https://maxdow.github.io/skycons/
    // on Android, need to use : {"resizeClear": true}
    function setIcons(icon, iconID){
        //needs to format the json info to match icon name: convert - to _, then uppercase
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});