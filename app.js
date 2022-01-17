const gameBox = document.getElementById('memory-game');

let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const cardColors = [
  'cyan',
  'teal',
  'magenta',
  'orangered',
  'black',
  'cyan',
  'teal',
  'magenta',
  'orangered',
  'black'
];

function shuffle(arr) {
  let count = arr.length;

  while (count > 0) {
    let indexNum = Math.floor(Math.random() * count);
    count--;

    let tempColor = arr[count];
    arr[count] = arr[indexNum];
    arr[indexNum] = tempColor;
  }

  return arr;
}

let shuffledColors = shuffle(cardColors);



function createCardColorsBox(colorArr) {
  for (let color of colorArr) {
    const newBox = document.createElement('div');
    newBox.classList.add(color);
    newBox.addEventListener('click', clickOnCard);
    gameBox.append(newBox);
  }
}

function clickOnCard(e) {
  if (noClicking) return;
  if (e.target.classList.contains('flipped')) return;

  let currentCard = e.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let face1 = card1.className;
    let face2 = card2.className;

    if (face1 === face2) {
      cardsFlipped += 2;
      card1.removeEventListener('click', clickOnCard);
      card2.removeEventListener('click', clickOnCard);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }

  if (cardsFlipped === cardColors.length) alert('GAME OVER');
}



createCardColorsBox(shuffledColors);

