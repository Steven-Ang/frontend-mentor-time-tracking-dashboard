const cardList = document.querySelector(".card-list");
const toggleButtons = document.querySelector(".toggle-buttons-list");

let currentActiveButton = null;
let previousActiveButton = null;

const renderCards = async (type) => {
  const response = await fetch("data.json");
  const data = await response.json();

  if (cardList.innerHTML !== "") cardList.innerHTML = "";

  for (const item of data) {
    const { title, timeframes } = item;

    const currentWeek =
      type === "weekly"
        ? timeframes.weekly.current
        : type === "daily"
        ? timeframes.daily.current
        : timeframes.monthly.current;
    const previousWeek =
      type === "weekly"
        ? timeframes.weekly.previous
        : type === "daily"
        ? timeframes.daily.previous
        : timeframes.monthly.previous;

    const tagClassName = title.toLowerCase().split(" ").join("-");

    const card = document.createElement("div");
    card.classList.add("card", tagClassName);
    card.innerHTML = `
      <div class="card-background ${tagClassName}"></div>
      <div class="card-content">
        <div class="card-content-labels">
          <div class="card-label">${title}</div>
          <img
            src="images/icon-ellipsis.svg"
            alt="Ellipsis icon"
            class="icon-ellipsis"
          />
        </div>
        <div class="card-content-weeks">
          <p class="current-week">${currentWeek}hrs</p>
          <p class="previous-week">Last week - ${previousWeek}hrs</p>
        </div>
      </div>
    `;
    cardList.append(card);
  }
};

const handleToggle = (event) => {
  event.stopPropagation();

  previousActiveButton = currentActiveButton;
  previousActiveButton.classList.toggle("active");
  previousActiveButton.toggleAttribute("disabled");

  currentActiveButton = event.target;
  currentActiveButton.classList.toggle("active");
  currentActiveButton.toggleAttribute("disabled");

  renderCards(currentActiveButton.textContent.toLowerCase());
};

document.addEventListener("DOMContentLoaded", async () => {
  currentActiveButton = toggleButtons.children.item(1);
  currentActiveButton.classList.toggle("active");
  currentActiveButton.toggleAttribute("disabled");

  renderCards("weekly");
});

for (const li of toggleButtons.children) {
  li.addEventListener("click", handleToggle);
}
