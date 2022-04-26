
const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const resultElement = document.getElementById('typeAcc');
const MaxTime = 10
let flag=false;
let isIncorrect = 0;
let total = 0,dirty=false,started=false;
let totalWord=0;

quoteInputElement.addEventListener('input', () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  const arrayValue = quoteInputElement.value.split('')
  let currentType=0;
  arrayValue.forEach(v=> (v===' ' && currentType++))
  console.log("Current is : ")
  console.log(currentType)
  document.getElementById('cur').innerText=currentType;
  document.getElementById('tot').innerText=totalWord+1;

  if(dirty == false) dirty = true;
  if(dirty == true && started == false){
      resultElement.classList.remove('accuracy');
      resultElement.innerText = null;
      started = true;
      startTimer(true)
  }
  let correct = true
  // console.log("arrayQuote is :-");
  // console.log(arrayQuote);
  // console.log("arrayValue is :-");
  // console.log(arrayValue);
  
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    } else if (character === characterSpan.innerText) {
      total += 1;
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    } else {
      isIncorrect += 1;
      total += 1;
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) {
    //console.log("The Accuracy Value is :");
    let result = parseInt((1 - (isIncorrect/total))*100);
    //console.log( result ,"%");
    resultElement.classList.add('accuracy');
    resultElement.innerText = "acc \n"+result+"%";
    document.getElementById('cur').innerText=0;
    started = false;
    dirty = false;
    startTimer();
    renderNewQuote()
    //while(quoteInputElement.value.length==0);
    flag=false;
  }
  
})

function getRandomQuote() {
  
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
  const quote = await getRandomQuote()
  console.log("total space/word are : ");
  console.log(quote.split(' ').length)
  totalWord=quote.split(' ').length
  // console.log(quote)
  //console.log(quote);
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  quoteInputElement.value = null
  isIncorrect=0;
  isCorrect=0;
  // startTimer()
}

let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}

function getTimerTime() {
  if(started) {return Math.floor((new Date() - startTime) / 1000)}
  else {return ''}
}


/*
var app = angular.module("myApp", []);
app.controller('myctrl',function($scope) {
  $scope.typeAcc = "<div></div>"
})
*/




resultElement.classList.remove('accuracy');
resultElement.innerText = null;
renderNewQuote()



















