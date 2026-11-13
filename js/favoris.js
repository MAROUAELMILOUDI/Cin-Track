const KEY = "favoris";
const closeFvv = document.querySelector(".close-fav");
const favBtn = document.getElementById("fav-btn");
const overlay = document.getElementById("fav-overlay");
const sidebar = document.getElementById("fav-sidebar");

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

function openFav(){
    renderFvv();
    overlay.classList.remove("hidden");
    sidebar.classList.remove("translate-x-full");
}

function closeFav(){
    overlay.classList.add("hidden");
    sidebar.classList.add("translate-x-full");
}

favBtn.addEventListener("click", openFav);
closeFvv.addEventListener("click", closeFav);
overlay.addEventListener("click", closeFav);

function renderFvv(){
    console.log("ids:", getFvv());
    console.log("movies:", JSON.parse(localStorage.getItem("movies"))?.length);
    const list = document.getElementById("fav-list");
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const fvvs =movies.filter(m => getFvv().includes(m.id));

    if(fvvs.length === 0){
        list.innerHTML = `<p class="text-gray-400 text-sm text-center">No favorites yet.</p>`;
        return;
    }

    list.innerHTML = fvvs.map(m => `
        <div class="flex items-center gap-3 rounded-lg bg-gray-800 p-2">
            <img src="${m.image}" alt="${m.title}" class="h-16 w-12 rounded object-cover">
            <div>
                <h3 class="text-sm font-bold">${m.title}</h3>
                <p class="text-xs text-gray-400">${m.releaseYear} · ${m.type}</p>
            </div>
            <button class="remove-fav p-2 text-gray-400 hover:text-red-600" data-id="${m.id}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>    
    `).join("");
}

document.getElementById("fav-list").addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-fav");
    const id = btn.dataset.id;
    const fvv = getFvv().filter(favId => String(favId) !== id);
    localStorage.setItem(KEY, JSON.stringify(fvv));
    renderFvv();
    const cardIcon = document.querySelector(`.favoris[data-id="${id}"] i`);
    if(cardIcon) updateHeart(cardIcon, false)
});