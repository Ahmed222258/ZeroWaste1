document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  const loader = document.getElementById("loader");
  const errorMessage = document.getElementById("errorMessage");
  const recordsContainer = document.getElementById("recordsContainer");

  if (!token) {
    errorMessage.classList.remove("d-none");
    errorMessage.textContent = "🔒 Authentication token is missing. Please log in.";
    loader.style.display = "none";
    return;
  }

  fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/get_waste_disposal.php", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    }
  })
    .then(response => response.json())
    .then(data => {
      loader.style.display = "none";

      if (!data.disposals || data.disposals.length === 0) {
        errorMessage.classList.remove("d-none");
        errorMessage.textContent = "No disposal records found.";
        return;
      }

      data.disposals.forEach(record => {
        const card = document.createElement("div");
        card.className = "col-md-4";

        card.innerHTML = `
          <div class="card shadow-sm h-100">
            ${record.image_path ? `<img src="${record.image_path}" class="card-img-top" alt="Waste Image">` : '<div class="p-5 text-center text-muted">No Image</div>'}
            <div class="card-body">
              <h5 class="card-title">Disposal ID: ${record.disposal_id ?? 'N/A'}</h5>
              <p class="card-text">Type: ${record.type ?? 'Unknown'}</p>
            </div>
          </div>
        `;

        recordsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
      loader.style.display = "none";
      errorMessage.classList.remove("d-none");
      errorMessage.textContent = "❌ Failed to load records.";
    });
});
