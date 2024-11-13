let bet = 0;
let balance = 0;

function wheelOfFortune(selector) {
  const node = document.querySelector(selector);
  if (!node) return;

  const spin = document.querySelector(".spin");
  const wheel = document.querySelector(".roulette-wheel");
  let animation;
  let previousEndDegree = 0;

  spin.addEventListener("click", () => {
    if (animation) {
      animation.cancel(); // Reset the animation if it already exists
    }

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
      };

    previousEndDegree = newEndDegree;
  });
}
