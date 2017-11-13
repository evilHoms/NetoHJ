const request = new XMLHttpRequest();
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.send();

request.addEventListener(`load`, handleResponse);

function handleResponse() {
  if (request.status === 200) {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
}