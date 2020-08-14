const cards = document.querySelectorAll(".card");
const wins = () => {
  const winButton = document.querySelector("#wins");
  winButton.addEventListener("click", () => {
    cards.forEach((card) => {
      if (card.dataset.winner != card.dataset.user) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
      }
    });
  });
};
const losses = () => {
  const lossButton = document.querySelector("#losses");
  lossButton.addEventListener("click", () => {
    cards.forEach((card) => {
      if (card.dataset.loser != card.dataset.user) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
      }
    });
  });
};

const all = () => {
  const allButton = document.querySelector("#all");
  allButton.addEventListener("click", () => {
    cards.forEach((card) => {
      card.style.display = "flex";
    });
  });
};

const byChar = () => {
  const userForm = document.querySelector("#user-form");
  const charButton = document.querySelector("#char-search");
  const charForm = document.querySelector("#char-form");
  const charSubmit = document.querySelector("#char-input");
  const charValue = document.querySelector("#char-value");
  charButton.addEventListener("click", () => {
    userForm.style.display = "none";
    charForm.style.display = "inline";
  });
  charSubmit.addEventListener("click", () => {
    cards.forEach((card) => {
      if (charValue.value != card.dataset.character) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
      }
    });
    charForm.style.display = "none";
  });
};
const byUser = () => {
  const charForm = document.querySelector("#char-form");
  const userButton = document.querySelector("#user-search");
  const userForm = document.querySelector("#user-form");
  const userSubmit = document.querySelector("#user-input");
  const userValue = document.querySelector("#user-value");
  userButton.addEventListener("click", () => {
    charForm.style.display = "none";
    userForm.style.display = "inline";
  });
  userSubmit.addEventListener("click", () => {
    cards.forEach((card) => {
      if (userValue.value != card.dataset.opponent) {
        card.style.display = "none";
      } else {
        card.style.display = "flex";
      }
    });
    userForm.style.display = "none";
  });
};

const main = () => {
  wins();
  losses();
  all();
  byChar();
  byUser();
};

main();
