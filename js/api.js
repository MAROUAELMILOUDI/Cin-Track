const URL = "https://raw.githubusercontent.com/ouchad97/cinetrack-api/main/cinetrack-data.json";
async function chargeData() {
    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Link introuvable!");
        }
        const movies = await response.json();
        localStorage.setItem("movies", JSON.stringify(movies));
        return movies;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

async function initialiser() {
    const donnees = localStorage.getItem("movies");
    if(donnees){
        try{
            return JSON.parse(donnees);
        }catch(error){
            console.error("Corrupt local storage data, resetting...");
        }
    }
    return await chargeData();
}
export { initialiser }