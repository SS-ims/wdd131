// scripts/dubula.js
// This file is loaded with `defer` from the head for all pages in the project.
// Use this file for small page-level behaviors and to import other modules if needed.


(function(){
// Simple DOM-ready helper — when script is deferred the DOM is already parsed
function init(){
// Example: add click handlers for any CTA that should show a quick message
const ctas = document.querySelectorAll('.cta');
ctas.forEach(btn => {
btn.addEventListener('click', function(e){
// If the button is a link to a form or external service, the default will continue.
// For demonstration we show a non-blocking console message.
console.log('CTA clicked:', (btn.textContent||btn.innerText).trim());
});
});


// Placeholder for future enhancements: events loader, roster renderer, lazy-loading fallbacks
// Example function to be expanded into separate modules: loadEvents(); renderRoster();
}


// Deferred scripts run after parser; call init immediately
init();
})();