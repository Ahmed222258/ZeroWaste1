

// document.addEventListener("DOMContentLoaded", async () => {
//   const rewardsContainer = document.getElementById("rewards-container");
//   const spinner = document.getElementById("loading-spinner");

//   const API_BASE = "https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net";

//   // 1. Fetch user points
//   const fetchUserPoints = async () => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       console.error("❌ No token found in localStorage");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_BASE}/get_user_points.php`, {
//         method: "GET",
//         headers: {
//           "Authorization": `Bearer ${token}`
//           // Do NOT include Content-Type for GET requests – avoids preflight
//         }
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("✅ Points fetched:", data);
//       return data.points;
//     } catch (err) {
//       console.error("❌ Error fetching points:", err.message);
//     }
//   };

//   // 2. Update user points
//   const updateUserPoints = async (userId, updatedPoints) => {
//     try {
//       const response = await fetch(`${API_BASE}/update_points.php`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           user_id: userId,
//           points: updatedPoints
//         })
//       });

    
      
//       const result = await response.json();
//       if (response.ok) {
//         console.log("✅", result.message);
//       } else {
//         console.warn("⚠️ Failed to update points:", result.error);
//       }
//     } catch (err) {
//       console.error("❌ Error updating points:", err.message);
//     }
//   };

//   // 3. Initialize
//   let userPoints = await fetchUserPoints();
//   spinner.style.display = 'none';

//   const userId = parseInt(localStorage.getItem('userId'), 10);
 
//   console.log(userId);
  

//   // 4. Rewards data
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
//       subtitle: "Upgrade your wardrobe!",
//       cost: 750
//     },
//     {
//       image: "img/th.jpg",
//       title: "EGP 100 OFF at Hyper One",
//       subtitle: "Save on groceries!",
//       cost: 10
//     }
//   ];

//   // 5. Render rewards
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
//             <button class="btn btn-success btn-redeem">Redeem Now</button>
//           </div>
//         </div>
//       </div>
//     `;
//   console.log(reward.cost);
        
        
//     // 6. Redeem button logic
//     card.querySelector(".btn-redeem").addEventListener("click", async () => {
//       if (userPoints >= reward.cost) {
      
        
        
//         const newPoints = userPoints - reward.cost;
//         await updateUserPoints(userId, newPoints);

//         alert("✅ Redeemed successfully!");
//         userPoints = newPoints;
//         card.querySelector(".reward-points").textContent = `You have: ${userPoints} points`;
//       } else {
//         alert("❌ Not enough points.");
//       }
//     });

//     rewardsContainer.appendChild(card);
//   });
// });


document.addEventListener("DOMContentLoaded", async () => {
  const rewardsContainer = document.getElementById("rewards-container");
  const spinner = document.getElementById("loading-spinner");

  const API_BASE = "https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net";

  // Generate random reward code (like Flutter)
  function generateCode() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let code = '';

    for (let i = 0; i < 4; i++) {
      code += letters.charAt(Math.floor(Math.random() * letters.length));
    }

    for (let i = 0; i < 3; i++) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    return code;
  }

  // Fetch user points
  const fetchUserPoints = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("❌ No token found in localStorage");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/get_user_points.php`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log("✅ Points fetched:", data);
      return data.points;
    } catch (err) {
      console.error("❌ Error fetching points:", err.message);
    }
  };

  // Update user points
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
      console.error("❌ Error updating points:", err.message);
    }
  };

  // Load and render rewards
  let userPoints = await fetchUserPoints();
  spinner.style.display = 'none';

  const userId = parseInt(localStorage.getItem('userId'), 10);

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

    card.querySelector(".btn-redeem").addEventListener("click", async () => {
      if (userPoints >= reward.cost) {
        const newPoints = userPoints - reward.cost;
        await updateUserPoints(userId, newPoints);

        const code = generateCode();
        alert(`✅ Redeemed successfully!\nYour reward code: ${code}`);

        userPoints = newPoints;
        card.querySelector(".reward-points").textContent = `You have: ${userPoints} points`;
      } else {
        alert("❌ Not enough points.");
      }
    });

    rewardsContainer.appendChild(card);
  });
});
