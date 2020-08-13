const winsLosses = () => {
  let winBar = document.querySelector(".wins-bar");
  let winPercent = document.querySelector(".win-percent").innerText;
  winBar.style.width = winPercent.substring(0, 3) + "%";

  let lossesBar = document.querySelector(".losses-bar");
  let lossPercent = document.querySelector(".loss-percent").innerText;
  lossesBar.style.width = lossPercent.substring(0, 3) + "%";
};

const showForm = () => {
  const userForm = document.querySelector("#user-form");
  const charForm = document.querySelector("#char-form");
  const userButton = document.querySelector("#user-search");
  const charButton = document.querySelector("#char-search");
  charButton.addEventListener("click", () => {
    charForm.style.display = "inline";
  });
  userButton.addEventListener("click", () => {
    userForm.style.display = "inline";
  });
};

setTimeout(winsLosses(), 300);
showForm();
