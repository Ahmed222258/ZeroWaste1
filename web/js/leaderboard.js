// document.addEventListener('DOMContentLoaded', () => {
//   const leaderboardContainer = document.getElementById('leaderboard-container');
//   const loggedInUserId = '123'; // Replace with actual logged-in user ID

//   fetch('http://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/leaderboard.php')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       const leaderboard = data.leaderboard;
//       leaderboard.forEach(user => {
//         const isCurrentUser = user.user_id.toString() === loggedInUserId;
//         const card = document.createElement('div');
//         card.className = 'col-md-4';
//         card.innerHTML = `
//           <div class="card h-100 ${isCurrentUser ? 'bg-success text-white' : ''}">
//             <div class="card-body d-flex justify-content-between align-items-center">
//               <h5 class="card-title mb-0">${user.name || 'Unknown'}</h5>
//               <span>${user.points || 0} pts</span>
//             </div>
//           </div>
//         `;
//         leaderboardContainer.appendChild(card);
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching leaderboard:', error);
//       leaderboardContainer.innerHTML = '<p class="text-danger">Failed to load leaderboard.</p>';
//     });
// });

// fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/leaderboard.php")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     console.log("Leaderboard data:", data); // Good for debugging
//     // ... render logic
//   })
//   .catch(error => {
//     console.error("Fetch failed:", error);
//     document.getElementById("leaderboard-container").innerHTML =
//       `<div class="alert alert-danger">Failed to load leaderboard. Error: ${error.message}</div>`;
//   });

const loggedInUserId = localStorage.getItem("userId"); // Set this on login

fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/leaderboard.php")
  .then(response => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then(data => {
    const leaderboard = data.leaderboard;
    const container = document.getElementById("leaderboard-container");
    container.innerHTML = "";

    leaderboard.forEach(user => {
      const isCurrentUser = user.user_id.toString() === loggedInUserId;
      const userName = user.name || "Unknown";
      const userPoints = user.points || 0;

      const card = document.createElement("div");
      card.className = "col-12";

      card.innerHTML = `
        <div class="card ${isCurrentUser ? 'border-success bg-light' : ''}">
          <div class="card-body d-flex justify-content-between align-items-center">
            <h5 class="card-title mb-0">${userName}</h5>
            <span class="badge bg-secondary">${userPoints} pts</span>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Fetch failed:", error);
    document.getElementById("leaderboard-container").innerHTML =
      `<div class="alert alert-danger">Failed to load leaderboard. Error: ${error.message}</div>`;
  });
