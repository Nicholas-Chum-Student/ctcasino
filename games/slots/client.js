const draggable = document.querySelector('#arm > div > .ball');
const bar = document.querySelector('#arm .fake');

const lockedX = 7.5;
const minY = 0;
const maxY = 400;

let startY = 0;
let offsetY = 0;
let isDragging = false;

draggable.style.top = startY + "px";
draggable.style.left = lockedX + "px";

function updateGradient(newY) {
  let percent = (newY / maxY) * 100;
  
  if (percent < 50) {
    bar.style.background = `linear-gradient(180deg, rgba(58, 58, 73, 0) ${percent}%, rgba(58, 58, 73, 1) ${percent}%, rgba(58, 58, 73, 1) 50%, rgba(58, 58, 73, 0) 50%)`;
  } else {
    bar.style.background = `linear-gradient(180deg, rgba(58, 58, 73, 0) 50%, rgba(58, 58, 73, 1) 50%, rgba(58, 58, 73, 1) ${percent}%, rgba(58, 58, 73, 0) ${percent}%)`;
  }
}

draggable.addEventListener("mousedown", (e) => {
  isDragging = true;
  draggable.style.transition = "";

  offsetY = e.clientY - draggable.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    let newY = e.clientY - offsetY;
    newY = Math.max(minY, Math.min(maxY, newY));

    draggable.style.top = newY + "px";
    draggable.style.left = lockedX + "px";
    updateGradient(newY);
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    
    let currentY = parseFloat(draggable.style.top);
    let animationDuration = 500;
    let startTime = performance.now();
    
    function animateReturn(timestamp) {
      const progress = Math.min((timestamp - startTime) / animationDuration, 1);
      const interpolatedY = currentY + (startY - currentY) * progress;
      
      draggable.style.top = interpolatedY + "px";
      updateGradient(interpolatedY);
      
      if (progress < 1) {
        requestAnimationFrame(animateReturn);
      }
    }
    
    requestAnimationFrame(animateReturn);
  }
});
