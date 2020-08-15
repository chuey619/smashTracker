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
      if (card.dataset.winner == card.dataset.user) {
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
  const charValue = document.querySelector("#character");
  charButton.addEventListener("click", () => {
    userForm.style.display = "none";
    charForm.style.display = "inline";
  });
  charSubmit.addEventListener("click", () => {
    cards.forEach((card) => {
      if (charValue.value != card.dataset.char) {
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
  const userValue = document.querySelector("#opponent");
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
const singleCharList = () => {
  const select = document.querySelector("#character");
  const charString = select.dataset.chars;
  const chars = charString.split(",");
  chars.forEach((char) => {
    let option = document.createElement("option");
    option.innerText = char;
    select.appendChild(option);
  });
};
const getUsers = () => {
  const userSelect = document.querySelector("#opponent");
  const userString = userSelect.dataset.opponents;
  console.log(userString);
  const users = userString.split(",");
  users.forEach((user) => {
    let option = document.createElement("option");
    option.innerText = user;
    if (userSelect.dataset.user != user && user != "Uknown") {
      userSelect.appendChild(option);
    }
  });
};

const main = () => {
  wins();
  losses();
  all();
  byChar();
  byUser();
  setColors();
  singleCharList();
  getUsers();
};

main();
