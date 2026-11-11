import { initialiser } from "./api.js";
//affichage des cards:
const container = document.getElementById("cards-container");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.querySelector(".close-btn");
let movies = [];

async function afficherCards(data) {
    container.innerHTML = "";
    if (!data || data.length === 0) {
        container.innerHTML = `
            <p class="text-red-500 text-center col-span-full">No movies found!</p>
        `;
        return;
    }
    data.forEach(movie => {
       const card = document.createElement("div");
        card.className = "bg-gray-900 rounded-xl overflow-hidden cursor-pointer hover:scale-105  transition duration-300 shadow-lg";
        card.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}" class="w-full h-64 object-cover">
            <div class="p-3">
                <h3 class="font-bold text-sm">${movie.title}</h3>
                <p class="text-gray-400 text-xs mt-2">
                    ${movie.releaseYear} · ${movie.type}
                </p>
            </div>
        `;
        card.addEventListener("click", () => afficherModal(movie));
        container.appendChild(card);
    });
}

function afficherModal(movie) {
    modalBody.innerHTML = `
        <img src="${movie.image}" alt="${movie.title}" class="w-full h-64 object-cover rounded-lg mb-4">
        <h2 class="text-2xl font-bold mb-2">${movie.title}</h2>
        <p class="text-gray-400 mb-3">${movie.releaseYear} · ${movie.type}</p>
        <p class="mb-3">${movie.description}</p>
        <p class="mb-2"><b>Genres :</b> ${movie.genres.join(", ")}</p>
        <p class="mb-2"><b>Directors :</b> ${movie.directors.join(", ")}</p>
        <p class="mb-2"><b>Countries :</b> ${movie.productionCountries.join(", ")}</p>
        <p><b>${movie.duration ? "Duration :" : "Seasons :"}</b>${movie.duration ? movie.duration + " minutes" : movie.seasons.length}</p>
    `;
    modal.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modal.addEventListener("click", e => {
    if (e.target === modal) {
        modal.classList.add("hidden");
    }
});

async function demarrer() {
    movies = await initialiser();
    afficherCards(movies);
}
demarrer();