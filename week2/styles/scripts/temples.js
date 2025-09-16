const hamButton = document.querySelector('#menu-button');
const navigation = document.querySelector('.navigation');
const nav = document.querySelector('nav'); // or use an id/class

hamButton.addEventListener('click', () =>{
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// Your code to update/manipulate the nav