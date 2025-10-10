const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
    "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Cape Town South Africa",
    location: "Cape Town, South Africa",
    dedicated: "2025, October, 25",
    area: 9500,
    imageUrl:"https://churchofjesuschristtemples.org/assets/img/temples/cape-town-south-africa-temple/cape-town-south-africa-temple-64609-main.jpg"
  },
  {
   templeName: "Cali Colombia",
    location: "Cali, Colombia",
    dedicated: "2025, March, 1",
    area: 9500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/cali-colombia-temple/cali-colombia-temple-22101-thumb.jpg"
  },
  {
    templeName: "Oslo Norway",
    location: "Oslo, Norway",
    dedicated: "2021, April, 5",
    area: 10000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/oslo-norway-temple/oslo-norway-temple-36303-main.jpg"
  }

];
// function to create temple cards

function createTempleCard(filteredTemples) {
  const container = document.querySelector('.divider');
  container.innerHTML = ''; // Clear before adding new cards

  filteredTemples.forEach(temple => {
    const card = document.createElement("section");
    const name = document.createElement("h3");
    const location = document.createElement("p");
    const dedicated = document.createElement("p");
    const area = document.createElement("p");
    const img = document.createElement("img");

    name.textContent = temple.templeName;
    location.innerHTML = `<span class="label"><strong>Location:</strong></span> ${temple.location}`;
    dedicated.innerHTML = `<span class="label"><strong>Dedicated:</strong></span> ${temple.dedicated}`;
    area.innerHTML = `<span class="label"><strong>Area:</strong></span> ${temple.area} sq ft`;

    img.src = temple.imageUrl;
    img.alt = `Image of ${temple.templeName}`;
    img.className = 'lazy-img';
    img.loading = 'lazy';
    img.width = 200;

    card.append(name, location, dedicated, area, img);
    container.appendChild(card);
  });
}

// Initial load
createTempleCard(temples);

// Utility to parse year from dedicated string
function getYear(dedicatedStr) {
  return parseInt(dedicatedStr.split(',')[0]);
}

// Event listeners
document.querySelector('#home').addEventListener('click', () => {
  createTempleCard(temples);
});

document.querySelector('#large').addEventListener('click', () => {
  createTempleCard(temples.filter(t => t.area > 10000));
});

document.querySelector('#small').addEventListener('click', () => {
  createTempleCard(temples.filter(t => t.area <= 10000));
});

document.querySelector('#old').addEventListener('click', () => {
  createTempleCard(temples.filter(t => getYear(t.dedicated) < 2000));
});

document.querySelector('#new').addEventListener('click', () => {
  createTempleCard(temples.filter(t => getYear(t.dedicated) >= 2000));
});

// Hamburger menu toggle
document.querySelector('#menu-button').addEventListener('click', () => {
  document.querySelector('.navigation').classList.toggle('open');
  document.querySelector('#menu-button').classList.toggle('open');
});

// Last modified
document.getElementById('lastModified').textContent = 'Last Modified: ' + document.lastModified;