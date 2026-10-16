const velikostDesky = 10;
const delka = 5;
const deska = document.getElementById("board");
const zprava = document.getElementById("message");
const resetBtn = document.getElementById("reset");

let aktualniHrac = "X";
let tah = 0;
let ende = false;
let bunky = [];
let radky = [];
let sloupce = [];
let diagonalyZleva = [];
let diagonalyZprava = [];

function setHeader(text) {
  zprava.textContent = text;
}

function reset() {
  deska.innerHTML = "";
  bunky = [];

  for (let index = 0; index < velikostDesky * velikostDesky; index++) {
    const bunka = document.createElement("button");
    bunka.className = "cell";
    bunka.type = "button";
    bunka.addEventListener("click", clickCell);
    deska.appendChild(bunka);
    bunky.push(bunka);
  }

  aktualniHrac = "X";
  tah = 0;
  ende = false;
  radky = Array(velikostDesky).fill(0);
  sloupce = Array(velikostDesky).fill(0);
  diagonalyZleva = Array(velikostDesky * 2 - 1).fill(0);
  diagonalyZprava = Array(velikostDesky * 2 - 1).fill(0);
  setHeader("Hráč: X");
}

function winCheck(index) {
  const radek = Math.floor(index / velikostDesky);
  const sloupec = index % velikostDesky;
  const hodnota = aktualniHrac === "X" ? 1 : -1;

  radky[radek] += hodnota;
  sloupce[sloupec] += hodnota;
  diagonalyZleva[radek - sloupec + velikostDesky - 1] += hodnota;
  diagonalyZprava[radek + sloupec] += hodnota;

  return [
    radky[radek],
    sloupce[sloupec],
    diagonalyZleva[radek - sloupec + velikostDesky - 1],
    diagonalyZprava[radek + sloupec],
  ].some((skore) => skore === delka || skore === -delka);
}

function clickCell(event) {
  const bunka = event.currentTarget;

  if (ende || bunka.textContent !== "") {
    return;
  }

  const poradi = bunky.indexOf(bunka);
  bunka.textContent = aktualniHrac;
  tah++;

  if (winCheck(poradi)) {
    setHeader("Hráč: " + aktualniHrac + " vyhrál!");
    ende = true;
    return;
  }

  if (tah === velikostDesky * velikostDesky) {
    setHeader("Remíza!");
    ende = true;
    return;
  }

  if (aktualniHrac === "X") {
    aktualniHrac = "O";
  } else {
    aktualniHrac = "X";
  }

  setHeader("Hráč: " + aktualniHrac);
}

resetBtn.addEventListener("click", reset);

reset();
