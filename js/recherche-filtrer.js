

export function handelFiltrer(movies, afficherCards){
    const searchMovies = document.getElementById("movies");
    const statutSelector = document.getElementById("statut");
    const movie = searchMovies.value.toLowerCase().trim();
    const statut = statutSelector.value;
    const filtreMovies = movies.filter((film) =>{
        const matchMovies = film.title.toLowerCase().includes(movie);
        let matchStatut = false;
        if(statut === "all"){
            matchStatut = true;
        }
        if(statut === "movies"){
            matchStatut = film.type === "movie";
        }
        if(statut === "series"){
            matchStatut = film.type === "series";
        }
        return matchStatut && matchMovies;
    });
    afficherCards(filtreMovies);
}
