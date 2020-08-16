const getChars = () => {
  const charSelects = document.querySelectorAll(".charSelect");

  const charString = charSelects[0].dataset.chars;
  const chars = charString.split(",");
  for (let select of charSelects) {
    chars.forEach((char) => {
      let option = document.createElement("option");
      option.innerText = char;
      select.appendChild(option);
    });
  }
};

const getUsers = () => {
  const userSelect = document.querySelector("#opponent");
  const userString = userSelect.dataset.opponents;
  console.log(userString);
  const users = userString.split(",");
  users.forEach((user) => {
    let option = document.createElement("option");
    option.innerText = user;
    if (userSelect.dataset.user != user && user != "Unknown") {
      userSelect.appendChild(option);
    }
  });
};

const main = () => {
  getChars();
  getUsers();
};

main();
