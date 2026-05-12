let loc = location.search.split("&")[1];
let locat = loc.split("=")[1];

let btn = document.querySelector(".button");
let div = document.querySelector(".container");
let body = document.querySelector("body");

let timer = document.querySelector(".Timer");
let score = document.querySelector("#score");
let kill = document.querySelector(".kill");

let birdos = document.querySelector("#birds");
let bomb = document.querySelector(".bomb");

let po = document.getElementById("po");
let names = document.querySelector(".name");

let containers = document.querySelector(".containers");
let pop = document.querySelector(".popup");

let btn2 = document.querySelector("body > div.containers > div > button");
let btn3 = document.querySelector("body > div.popup > button");

let scoreTotal = document.querySelector("body > div.containers > div > span");
let winscore = document.querySelector("body > div.popup > span");

let x = 0;
let k = 0;

let min = 60; // FIXED start time

let ids; // timer interval
let birdInterval;
let bombInterval;

score.innerText = `score: ${x}`;
kill.innerText = `Birds Killed: ${k}`;

po.innerHTML += locat;
names.innerHTML += locat;

window.onload = function () {

    btn2.onclick = () => location.reload();
    btn3.onclick = () => location.reload();

    btn.onclick = function () {

        div.style.display = "none";

        // ================= TIMER =================
        function count() {
            if (min > 0) {
                min--;
                timer.innerText = `Time Limit ${min}`;
            } else {
                endGame();
            }
        }

        ids = setInterval(count, 1000);

        // ================= END GAME =================
        function endGame() {

            clearInterval(ids);
            clearInterval(birdInterval);
            clearInterval(bombInterval);

            let finalScore = x;

            localStorage.setItem("name", po.innerText);
            localStorage.setItem("score", finalScore);

            if (finalScore > 50) {
                pop.style.display = "block";
                winscore.innerText = `Your final score: ${finalScore}`;
            } else {
                containers.style.display = "block";
                scoreTotal.innerText = `Your final score: ${finalScore}`;
            }
        }

        // ================= BIRDS =================
        const generateBirds = function () {

            birdInterval = setInterval(function () {

                let ranBird = Math.floor(Math.random() * 3 + 1);

                let bird = document.createElement("img");
                bird.src = `images/${ranBird}.gif`;
                bird.classList.add("bird");
                birdos.appendChild(bird);

                let height = Math.random() * (window.innerHeight - 100);
                bird.style.top = height + "px";
                bird.style.left = "0px";

                let left = 0;

                let move = setInterval(function () {
                    left += 10;
                    bird.style.left = left + "px";

                    if (left > window.innerWidth) {
                        clearInterval(move);
                        bird.remove();
                    }
                }, 30);

                bird.onclick = function () {

                    if (min <= 0) return;

                    if (bird.src.includes("3.gif")) {
                        x += 5;
                    } else if (bird.src.includes("1.gif")) {
                        x += 10;
                    } else {
                        x -= 10;
                    }

                    k++;

                    score.innerText = `score: ${x}`;
                    kill.innerText = `Birds Killed: ${k}`;

                    bird.remove();
                };

            }, 600);
        };

        // ================= BOMBS =================
        const generateBomb = function () {

            bombInterval = setInterval(function () {

                let bombs = document.createElement("img");
                bombs.src = `images/bomb/1.png`;
                bombs.classList.add("bombImg");

                bomb.appendChild(bombs);

                let width = Math.random() * (window.innerWidth - 50);
                bombs.style.left = width + "px";
                bombs.style.top = "0px";

                let top = 0;

                let fall = setInterval(function () {
                    top += 10;
                    bombs.style.top = top + "px";

                    if (top > window.innerHeight) {
                        clearInterval(fall);
                        bombs.remove();
                    }

                }, 100);

                bombs.onclick = function () {

                    let birds = document.querySelectorAll(".bird");

                    birds.forEach(bird => {

                        let bx = parseInt(bird.style.left);
                        let by = parseInt(bird.style.top);

                        let ox = parseInt(bombs.style.left);
                        let oy = parseInt(bombs.style.top);

                        let distance = Math.sqrt(
                            Math.pow(bx - ox, 2) + Math.pow(by - oy, 2)
                        );

                        if (distance < 300) {

                            if (bird.src.includes("3.gif")) {
                                x += 5;
                            } else if (bird.src.includes("1.gif")) {
                                x += 10;
                            } else {
                                x -= 10;
                            }

                            k++;

                            score.innerText = `score: ${x}`;
                            kill.innerText = `Birds Killed: ${k}`;

                            bird.remove();
                        }
                    });

                    bombs.remove();
                };

            }, 2000);
        };

        // START GAME
        generateBirds();
        generateBomb();
    };
};
