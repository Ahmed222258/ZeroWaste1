
  
    const MAX_HEIGHT = 50.0;
    const DISPLAY_HEIGHT = 120;

    async function fetchBinLevels() {
      const url = "https://zerowaste-cgdtdqhpcuhxceb2.uaenorth-01.azurewebsites.net/get_bins.php";
      try {
        const res = await fetch(url);
        const data = await res.json();
        const bins = data.bins || [];

        const container = document.getElementById("bins");
        container.innerHTML = "";

        const types = ["plastic", "glass", "metal", "paper"];
        const levels = Object.fromEntries(bins.map(b => [b.type?.toLowerCase(), parseFloat(b.fill_level) || 0]));

        types.forEach(type => {
          const value = Math.min(levels[type] ?? 0, MAX_HEIGHT);
          const percent = (value / MAX_HEIGHT);
          const height = DISPLAY_HEIGHT * percent;
          let color = "green";
          if (value >= 45) color = "red";
          else if (value >= 30) color = "orange";

          const bin = document.createElement("div");
          bin.className = "bin";
          bin.innerHTML = `
            <div class="bar">
              <div class="fill" style="height: ${height}px; background-color: ${color};"></div>
            </div>
            <div class="fw-bold mt-2">${type[0].toUpperCase() + type.slice(1)}</div>
            <div class="text-muted">${value.toFixed(1)} cm</div>
          `;
          container.appendChild(bin);
        });

      } catch (err) {
        console.error("Error loading bins:", err);
      }
    }

    fetchBinLevels();
    setInterval(fetchBinLevels, 5000);
