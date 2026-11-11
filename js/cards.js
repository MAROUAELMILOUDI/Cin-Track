
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
function sauvegarder(movies) {
    localStorage.setItem("movies", JSON.stringify(movies));
}

async function initialiser() {
    const donnees = localStorage.getItem("movies");
    if(donnees && donnees !== "undefined" && donnees !== null){
        try{
            return movies = JSON.parse(donnees);
        }catch{
            console.error("Corrupt local storage data, resetting...");
        }
    }
    const data = await chargeData();
    if(data.length > 0){
        sauvegarder(data);
    }
    return data;
}
chargeData();