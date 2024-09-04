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

    const current =
      type === "weekly"
        ? timeframes.weekly.current
        : type === "daily"
        ? timeframes.daily.current
        : timeframes.monthly.current;
    const previous =
      type === "weekly"
        ? timeframes.weekly.previous
        : type === "daily"
        ? timeframes.daily.previous
        : timeframes.monthly.previous;
    const previousLabel =
      type === "weekly"
        ? "Last Week - "
        : type === "daily"
        ? "Yesterday - "
        : "Last Month - ";

    const tagClassName = title.toLowerCase().replace(" ", "-")

    const card = document.createElement("div");
    card.classList.add("card", tagClassName);
    card.innerHTML = `
      <div class="card-top">
        <img class="card-image" alt="${title}" src="images/icon-${tagClassName}.svg" />
      </div>
      <div class="card-bottom">
        <div class="card-labels">
          <span class="card-label">${title}</span>
            <svg class="icon-ellipsis" width="21" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" fill="#BBC0FF" fill-rule="evenodd"/></svg>
        </div>
        <div class="card-weeks">
          <p class="current-week">${current}hrs</p>
          <p class="previous-week">${previousLabel}${previous}hrs</p>
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
