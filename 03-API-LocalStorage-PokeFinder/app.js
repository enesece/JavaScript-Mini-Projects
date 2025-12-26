// Select DOM Elements
const pokeInput = document.getElementById("pokeInput");
const searchBtn = document.getElementById("searchBtn");
const addBtn = document.getElementById("addBtn");
const pokeCard = document.getElementById("pokeCard");
const favList = document.getElementById("favList");
const clearAllBtn = document.getElementById("clearAllBtn");

// State Management
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentPokemon = null;

// Initial Render
renderFavorites();

// --- SEARCH FUNCTION ---
searchBtn.addEventListener("click", async function () {
  const pokemonName = pokeInput.value.toLowerCase();

  if (pokemonName === "") return;

  try {
    pokeCard.innerHTML = `<p style="color: var(--soft-periwinkle);">Searching for details...</p>`;
    addBtn.style.display = "none";

    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    if (!response.ok) throw new Error("Pokemon not found!");

    const data = await response.json();

    // Data Parsing
    const typesHtml = data.types
      .map((t) => `<span class="type-badge">${t.type.name}</span>`)
      .join(" ");

    const abilitiesText = data.abilities.map((a) => a.ability.name).join(", ");
    const heightInMeters = data.height / 10;

    // Update State
    currentPokemon = {
      id: data.id,
      name: data.name,
      image: data.sprites.front_default,
      types: data.types.map((t) => t.type.name),
    };

    // Render Pokemon Card
    pokeCard.innerHTML = `
      <div class="pokemon-view"> 
          <img src="${currentPokemon.image}" width="150">
          <h3>${currentPokemon.name.toUpperCase()}</h3>
          
          <div class="types-container">
              ${typesHtml}
          </div>

          <div class="details-container">
              <p><strong>Height:</strong> ${heightInMeters} m</p>
              <p><strong>Abilities:</strong> ${abilitiesText}</p>
          </div>
      </div>`;

    addBtn.style.display = "flex";
  } catch (error) {
    pokeCard.innerHTML = `<span style="color: #ff4757;">${error.message}</span>`;
    addBtn.style.display = "none";
  }
});

// --- ADD FAVORITE ---
addBtn.addEventListener("click", function () {
  if (!currentPokemon) return;

  const isAlreadyAdded = favorites.some((fav) => fav.id === currentPokemon.id);

  if (isAlreadyAdded) {
    alert("This Pokemon is already in your favorites!");
    return;
  }

  favorites.push(currentPokemon);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
});

// --- RENDER FAVORITES ---
function renderFavorites() {
  favList.innerHTML = "";

  favorites.forEach((fav) => {
    const li = document.createElement("li");
    li.className = "fav-item";

    li.innerHTML = `
    <div class="fav-info">
        <img src="${fav.image}" width="40">
        <span style="font-weight: 600; text-transform: capitalize;">${fav.name}</span>
    </div>
    <button onclick="removeFavorite(${fav.id})" class="fav-delete">X</button>
    `;

    favList.appendChild(li);
  });

  // Toggle Clear All Button
  if (favorites.length > 0) {
    clearAllBtn.style.display = "inline-block";
  } else {
    clearAllBtn.style.display = "none";
  }
}

// --- REMOVE FAVORITE ---
window.removeFavorite = function (id) {
  favorites = favorites.filter((fav) => fav.id !== id);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderFavorites();
};

// --- CLEAR ALL FAVORITES ---
clearAllBtn.addEventListener("click", function () {
  favorites = [];
  localStorage.removeItem("favorites");
  renderFavorites();
});
