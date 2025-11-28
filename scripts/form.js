// Product data
const products = [
{ id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
{ id: "fc-2050", name: "power laces", averagerating: 4.7 },
{ id: "fs-1987", name: "time circuits", averagerating: 3.5 },
{ id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
{ id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];


function populateProducts(){
const select = document.getElementById('product');
products.forEach(p => {
const opt = document.createElement('option');
opt.value = p.id; // stable id
opt.textContent = p.name;
select.appendChild(opt);
});
}


window.addEventListener('DOMContentLoaded', () => {
populateProducts();


// Improve radio keyboard accessibility
document.querySelectorAll('.radio input').forEach(inp => {
inp.addEventListener('keydown', (e) => {
if(e.key === 'ArrowLeft' || e.key === 'ArrowUp'){
e.preventDefault();
const prev = inp.parentElement.previousElementSibling?.querySelector('input');
if(prev) prev.focus();
}
if(e.key === 'ArrowRight' || e.key === 'ArrowDown'){
e.preventDefault();
const next = inp.parentElement.nextElementSibling?.querySelector('input');
if(next) next.focus();
}
});
});
});
  