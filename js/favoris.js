const KEY = "favoris";

export function getFvv(){
    try{
        return JSON.parse(localStorage.getItem(KEY)) || [];
    }
    catch{
        return [];
    }
}

export function isFav(movie){
    return getFvv().includes(movie.id);
}

export function updateHeart(icon, actif){
    icon.classList.toggle("fa-solid", actif);
    icon.classList.toggle("fa-regular", !actif);
    icon.classList.toggle("text-red-600", actif);
}

export function handelFvv(e, movie){
    e.stopPropagation();
    let fvv = getFvv();

    if(fvv.includes(movie.id)){
        fvv = fvv.filter(id => id!==movie.id);
    } else{
        fvv.push(movie.id)
    }

    localStorage.setItem(KEY, JSON.stringify(fvv));
    const icon = e.currentTarget.querySelector("i");
    updateHeart(icon, fvv.includes(movie.id));
};