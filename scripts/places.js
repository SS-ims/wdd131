// Menu toggle functionality
const menuButton = document.getElementById('menu-button');
const navigation = document.querySelector('.navigation');

if (menuButton && navigation) {
    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('open');
        navigation.classList.toggle('open');
    });
}

// Calculate and display windchill in the .weather box
function calculateWindChill(temp, speed) {
  if (temp <= 50 && speed > 3) {
    // Windchill formula (Fahrenheit)
    return (
      35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16)
    ).toFixed(1);
  } else {
    return 'N/A';
  }
}

const tempElem = document.querySelector('.weather .temp');
const speedElem = document.querySelector('.weather .speed');
const windchillElem = document.querySelector('.weather .windchill');

if (tempElem && speedElem && windchillElem) {
  const temp = parseFloat(tempElem.textContent);
  const speed = parseFloat(speedElem.textContent);
  windchillElem.textContent = calculateWindChill(temp, speed);
}


const lastModifiedElem = document.getElementById('lastModified');
if (lastModifiedElem) {
  lastModifiedElem.textContent = 'Last Updated: ' + document.lastModified;
}
