

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

//       if (response.ok && result.token) {
//   console.log("Token saved:", result.token);
//   console.log("Name saved:", result.username);
//   console.log("User ID saved:", result.user_id);

//   localStorage.setItem("token", result.token);
//   localStorage.setItem("username", result.username);
//   localStorage.setItem("userId", result.user_id);  // <-- Add this line

//   window.location.href = "user.html"; // or wherever you go after login
// } else {
//           alert(result.message || "Invalid login credentials.");
//         }
//       } catch {
//         alert("Server returned invalid response.");
//       }
//     })
//     .catch(() => alert("Connection error. Try again."));
// });


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
          const token = result.token;
          localStorage.setItem("token", token);

          // Decode JWT
          const decoded = parseJwt(token);
          if (!decoded) {
            alert("Failed to decode token.");
            return;
          }

          const username = decoded.name || "User";
          const userId = decoded.user_id;
          const role = decoded.role;

          // Save user info to localStorage
          localStorage.setItem("username", username);
          localStorage.setItem("userId", userId);
          localStorage.setItem("role", role);

          console.log("Logged in:", { userId, username, role });

          // Redirect based on role
          if (role === "manager") {
            window.location.href = "manegar.html";
          } else if (role === "collector") {
            window.location.href = "collector.html";
          } else if (role === "normal_user") {
            window.location.href = "user.html";
          } else {
            alert("Unknown role: " + role);
          }
        } else {
          alert(result.message || "Invalid login credentials.");
        }
      } catch (error) {
        console.error("JSON parse error:", error);
        alert("Server returned an invalid response.");
      }
    })
    .catch(() => alert("Connection error. Please try again."));
});

// Function to decode JWT token
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT:", e);
    return null;
  }
}
