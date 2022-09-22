function clearBox(elementName) {
  document.querySelector(elementName).innerHTML = "";
}

// when button is clicked, GET https://universalis.app/api/v2/{worldDcRegion}/{itemIds}
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button');
  button.addEventListener('click', (e) => {
    e.preventDefault();
    clearBox('.results');
    let worldDcRegion = document.querySelector('#server').value;
    // let itemIds = also map it?
    let itemIdName = document.querySelector('#itemIds').value;
    const urlXIVAPI = `https://xivapi.com/search?indexes=item&string=${itemIdName}&string_algo=match`;
    fetch(urlXIVAPI)
    .then(response => response.json())
    .then(data => {
      itemIds = data.Results[0].ID;
      iconURL = data.Results[0].Icon;});

    const urlUniversalis = `https://universalis.app/api/v2/${worldDcRegion}/${itemIds}?listings=10`;
    fetch(urlUniversalis)
      .then(response => response.json())
      .then(data => {
        const listings = data['listings'];
        if (data['listings'] === undefined) {
          const div = document.createElement('div');
          div.setAttribute('class', 'listing');
          const noPostings = document.createElement('span');
          noPostings.setAttribute('id', 'noPostings');
          noPostings.setAttribute('style', 'color: #791723; font-weight: bold; text-align: center;');
          noPostings.innerText = 'No Postings on Market Board';
          div.append(noPostings);
          document.querySelector('.results').append(div)
        }
        // console.log(listings);
        for (let i = 0; listings.length > 0; i++) {
          const div = document.createElement('div');
          div.setAttribute('class', 'listing');
          const iconDiv = document.createElement('div');
          iconDiv.setAttribute('class', 'itemIcon');
          const icon = document.createElement('img');
          icon.setAttribute('src', 'http://xivapi.com' + iconURL);
          iconDiv.append(icon);
          const pricePerUnit = document.createElement('div');
          pricePerUnit.setAttribute('id', 'pricePerUnit');
          const quantity = document.createElement('div');
          quantity.setAttribute('id', 'quantity');
          const worldName = document.createElement('div');
          worldName.setAttribute('id', 'worldName');
          // assign the innerText of the messages to the current data's message key value
          pricePerUnit.innerHTML = `Price: <b>${listings[i].pricePerUnit}</b>`
          quantity.innerHTML = `Quantity: <b>${listings[i].quantity}</b>`;
          worldName.innerHTML = `World: <b>${listings[i].worldName}</b>`;
          // append the div to the div with the id #chatbox
          div.append(iconDiv, pricePerUnit, quantity, worldName);
          document.querySelector('.results').append(div);
        }
      })
      .catch(error => console.log(error));
  });
});
