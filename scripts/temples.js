// Display last modified date in the footer
document.addEventListener('DOMContentLoaded', function() {
    var lastModifiedElem = document.getElementById('lastModified');
    if (lastModifiedElem) {
        lastModifiedElem.textContent = 'Last Modified: ' + document.lastModified;
    }
});

    document.getElementById('lastModified').textContent =
            'Last Modified: ' + document.lastModified;
const hamButton = document.querySelector('#menu-button');
const navigation = document.querySelector('.navigation');
const nav = document.querySelector('nav'); 

hamButton.addEventListener('click', () =>{
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});
