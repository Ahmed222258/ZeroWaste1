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
    const role = document.getElementById("role").value;

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


document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // prevent form from reloading the page

  // Define async function inside the event handler
  async function loginUser() {
    const email = document.getElementById("email1").value.trim();
    const password = document.getElementById("password1").value.trim();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        "https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/login.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log(result); // Log response to inspect the structure

      // Adjust this condition based on actual API response
      // if (result.success) {
      //   window.location.href = "index.html";
      // } else {
      //   alert(result.message || "Email not found or incorrect password.");
      // }
    } catch (error) {
      console.error("Login request failed:", error);
      alert("An error occurred. Please try again.");
    }
  }

  // Call the async function
  loginUser();
});
