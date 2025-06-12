// // script.js

// document.addEventListener("DOMContentLoaded", async () => {
//   const rewardsContainer = document.getElementById("rewards-container");
//   const spinner = document.getElementById("loading-spinner");

//   // Simulated fetch (replace with real API call and token handling)
//   const fetchUserPoints = async () => {
//     try {
//       const response = await fetch("https://example.com/get_user_points.php", {
//         headers: {
//           'Authorization': localStorage.getItem('token') || ''
//         }
//       });
//       if (!response.ok) throw new Error("Failed to fetch points");
//       const data = await response.json();
//       return data.points;
//     } catch (err) {
//       console.error("Error fetching points:", err);
//       return null;
//     }
//   };

//   let userPoints = await fetchUserPoints();
//   spinner.style.display = 'none';

//   const rewards = [
//     {
//       image: "img/pizzahut.jpg",
//       title: "20% OFF at Pizza Hut",
//       subtitle: "Delicious meals await!",
//       cost: 400
//     },
//     {
//       image: "img/R.jpg",
//       title: "EGP 100 OFF at DeFacto",
//       subtitle: "Upgrade your wardrobe with EGP 100 off your next purchase at DeFacto!",
//       cost: 750
//     },
//     {
//       image: "img/th.jpg",
//       title: "EGP 100 OFF at Hyper One",
//       subtitle: "Save EGP 100 on your next grocery or household shopping trip at Hyper One!",
//       cost: 10
//     }
//   ];

//   rewards.forEach(reward => {
//     const card = document.createElement("div");
//     card.className = "card mb-3 p-3 shadow-sm";
//     card.innerHTML = `
//       <div class="row g-0">
//         <div class="col-md-4">
//           <img src="${reward.image}" class="img-fluid rounded-start" alt="${reward.title}">
//         </div>
//         <div class="col-md-8">
//           <div class="card-body">
//             <h5 class="card-title">${reward.title}</h5>
//             <p class="card-subtitle mb-2">${reward.subtitle}</p>
//             <p class="text-muted">for ${reward.cost} points</p>
//             <p class="reward-points">You have: ${userPoints ?? "Loading..."} points</p>
//             <button class="btn btn-redeem">Redeem Now</button>

//           </div>
//         </div>
//       </div>
//     `;

//     card.querySelector(".btn-redeem").addEventListener("click", () => {
//       if (userPoints >= reward.cost) {
//         alert("Redeemed successfully!");
//         userPoints -= reward.cost;
//         card.querySelector(".reward-points").textContent = `You have: ${userPoints} points`;
//       } else {
//         alert("Not enough points.");
//       }
//     });

//     rewardsContainer.appendChild(card);
//   });
// });

document.addEventListener("DOMContentLoaded", async () => {
  const rewardsContainer = document.getElementById("rewards-container");
  const spinner = document.getElementById("loading-spinner");

  const API_BASE = "https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net";

 const fetchUserPoints = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/get_user_points.php", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,  // 👈 Add Bearer
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error("HTTP status " + response.status);
    }

    const data = await response.json();
    console.log("Points fetched:", data);
    return data.points;
  } catch (err) {
    console.error("Error fetching points:", err.message);
  }
};


  // 2. Update points (POST)
  const updateUserPoints = async (userId, updatedPoints) => {
    try {
      const response = await fetch(`${API_BASE}/update_points.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: userId,
          points: updatedPoints
        })
      });

      const result = await response.json();
      if (response.ok) {
        console.log("✅", result.message);
      } else {
        console.warn("⚠️ Failed to update points:", result.error);
      }
    } catch (err) {
      console.error("❌ Error updating points:", err);
    }
  };

  // 3. Initialize
  let userPoints = await fetchUserPoints();
  spinner.style.display = 'none';
  const userId = parseInt(localStorage.getItem('user_id'), 10);

  // 4. Rewards List
  const rewards = [
    {
      image: "img/pizzahut.jpg",
      title: "20% OFF at Pizza Hut",
      subtitle: "Delicious meals await!",
      cost: 400
    },
    {
      image: "img/R.jpg",
      title: "EGP 100 OFF at DeFacto",
      subtitle: "Upgrade your wardrobe!",
      cost: 750
    },
    {
      image: "img/th.jpg",
      title: "EGP 100 OFF at Hyper One",
      subtitle: "Save on groceries!",
      cost: 10
    }
  ];

  // 5. Render Rewards
  rewards.forEach(reward => {
    const card = document.createElement("div");
    card.className = "card mb-3 p-3 shadow-sm";
    card.innerHTML = `
      <div class="row g-0">
        <div class="col-md-4">
          <img src="${reward.image}" class="img-fluid rounded-start" alt="${reward.title}">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${reward.title}</h5>
            <p class="card-subtitle mb-2">${reward.subtitle}</p>
            <p class="text-muted">for ${reward.cost} points</p>
            <p class="reward-points">You have: ${userPoints ?? "Loading..."} points</p>
            <button class="btn btn-success btn-redeem">Redeem Now</button>
          </div>
        </div>
      </div>
    `;

    // 6. Redeem Logic
    card.querySelector(".btn-redeem").addEventListener("click", async () => {
      if (userPoints >= reward.cost) {
        const newPoints = userPoints - reward.cost;
        await updateUserPoints(userId, newPoints);

        alert("✅ Redeemed successfully!");
        userPoints = newPoints;
        card.querySelector(".reward-points").textContent = `You have: ${userPoints} points`;
      } else {
        alert("❌ Not enough points.");
      }
    });

    rewardsContainer.appendChild(card);
  });
});
