const grid = document.querySelector(".grid");
let gridSize = 16;
let currentColor = "black";

function createGrid(size) {
  grid.innerHTML = "";
  const totalSquares = size * size;

  for (let i = 0; i < totalSquares; i++) {
    const squares = document.createElement("div");
    squares.classList.add("squares");
    squares.style.width = `${640 / size}px`;
    squares.style.height = `${640 / size}px`;
    squares.style.border = "1px solid #ddd";

    let isColored = false;
    squares.addEventListener("click", () => {
      if (!isColored) {
        squares.style.backgroundColor = currentColor;
        isColored = true;
      } else {
        squares.style.backgroundColor = "#f0f0f0";
        isColored = false;
      }
    });
    grid.appendChild(squares);
  }
}

createGrid(gridSize);

// Change grid size button logic
const changeGridBtn = document.getElementById("change-grid-size");

if (changeGridBtn) {
  changeGridBtn.addEventListener("click", () => {
    let newSize = prompt("Enter new grid size (e.g. 16 for 16x16, max 100):", gridSize);

    newSize = parseInt(newSize);
    
    if (!isNaN(newSize) && newSize > 0 && newSize <= 100) {
      gridSize = newSize;
      createGrid(gridSize);
      // The text is updated in createGrid
    } else {
      alert("Invalid grid size. Please enter a number between 1 and 100.");
    }
  });
}

// Always show color picker input at the top
let colorInput = document.getElementById("color-picker-input");
const label = document.getElementById("color-picker-label");

if (!colorInput) {
  colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.id = "color-picker-input";
  colorInput.style.display = "block";
  colorInput.value = currentColor;
}

if (label && colorInput.previousElementSibling !== label) {
  label.insertAdjacentElement("afterend", colorInput);
} else if (!label && !colorInput.parentNode) {
  document.body.insertBefore(colorInput, grid);
}

colorInput.addEventListener("input", (e) => {
  currentColor = e.target.value;
});
