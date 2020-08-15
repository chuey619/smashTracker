const winsLosses = () => {
  let winBar = document.querySelector(".wins-bar");
  winBar.style.width = winBar.dataset.percent.substring(0, 4) + "%";
  let lossesBar = document.querySelector(".losses-bar");
  lossesBar.style.width = lossesBar.dataset.percent.substring(0, 4) + "%";
};

const setColors = () => {
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    if (card.dataset.winner == card.dataset.user) {
      card.classList.add("winner");
    } else {
      card.classList.add("loser");
    }
  });
};

const indexMain = () => {
  setColors();
  setTimeout(winsLosses(), 2000);
};
indexMain();
