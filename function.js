let locat = "Guest";

if (location.search && location.search.includes("=")) {
    let params = location.search.split("&")[1];
    if (params) {
        locat = params.split("=")[1] || "Guest";
    }
}

// ================= ELEMENTS =================
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

// ================= GAME STATE =================
let x = 0;
let k = 0;

let min = 60;

let gameOver = false;

let ids;
let birdInterval;
let bombInterval;

// ================= UI INIT =================
score.innerText = `score: ${x}`;
kill.innerText = `Birds Killed: ${k}`;

po.textContent = locat;
names.textContent = locat;

// ================= RESTART =================
window.onload = function () {

    btn2.onclick = () => location.reload();
    btn3.onclick = () => location.reload();

    btn.onclick = function () {

        div.style.display = "none";

        startGame();
    };
};

// ================= START GAME =================
function startGame() {

    gameOver = false;
    min = 60;
    timer.innerText = `Time Limit ${min}`;
    x = 0;
    k = 0;

    score.innerText = `score: ${x}`;
    kill.innerText = `Birds Killed: ${k}`;

    // ================= TIMER =================
    function count() {
        if (gameOver) return;

        if (min > 0) {
            min--;
            timer.innerText = `Time Limit ${min}`;
        }

        if (min === 0) {
            endGame();
        }
    }

    ids = setInterval(count, 1000);

    // ================= END GAME =================
    function endGame() {

        gameOver = true;

        clearInterval(ids);
        clearInterval(birdInterval);
        clearInterval(bombInterval);

        document.querySelectorAll(".bird").forEach(e => e.remove());
        document.querySelectorAll(".bombImg").forEach(e => e.remove());

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
    function generateBirds() {

        birdInterval = setInterval(function () {

            if (gameOver) return;

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

                if (gameOver) {
                    clearInterval(move);
                    return;
                }

                left += 10;
                bird.style.left = left + "px";

                if (left > window.innerWidth) {
                    clearInterval(move);
                    bird.remove();
                }

            }, 30);

            bird.onclick = function () {

                if (gameOver) return;

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
    }

    // ================= BOMBS =================
    function generateBomb() {

        bombInterval = setInterval(function () {

            if (gameOver) return;

            let bombs = document.createElement("img");
            bombs.src = `images/bomb/1.png`;
            bombs.classList.add("bombImg");

            bomb.appendChild(bombs);

            let width = Math.random() * (window.innerWidth - 50);
            bombs.style.left = width + "px";
            bombs.style.top = "0px";

            let top = 0;

            let fall = setInterval(function () {

                if (gameOver) {
                    clearInterval(fall);
                    return;
                }

                top += 10;
                bombs.style.top = top + "px";

                if (top > window.innerHeight) {
                    clearInterval(fall);
                    bombs.remove();
                }

            }, 100);

            bombs.onclick = function () {

                if (gameOver) return;

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
    }

    generateBirds();
    generateBomb();
}
