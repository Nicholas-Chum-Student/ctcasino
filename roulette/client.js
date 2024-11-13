let bets = {};
let canSpin = false;
let balance = 100;

var drake = dragula([...document.querySelectorAll(".chips"), document.querySelector(".chips-container")], {
  copy: function (el, source) {
    return source.classList.contains("chips-container");
  },
  accepts: function (el, source) {
    return source.classList.contains("chips") && source.children.length < 2;
  },
  revertOnSpill: false,
  removeOnSpill: true,
});


drake.on("drop", function (el, target, source, sibling) {
  bets = calculateBet();
  balance = calculateBalance();
});


function wheelOfFortune(selector) {
  const node = document.querySelector(selector);
  if (!node) return;

  const spin = document.querySelector(".spin");
  const wheel = document.querySelector(".roulette-wheel");
  let animation;
  let previousEndDegree = 0;

  spin.addEventListener("click", () => {
    bets = calculateBet();
    console.log(Object.values(bets).length);
    if (Object.values(bets).length != 0) { canSpin = true; }
    if (Object.values(bets).length == 0) return;
    if (animation) {
      animation.cancel(); // Reset the animation if it already exists
    }
    canSpin = false;

    const randomAdditionalDegrees = Math.random() * 360 + 1800;
    const newEndDegree = previousEndDegree + randomAdditionalDegrees;

    animation = wheel.animate(
      [
        { transform: `rotate(${previousEndDegree}deg)` },
        { transform: `rotate(${newEndDegree}deg)` },
      ],
      {
        duration: 8000,
        direction: "normal",
        easing: "cubic-bezier(0.440, -0.205, 0.000, 1.050)",
        fill: "forwards",
        iterations: 1,
      }
    );

    animation.onfinish = () => {
      const normalizedDegree = newEndDegree % 360; // Normalize rotation to [0, 360)
      const items = Array.from(wheel.querySelectorAll('li'));
      const numItems = items.length;
      const degreesPerItem = 360 / numItems; // ≈ 21.18 degrees for 17 items

      // Adjust this value based on the specific alignment of your wheel (e.g., tweak it as needed)
      const offset = degreesPerItem / 3; // Example offset: half of the angle per item

      // Apply the offset to find the index
      let index = Math.floor(((360 - normalizedDegree + offset) % 360) / degreesPerItem);

      // Handle wrapping around if the index exceeds the bounds
      if (index === numItems) {
        index = 0;
      }

      const selectedItem = items[index];
      console.log(Number(selectedItem.textContent));
      bets = {};
      removeAllChips();
    };

    previousEndDegree = newEndDegree;
  });
}

function removeAllChips() {
  const chipsDOM = [...document.querySelectorAll(".chips")];
  chipsDOM.forEach((item, index) => {
    if (item.childNodes.length > 0) {
      item.childNodes.forEach((item) => {
        item.remove();
      })
    }
  });
}

function calculateBet() {
  const slots = [...document.querySelectorAll(".grid-item > span")];
  const chipsDOM = [...document.querySelectorAll(".chips")];
  let bets = {};

  chipsDOM.forEach((item, index) => {
    if (item.childNodes.length > 0) {
      let betAmt = Number(item.childNodes[0].textContent);
      let num = Number(slots[index].textContent);
      bets[num] = betAmt;
    }
  })

  return bets;
}

function calculateBalance() {
  let _temp = balance;
  Object.values(bets).forEach((item) => {
    _temp -= item;
  })
  return _temp;
}

let wheelDOM = document.querySelector(".roulette-wheel")
for (let i = 0; i < wheelDOM.children.length; i++) {
  let currChild = wheelDOM.children[i];
  currChild.style.transform = `rotate( calc(360deg / 32 * ${i}))`;
}

setInterval(() => {
  document.querySelector("#cashmoney").textContent = `$${balance}`;
}, 100);