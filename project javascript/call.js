let store = localStorage.getItem("name")
let scor = localStorage.getItem("score")

let name = document.querySelector("body > div:nth-child(3) > h1:nth-child(1)")
let storeScore = document.querySelector("body > div:nth-child(3) > h1:nth-child(2)")

name.append(store);
storeScore.append(scor);