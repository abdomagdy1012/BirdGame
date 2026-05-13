let store = localStorage.getItem("name") || "unknown";
let scor = localStorage.getItem("score") || "0";

scor = Number(scor);

if (!store) store = "Player";
if (!scor) scor = 0;


let name = document.querySelector("body > div:nth-child(3) > h1:nth-child(1)");
let storeScore = document.querySelector("body > div:nth-child(3) > h1:nth-child(2)");

name.textContent = store;
storeScore.textContent = scor;
