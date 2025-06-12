document.addEventListener('DOMContentLoaded', () => {
  const greetingEl = document.getElementById('greeting');
  const pointsEl = document.getElementById('points');
  const signOutBtn = document.getElementById('signOutBtn');

  // Load username from localStorage or default to 'Guest'
  const username = localStorage.getItem('username') || 'Guest';
  greetingEl.textContent = `Hi, ${username}!`;

  // Function to fetch user points every 5 seconds
  async function fetchUserPoints() {
    const token = localStorage.getItem('token');
    if (!token) {
      pointsEl.textContent = 'Not logged in';
      console.warn('No token found in localStorage.');
      return;
    }

    try {
      const response = await fetch('http://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/get_user_points.php', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // include Bearer prefix
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.points !== undefined) {
        pointsEl.textContent = `+${data.points}`;
        console.log('✅ Points fetched:', data.points);
      } else {
        pointsEl.textContent = 'No points data';
        console.warn('Points key missing in response:', data);
      }
    } catch (error) {
      pointsEl.textContent = 'Error fetching points';
      console.error('❌ Fetch error:', error);
    }
  }

  // Initial fetch
  fetchUserPoints();

  // Refresh every 5 seconds
  setInterval(fetchUserPoints, 5000);

  // Sign out button clears localStorage and redirects to login page
  signOutBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = 'login.html'; // update path as needed
  });
});
