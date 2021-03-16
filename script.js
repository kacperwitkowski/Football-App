const list = document.querySelectorAll('.list');

const currentLeauge = document.querySelector('.current--leauge');
const currentLeaugeSpan = document.querySelector('.current--leauge-span');
const btn = document.querySelector('.btn');
let h2 = document.querySelector('.h2--matchday');

let currentMatchday = 0;

let changerLeauges;
const containerParent = document.querySelector('.container--parent');
const heart = document.querySelector('.heart');

const seasons = document.querySelectorAll('.season');
const links = document.querySelectorAll('.link')

const initIfs = () => {
  if (currentLeauge.innerText === 'PREMIER LEAUGE') changerLeauges = 'en.1'
  if (currentLeauge.innerText === 'BUNDESLIGA') changerLeauges = 'de.1'
  if (currentLeauge.innerText === 'SERIE A') changerLeauges = 'it.1'
  if (currentLeauge.innerText === 'LA LIGA') changerLeauges = 'es.1'
  if (currentLeauge.innerText === 'LIGUE 1') changerLeauges = 'fr.1'
}


//WYSUWANE MENU CZ.1

list.forEach(l => {
  l.style.display = 'none'
})

//WYSUWANE MENU CZ.2
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function (e) {


    if (list[i].style.display === 'none') {
      list[i].style.display = 'block'
    } else {
      list[i].style.display = 'none'
    }
  })
}



const returnUrl = () => {
  return `https://raw.githubusercontent.com/openfootball/football.json/master/${currentLeaugeSpan.innerText}/${changerLeauges}.json`;
};

//CZYTANIE WARTOŚCI Z KLIKNIETEJ LIGI I WRZUCZENIE ICH DO OVERVIEW

for (let i = 0; i < seasons.length; i++) {
  seasons[i].addEventListener('click', function (e) {

    //LISTA Z DATAMI SEZONOW
    const clickedLi = e.target.closest('li');
    currentLeaugeSpan.innerText = `${clickedLi.innerText}`;


    //KTORA LIGA JEST OBECNIE WYBRANA
    const activeLeauge = clickedLi.parentNode.parentNode.firstChild.innerText;
    currentLeauge.innerText = `${activeLeauge}`;



    initIfs()

    //FETCH
    fetch(returnUrl())
      .then(request => request.json())
      .then(data => {
        console.log(data)
        containerParent.innerHTML = '';

        //WERSJA DOMYŚLNA
        currentMatchday = 0;
        let testChanger = data.rounds[0].matches
        h2.innerText = data.rounds[0].name

        //TESTOWANA WERSJA
        // settingActiveLeauge()

        testChanger.forEach(match => {

          let html = `<div class="container--row">
            <div class="team--1 teams"><img src="../images/${match.team1}.png"/>
            <span>${match.team1}</span></div><div class="score">${match.score.ft[0]}:${match.score.ft[1]}</div>
            <div class="team--2 teams"><span>${match.team2}</span><img src="../images/${match.team2}.png"/>
            </div></div>`;

          containerParent.insertAdjacentHTML('afterbegin', html);

        })
      })
  });
};

//FUNKCJA DO ZMIANY KOLEJKI + 1

const changerMatchday = () => {
  // containerParent.innerHTML = '';

  fetch(returnUrl())
    .then(request => request.json())
    .then(data => {

      //wersja domyślna
      let testChanger = data.rounds[currentMatchday].matches;
      let nameTaker = data.rounds[currentMatchday].name;
      h2.innerText = nameTaker;

      if (currentMatchday === 0) {
        testChanger = data.rounds[0].matches;
        h2.innerText = data.rounds[0].name;
      }

      //funkcjonalnosc

      testChanger.forEach(match => {
        html = `<div class="container--row">
       <div class="team--1 teams"><img src="../images/${match.team1}.png"/>
       <span>${match.team1}</span></div><div class="score">${match.score.ft[0]}:${match.score.ft[1]}</div>
       <div class="team--2 teams"><span>${match.team2}</span><img src="../images/${match.team2}.png"/>
       </div></div>`;
        containerParent.insertAdjacentHTML('afterbegin', html);
      })

    })
    .catch(reject => {
      alert(`There's no more matchdays`) ? "" : location.reload();
    })
}


// const cleaner = async function () {
//   let cleaner = containerParent.innerHTML = ''
//   await cleaner;
// }


const leaugePlus = () => {
  initIfs()
  changerMatchday();
  currentMatchday++
  containerParent.innerHTML = ''
};

const leaugeMinus = () => {

  initIfs();
  currentMatchday--;
  changerMatchday();
  containerParent.innerHTML = ''

};

//LIGA WEJSCIOWA

const settingActiveLeauge = () => {


  initIfs();
  changerMatchday();
  currentMatchday = 0;


}

settingActiveLeauge()


document.querySelector('.btn--2').addEventListener('click', leaugePlus);
document.querySelector('.btn--1').addEventListener('click', leaugeMinus);

//ADDA POWYZEJ DAC DO SRODKA
const searching = function (e) {
  let lookingFor = document.querySelector('.search');
  e.preventDefault()
  let searchedNumber = lookingFor.value
  let myValue = Number(searchedNumber)

  lookingFor.placeholder = '';

  initIfs();

  fetch(returnUrl())
    .then(request => request.json())
    .then(data => {
      containerParent.innerHTML = '';

      let testChanger = data.rounds[(myValue - 1)].matches;
      h2.innerText = data.rounds[(myValue - 1)].name;
      currentMatchday = (myValue - 1);

      // searchedNumber.innerText = '';

      testChanger.forEach(match => {
        let html = `<div class="container--row">
    <div class="team--1 teams"><img src="../images/${match.team1}.png"/>
    <span>${match.team1}</span></div><div class="score">${match.score.ft[0]}:${match.score.ft[1]}</div>
    <div class="team--2 teams"><span>${match.team2}</span><img src="../images/${match.team2}.png"/>
    </div></div>`;


        containerParent.insertAdjacentHTML('afterbegin', html);
      })
    })
    .catch(reject => {
      alert(`There's no matchdays for this number!`) ? "" : location.reload();
    })
}

//ARROWS LEFT/RIGHT
window.addEventListener("keydown", function (e) {
  if (e.defaultPrevented) {
    return;
  }

  switch (e.key) {
    case "ArrowLeft":
      leaugeMinus()
      break;
    case "ArrowRight":
      leaugePlus()
      break;
  }
})

btn.addEventListener('click', searching);