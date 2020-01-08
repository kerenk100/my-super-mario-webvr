const sceneEl = document.querySelector("a-scene")
const coinEl = document.querySelector("#coin")
const scoreEl = document.querySelector('#score');
const pipeEl = document.querySelector('#pipe');
const princessEl = document.querySelector('#princess'); 
const heartEl = document.querySelector('#heartIcon'); 
const mario = document.querySelector('#mario'); 


const NUM_OF_COINS_TO_COLLECT = 1;
const NUM_OF_PIPES = 10;
let score = 0;

function randomPosition() {
  return {
    x: (Math.random() - 0.5) * 20,
    y: 1.5,
    z: (Math.random() - 0.5) * 20
  };
}

function randomPositionForPipes() {
  return {
    x: (Math.random() - 0.5) * 20,
    y: 1,
    z: (Math.random() - 0.5) * 20
  };
}

function displayScore() {
  scoreEl.setAttribute('height', 25);
  scoreEl.setAttribute('value', `Score: ${score}`);
  if (score === NUM_OF_COINS_TO_COLLECT){
    findYourPrincess();
  }
}

function findYourPrincess(){
  princessEl.setAttribute("gltf-model", "url(../models/princess/model.gltf)");
  princessEl.setAttribute("position", "0 0 -4");
  scoreEl.setAttribute("value", "Your Princess is waiting for you!!!");
  scoreEl.setAttribute("align", "center"); 
  scoreEl.setAttribute("color", "#c0014e"); 
  heartIcon.setAttribute("position", "0 0.52 -0.5");
  princessEl.addEventListener('mousedown', () => {
    princessEl.setAttribute("position", "0 0 -4");
  })
}

function createCoin(){
  const clone = coinEl.cloneNode()
  clone.setAttribute("position", randomPosition())
  clone.addEventListener('mousedown', () => {
    score++;
    clone.dispatchEvent(new Event('collected'));
    displayScore();
  })
  clone.addEventListener('animationcomplete', () => {
    clone.setAttribute("position", randomPosition());
    clone.setAttribute('scale', '0.01 0.01 0.01');
  });
  sceneEl.appendChild(clone)
}

function createPipe(){
  const clone = pipeEl.cloneNode()
  clone.setAttribute("position", randomPositionForPipes());
  sceneEl.appendChild(clone)
}

for(let i=0 ; i<NUM_OF_COINS_TO_COLLECT; i++){
  createCoin()
}
for(let i=0 ; i<NUM_OF_PIPES; i++){
  createPipe()
}
displayScore();