const winsLosses = () => {
  let winBar = document.querySelector(".wins-bar");
  let winPercent = document.querySelector(".win-percent").innerText;
  winBar.style.width = winPercent.substring(0, 4) + "%";

  let lossesBar = document.querySelector(".losses-bar");
  let lossPercent = document.querySelector(".loss-percent").innerText;
  lossesBar.style.width = lossPercent.substring(0, 3) + "%";
};
setTimeout(winsLosses(), 300);
