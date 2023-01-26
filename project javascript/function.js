
let loc = location.search.split("&")[1];
let locat = loc.split("=")[1];
let btn = document.querySelector(".button");
let div = document.querySelector(".container");
let body = document.querySelector("body");
let timer = document.querySelector(".Timer");
let score = document.querySelector("#score");
let scoreTotal = document.querySelector("body > div.containers > div > span")
let winscore = document.querySelector("body > div.popup > span")
let kill = document.querySelector(".kill");
let birdos = document.querySelector("#birds");
let bomb = document.querySelector(".bomb");
let po = document.getElementById("po"); // enter name
let names = document.querySelector(".name");
let containers = document.querySelector(".containers");
let pop =document.querySelector("body > div.popup")
let btn2 = document.querySelector("body > div.containers > div > button")
let btn3 = document.querySelector("body > div.popup > button")

let x = 0;
score.innerText += x;
let k = 0;
kill.innerText +=k;
let min = 10;
po.innerHTML += locat;
names.innerHTML += locat;



window.onload = function(){


    btn2.onclick = function(){
     location.reload();
    }
    btn3.onclick = function(){
        location.reload();
       }
btn.onclick = function(){    //remove popup
    div.style.display = "none";

    const generateBirds =function(){ 
    let id1=  setInterval (function(){
        
    let ranBird = Math.floor(((Math.random()*3)+1));
    let bird = document.createElement("img");
    bird.src =`images/${ranBird}.gif`;
    bird.classList.add("bird");
    birdos.appendChild(bird);
    let height = Math.round(Math.random()*(window.innerHeight - bird.height-50));
    bird.style.top = height +"px";
    bird.style.left = 0;

    let left = 0;
    let id = setInterval(function(){
        left+=10;
        bird.style.left = left+"px";
                if(left >window.innerWidth + bird.width){
                
                    clearInterval(id);
                    body.style.overflow = "hidden";
                    bird.remove();
                    
                    
                } 
                
            },30)


        bird.onclick = function(){
            if(bird.src =="http://127.0.0.1:5500/images/3.gif"){
            bird.remove();
            score.innerText = `score: ${x += 5}`;
            kill.innerText = `Birds Killed: ${k++}`;
        } else if(bird.src =="http://127.0.0.1:5500/images/1.gif"){
            bird.remove();
            score.innerText = `score: ${x += 10}`
            kill.innerText = `Birds Killed ${k++}`;
        } else{
            bird.remove();
            score.innerText = `score: ${x -= 10}`;
            kill.innerText = `Birds Killed: ${k++}`;
        }
    
        }

        if(min == "0"){
            clearInterval(id1);
            
           
        }
        
        
},600)

}  // nd of generate

function count(){
    if(min > 0){
        min -= 1;
        timer.innerText = `Time Limit ${min}`;
    }
    else{

    if(parseInt(score.innerText.split(":")[1] )> 50){
    
    pop.style.display = "block";
    winscore.innerText = `Your final ${score.innerText}`;   
    clearInterval(ids);  
    }
    else{
    containers.style.display = "block";
    scoreTotal.innerText = `Your final ${score.innerText}`;
    clearInterval(ids);
    }
    localStorage.setItem("name",po.innerText);
    localStorage.setItem("score",score.innerText);

}
}
let ids= setInterval(count,1000); // end of count


const generateBomb = function(){
     let id1  = setInterval (function(){
        
        let ranbomb = Math.floor(((Math.random()*1)+1));
        let bombs = document.createElement("img");
        bombs.src =`images/bomb/${ranbomb}.png`;
        bomb.appendChild(bombs);
        let width = Math.round(Math.random()*(window.innerWidth - bombs.width-50));
        bombs.style.left = width +"px";
        bombs.style.top = 0;

        let top = -10;
        let id = setInterval(function(){
            top+=10;
            bombs.style.top = top+"px";
                    if(top >window.innerHeight+ bombs.width){
                    
                        clearInterval(id);
                        bombs.remove();
                        body.style.overflow = "hidden";
                    } 
                    
                },100)
                bombs.onclick = function(){
                    let arr = document.querySelectorAll(".bird");
                    arr.forEach(bird => {
                        let  birdX = parseInt( bird.style.left);
                        let birdY = parseInt( bird.style.top);
                        let bombX = parseInt(bombs.style.left);
                        let bombY = parseInt(bombs.style.top);
                        let distance = parseInt(Math.sqrt(Math.pow((birdX - bombX),2) + Math.pow((birdY - bombY),2)))
                        if(distance < 300){
                            if(bird.src =="http://127.0.0.1:5500/images/3.gif"){
                                bird.remove();
                                score.innerText = `score: ${x += 5}`;
                                kill.innerText = `Birds Killed: ${k++}`;
                            } else if(bird.src =="http://127.0.0.1:5500/images/1.gif"){
                                bird.remove();
                                score.innerText = `score: ${x += 10}`
                                kill.innerText = `Birds Killed ${k++}`;
                            } else{
                                bird.remove();
                                score.innerText = `score: ${x -= 10}`;
                                kill.innerText = `Birds Killed: ${k++}`;
                            }
                        }
                        
                    });
                    
                    bombs.remove();
                }
                if(min == "0"){
                    clearInterval(id1);
                }
    },2000)
}



generateBirds();
generateBomb();

}


}