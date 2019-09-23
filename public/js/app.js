const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    messageOne.textContent = 'loading forecast';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                messageTwo.textContent = '';
                return messageOne.textContent = 'There has been an error.\n' + data.error;
            }

            messageOne.textContent = `forecast for ${data.address}\r\n
                as in ${data.location} at longitude(istocno ili zapadno od grinic vesna): ${data.longitude}\r\n
                and latitude(severno ili juzno od ekvator, vesna): ${data.latitude}\r\n`;

            return messageTwo.textContent = `\n${data.forecast}`


            // let forecastDiv = document.getElementById('forecast');
            //
            // forecastDiv.innerHTML = '';
            //
            // if (data.error) {
            //     return forecastDiv.appendChild(document.createElement('P')
            //         .appendChild(document.createTextNode('There has been an error: ' + data.error)));
            // }
            //
            // return forecastDiv.appendChild(document.createElement('P')
            //     .appendChild(document.createTextNode(`forecast for ${data.address}
            //     as in ${data.location} at longitude: ${data.longitude}
            //     and latitude: ${data.latitude}:\n${data.forecast}`)));
        });
    });
});
