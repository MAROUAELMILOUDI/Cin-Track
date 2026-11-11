
async function chargeData() {
    try {
        const response = await fetch("https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json");
        if (!response.ok) {
            throw new Error("Link introuvable!");
        }
        movies = await response.json();
        console.log(movies)
        sauvegarder(movies);
        return movies;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}
function sauvegarder(data) {
    localStorage.setItem("movies", JSON.stringify(data));
}

function chargerDepuisStorage() {
    const data = localStorage.getItem("movies");
    return data ? JSON.parse(data) : [];
}

chargeData();