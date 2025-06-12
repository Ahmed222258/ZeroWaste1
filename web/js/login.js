//     document.getElementById("loginForm").addEventListener("submit", function (e) {
//       e.preventDefault();

//       const email = document.getElementById("email1").value.trim();
//       const password = document.getElementById("password1").value.trim();

//       if (!email || !password) {
//         alert("Please enter both email and password.");
//         return;
//       }

//       fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/login.php", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       })
//       .then(async (response) => {
//         const text = await response.text();
//         try {
//           const result = JSON.parse(text);
//           if (response.ok && result.token) {
//             console.log("Token saved:", result.token);
// console.log("Name saved:",result.username);

//             localStorage.setItem("token", result.token);
//           if (result.username) {
//   localStorage.setItem("username", result.username);
// }

//             window.location.href = "user.html";
//           } else {
//             alert(result.message || "Invalid login credentials.");
//           }
//         } catch {
//           alert("Server returned invalid response.");
//         }
//       })
//       .catch(() => alert("Connection error. Try again."));
//     });



document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email1").value.trim();
  const password = document.getElementById("password1").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(async (response) => {
      const text = await response.text();
      try {
        const result = JSON.parse(text);

      if (response.ok && result.token) {
  console.log("Token saved:", result.token);
  console.log("Name saved:", result.username);
  console.log("User ID saved:", result.user_id);

  localStorage.setItem("token", result.token);
  localStorage.setItem("username", result.username);
  localStorage.setItem("userId", result.user_id);  // <-- Add this line

  window.location.href = "user.html"; // or wherever you go after login
} else {
          alert(result.message || "Invalid login credentials.");
        }
      } catch {
        alert("Server returned invalid response.");
      }
    })
    .catch(() => alert("Connection error. Try again."));
});


// document.getElementById("loginForm").addEventListener("submit", function (e) {
//   e.preventDefault();

//   const email = document.getElementById("email1").value.trim();
//   const password = document.getElementById("password1").value.trim();

//   if (!email || !password) {
//     alert("Please enter both email and password.");
//     return;
//   }

//   fetch("https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/login.php", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   })
//     .then(async (response) => {
//       const text = await response.text();
//       try {
//         const result = JSON.parse(text);

//         if (response.ok && result.token) {
//           const token = result.token;
//           const decoded = jwt_decode(token); // decode the JWT

//           const username = decoded.name || email;
//           const userId = decoded.user_id?.toString() || "0";
//           const role = decoded.role || "normal-user";

//           console.log("Username:", username);
//           console.log("User ID:", userId);
//           console.log("Role:", role);

//           localStorage.setItem("token", token);
//           localStorage.setItem("username", username);
//           localStorage.setItem("userId", userId);
//           localStorage.setItem("role", role);

//           // Redirect based on role
//           if (role === "manager") {
//             window.location.href = "manager.html";
//           } else if (role === "collector") {
//             window.location.href = "collector.html";
//           } else {
//             window.location.href = "user.html";
//           }
//         } else {
//           alert(result.message || "Invalid login credentials.");
//         }
//       } catch (err) {
//         console.error("JWT Parse Error:", err);
//         alert("Server returned invalid response.");
//       }
//     })
//     .catch(() => alert("Connection error. Try again."));
// });
