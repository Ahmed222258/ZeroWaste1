const binsData = [
  { type: "Plastic", volume: 30.0 },
  { type: "Glass", volume: 10.0 },
  { type: "Metal", volume: 15.0 },
  { type: "Paper", volume: 19.0 },
];

const bins = document.querySelectorAll(".bin");

bins.forEach((bin, index) => {
  const span = bin.querySelector("span");
  const fill = bin.querySelector(".fill");

  if (fill && span) {
    const volume = binsData[index].volume;

    // Update the text (number)
    span.textContent = `${volume.toFixed(1)}cm`;

    // Set height proportional to volume
    const height = (volume / 30) * 100;
    fill.style.height = `${height}%`;

    // Set color based on volume
    if (volume <= 10) {
      fill.style.backgroundColor = "#4CAF50"; // Green
    } else if (volume > 10 && volume <= 20) {
      fill.style.backgroundColor = "#FFEB3B"; // Yellow
    } else if (volume > 20) {
      fill.style.backgroundColor = "#F44336"; // Red
    }
  }
});
