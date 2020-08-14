const showForm = () => {
  const userForm = document.querySelector("#user-form");

  const userButton = document.querySelector("#user-search");
  const charButton = document.querySelector("#char-search");
  charButton.addEventListener("click", () => {
    charForm.style.display = "inline";
  });
  userButton.addEventListener("click", () => {
    userForm.style.display = "inline";
  });
};

showForm();
