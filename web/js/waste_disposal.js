// document.addEventListener("DOMContentLoaded", function () {
//   const token = localStorage.getItem("token");
//   const loader = document.getElementById("loader");
//   const errorMessage = document.getElementById("errorMessage");
//   const recordsContainer = document.getElementById("recordsContainer");

//   if (!token) {
//     errorMessage.classList.remove("d-none");
//     errorMessage.textContent = "🔒 Authentication token is missing. Please log in.";
//     loader.style.display = "none";
//     return;
//   }

//   fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/get_waste_disposal.php", {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${token}`,
//       "Content-Type": "application/json",
//     }
//   })
//     .then(response => response.json())
//     .then(data => {
//       loader.style.display = "none";

//       if (!data.disposals || data.disposals.length === 0) {
//         errorMessage.classList.remove("d-none");
//         errorMessage.textContent = "No disposal records found.";
//         return;
//       }

//       data.disposals.forEach(record => {
//         const card = document.createElement("div");
//         card.className = "col-md-4";

//         card.innerHTML = `
//           <div class="card shadow-sm h-100">
//             ${record.image_path ? `<img src="${record.image_path}" class="card-img-top" alt="Waste Image">` : '<div class="p-5 text-center text-muted">No Image</div>'}
//             <div class="card-body">
//               <h5 class="card-title">Disposal ID: ${record.disposal_id ?? 'N/A'}</h5>
//               <p class="card-text">Type: ${record.type ?? 'Unknown'}</p>
//             </div>
//           </div>
//         `;

//         recordsContainer.appendChild(card);
//       });
//     })
//     .catch(error => {
//       console.error("Fetch error:", error);
//       loader.style.display = "none";
//       errorMessage.classList.remove("d-none");
//       errorMessage.textContent = "❌ Failed to load records.";
//     });
// });

// fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/get_waste_disposal.php", {
//   method: "GET",
//   headers: {
//     "Authorization": `Bearer ${token}`
//   }
// })
// .then(async response => {
//   loader.style.display = "none";

//   if (!response.ok) {
//     let errorText = `❌ Error ${response.status}: ${response.statusText}`;
//     try {
//       const errorData = await response.json();
//       errorText = errorData?.error || errorText;
//     } catch (jsonErr) {
//       console.warn("Could not parse JSON from error response");
//     }
//     throw new Error(errorText);
//   }

//   return response.json();
// })
// .then(data => {
//   if (!Array.isArray(data.disposals) || data.disposals.length === 0) {
//     showError("No disposal records found.");
//     return;
//   }

//   data.disposals.forEach(record => {
//     const card = document.createElement("div");
//     card.className = "col-md-4 col-sm-6 mb-4";

//     const imageContent = record.image_path
//       ? `<img src="${record.image_path}" class="card-img-top" alt="Waste Image">`
//       : '<div class="p-5 text-center text-muted">No Image</div>';

//     card.innerHTML = `
//       <div class="card shadow-sm h-100">
//         ${imageContent}
//         <div class="card-body">
//           <h5 class="card-title">Disposal ID: ${record.disposal_id ?? 'N/A'}</h5>
//           <p class="card-text"><strong>Type:</strong> ${record.type ?? 'Unknown'}</p>
//           <p class="card-text"><strong>Timestamp:</strong> ${record.timestamp ?? 'N/A'}</p>
//           ${record.location ? `<p class="card-text"><strong>Location:</strong> ${record.location}</p>` : ''}
//         </div>
//       </div>
//     `;

//     recordsContainer.appendChild(card);
//   });
// })
// .catch(error => {
//   console.error("Fetch error:", error.message);
//   showError(error.message || "❌ Failed to load records.");
// });


// document.addEventListener("DOMContentLoaded", async () => {
//   const loader = document.getElementById("loader");
//   const recordsContainer = document.getElementById("recordsContainer");

//   const token = localStorage.getItem("token"); // ✅ Fetch the token

//   if (!token) {
//     showError("🔒 Authentication token is missing. Please log in.");
//     loader.style.display = "none";
//     return;
//   }

//   fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/get_waste_disposal.php", {
//     method: "GET",
//     headers: {
//       "Authorization": `Bearer ${token}`
//     }
//   })
//   .then(async response => {
//     loader.style.display = "none";

//     if (!response.ok) {
//       let errorText = `❌ Error ${response.status}: ${response.statusText}`;
//       try {
//         const errorData = await response.json();
//         errorText = errorData?.error || errorText;
//       } catch (jsonErr) {
//         console.warn("Could not parse JSON from error response");
//       }
//       throw new Error(errorText);
//     }

//     return response.json();
//   })
//   .then(data => {
//     if (!Array.isArray(data.disposals) || data.disposals.length === 0) {
//       showError("No disposal records found.");
//       return;
//     }

//     data.disposals.forEach(record => {
//       const card = document.createElement("div");
//       card.className = "col-md-4 col-sm-6 mb-4";

//       const imageContent = record.image_path
//         ? `<img src="${record.image_path}" class="card-img-top" alt="Waste Image">`
//         : '<div class="p-5 text-center text-muted">No Image</div>';

//       card.innerHTML = `
//         <div class="card shadow-sm h-100">
//           ${imageContent}
//           <div class="card-body">
//             <h5 class="card-title">Disposal ID: ${record.disposal_id ?? 'N/A'}</h5>
//             <p class="card-text"><strong>Type:</strong> ${record.type ?? 'Unknown'}</p>
//             <p class="card-text"><strong>Timestamp:</strong> ${record.timestamp ?? 'N/A'}</p>
//             ${record.location ? `<p class="card-text"><strong>Location:</strong> ${record.location}</p>` : ''}
//           </div>
//         </div>
//       `;

//       recordsContainer.appendChild(card);
//     });
//   })
//   .catch(error => {
//     console.error("Fetch error:", error.message);
//     showError(error.message || "❌ Failed to load records.");
//   });
// });

// // Example helper function for showing errors
// function showError(message) {
//   const errorMessage = document.getElementById("errorMessage");
//   errorMessage.classList.remove("d-none");
//   errorMessage.textContent = message;
// }


// document.addEventListener('DOMContentLoaded', () => {
//   const loader = document.getElementById('loader');
//   const errorMessage = document.getElementById('errorMessage');
//   const recordsContainer = document.getElementById('recordsContainer');

//   // Replace this with actual stored JWT token from localStorage/sessionStorage/etc.
//   const token = localStorage.getItem('token'); // e.g., 'eyJhbGciOiJIUzI1NiIs...'

//   if (!token) {
//     loader.classList.add('d-none');
//     errorMessage.classList.remove('d-none');
//     errorMessage.textContent = '⚠️ No authentication token found.';
//     return;
//   }

//   fetch('https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/get_waste_disposal.php', {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     loader.classList.add('d-none');

//     if (data.error) {
//       errorMessage.classList.remove('d-none');
//       errorMessage.textContent = data.error;
//       return;
//     }

//     const records = data.disposals;
//     if (records.length === 0) {
//       errorMessage.classList.remove('d-none');
//       errorMessage.textContent = 'No records found.';
//       return;
//     }

//     // Display records
//     records.forEach(record => {
//       const col = document.createElement('div');
//       col.className = 'col-md-4';

//       col.innerHTML = `
//         <div class="card shadow-sm">
//           <img src="images/garbage.jpg" class="card-img-top" alt="Garbage Image">
//           <div class="card-body">
//             <h5 class="card-title">Disposal ID: ${record.id}</h5>
//             <p class="card-text"><strong>User ID:</strong> ${record.user_id}</p>
//             <p class="card-text"><strong>Weight:</strong> ${record.weight} kg</p>
//             <p class="card-text"><strong>Category:</strong> ${record.category}</p>
//             <p class="card-text"><strong>Time:</strong> ${new Date(record.timestamp).toLocaleString()}</p>
//           </div>
//         </div>
//       `;
//       recordsContainer.appendChild(col);
//     });
//   })
//   .catch(err => {
//     loader.classList.add('d-none');
//     errorMessage.classList.remove('d-none');
//     errorMessage.textContent = '❌ Failed to fetch records: ' + err.message;
//   });
// });


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("wasteForm");
  const messageEl = document.getElementById("message");
  const submitBtn = document.getElementById("submitBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      showMessage("⚠️ No authentication token found.", "error");
      return;
    }

    const data = {
      bin_id: form.binId.value.trim(),
      type: form.wasteType.value,
      fill_level: Number(form.fillLevel.value) || 0,
      image_path: form.imagePath.value.trim() || null
    };

    submitBtn.disabled = true;
    showMessage("⏳ Submitting...", "success");

    try {
      const response = await fetch(
        "https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/api_waste_disposal.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || response.statusText);
      }

      showMessage(result.message || "✅ Waste recorded successfully.", "success");
      form.reset();
    } catch (err) {
      showMessage("❌ " + err.message, "error");
    } finally {
      submitBtn.disabled = false;
    }
  });

  function showMessage(msg, type) {
    messageEl.textContent = msg;
    messageEl.className = `message ${type}`;
  }
});
