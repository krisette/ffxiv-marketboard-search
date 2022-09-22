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
      itemIds = data.Results[0].ID});

    const urlUniversalis = `https://universalis.app/api/v2/${worldDcRegion}/${itemIds}?listings=10`;
    fetch(urlUniversalis)
      .then(response => response.json())
      .then(data => {
        const listings = data['listings'];
        if (data['listings'] === undefined) {
          const div = document.createElement('div');
          div.setAttribute('class', 'listing')
          const noPostings = document.createElement('span')
          noPostings.setAttribute('id', 'noPostings')
          noPostings.innerText = 'No Postings on Auction House';
          div.append(noPostings);
          document.querySelector('.results').append(div)
        }
        console.log(listings);
        for (let i = 0; listings.length > 0; i++) {
          const div = document.createElement('div');
          // give the div a class of .listing
          div.setAttribute('class', 'listing');
          // create span element with id 'username'
          const pricePerUnit = document.createElement('span');
          pricePerUnit.setAttribute('id', 'pricePerUnit');
          const quantity = document.createElement('span');
          quantity.setAttribute('id', 'quantity');
          const worldName = document.createElement('span');
          worldName.setAttribute('id', 'worldName');
          // assign the innerText of the messages to the current data's message key value
          pricePerUnit.innerText = `Price: ${listings[i].pricePerUnit}`
          quantity.innerText = `Quantity: ${listings[i].quantity}`;
          worldName.innerText = `World: ${listings[i].worldName}`;
          // append the div to the div with the id #chatbox
          div.append(pricePerUnit, quantity, worldName);
          document.querySelector('.results').append(div);
        }
      })
      .catch(error => console.log(error));
  });
});
