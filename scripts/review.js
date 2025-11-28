const products = [
{ id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
{ id: "fc-2050", name: "power laces", averagerating: 4.7 },
{ id: "fs-1987", name: "time circuits", averagerating: 3.5 },
{ id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
{ id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];


function parseQuery(){
const params = new URLSearchParams(location.search);
const data = {};
for(const [k,v] of params.entries()){
if(data[k] === undefined) data[k] = v;
else if(Array.isArray(data[k])) data[k].push(v);
else data[k] = [data[k],  v];
}
return data;
}