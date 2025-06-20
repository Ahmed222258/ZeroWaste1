


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








