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

const showForm = () => {
  const showButton = document.querySelector("#new-form-button");
  const newForm = document.querySelector(".form");
  showButton.addEventListener("click", () => {
    newForm.style.display = "flex";
  });
};

showForm();
setColors();
setTimeout(winsLosses(), 2000);
