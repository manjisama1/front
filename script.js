const API_URL = "https://back-0db1.onrender.com/api/links";

async function fetchCategories() {
  const res = await fetch(`${API_URL}/categories`);
  const cats = await res.json();
  const select = document.getElementById("categoryFilter");

  cats.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

async function searchLinks() {
  const query = document.getElementById("searchInput").value;
  const category = document.getElementById("categoryFilter").value;

  const res = await fetch(`${API_URL}/search?q=${query}`);
  const data = await res.json();

  const filtered = category
    ? data.filter(link => link.category === category)
    : data;

  renderResults(filtered);
}

function renderResults(data) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  if (data.length === 0) {
    results.innerHTML = "<p>No links found.</p>";
    return;
  }

  data.forEach((link, i) => {
    // insert ad between every 4 cards
    if (i > 0 && i % 4 === 0) {
      const adDiv = document.createElement("div");
      adDiv.className = "ad";
      adDiv.innerHTML = `
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-XXXXXXX"
          data-ad-slot="2233445566"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      `;
      results.appendChild(adDiv);
    }

    const card = document.createElement("div");
    card.className = "link-card";
    card.innerHTML = `
      <h3>${link.title}</h3>
      <p><strong>Code:</strong> ${link.code}</p>
      <p><strong>Category:</strong> ${link.category}</p>
      <a href="${link.url}" target="_blank">🔗 Open Link</a>
    `;
    results.appendChild(card);
  });
}

// Init
fetchCategories();
searchLinks();
