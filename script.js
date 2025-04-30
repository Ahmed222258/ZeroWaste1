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





document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");

  if (!form) {
    console.error("registrationForm not found in DOM");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Get the role value from the select element or assign a default
    const role = "normal_user"; // Replace with dynamic role selection if needed

    const data = {
      name: name,
      email: email,
      password: password,
      role: role,
    };

    try {
      const response = await fetch(
        "http://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      document.getElementById("registrationResult").innerText =
        result.message || "Registration successful!";
    } catch (error) {
      console.error("Registration failed:", error);
      document.getElementById("registrationResult").innerText =
        "Registration failed. Check console for details.";
    }
  });
});








document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm2");

  if (!form) {
    console.error("registrationForm not found in DOM");
    return;
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name2 = document.getElementById("username2").value;
    const email2 = document.getElementById("email2").value;
    const password2 = document.getElementById("password2").value;
    const role2 = document.getElementById("role").value;
      // const role ="normal_user";

    const data = {
      name: name2,
      email: email2,
      password: password2,
      role: role2,
    };

    try {
      const response = await fetch(
        "http://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      document.getElementById("registrationResult").innerText =
        result.message || "Registration successful!";
    } catch (error) {
      console.error("Registration failed:", error);
      document.getElementById("registrationResult").innerText =
        "Registration failed. Check console for details.";
    }
  });
});















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
    headers: {
      "Content-Type": "application/json", // Important: Ensure this is set
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then(async (response) => {
      const text = await response.text();
      try {
        const result = JSON.parse(text);

        if (response.ok && result.token) {
          localStorage.setItem("token", result.token);
          window.location.href = "index.html";
        } else {
          alert(result.message || "Invalid login credentials.");
        }
      } catch (err) {
        console.error("Invalid JSON response:", text);
        alert("Server returned invalid response.");
      }
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      alert("Connection error. Try again.");
    });
});



