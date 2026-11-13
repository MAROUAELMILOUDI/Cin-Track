import { afficherCards } from "./cards.js";

export function renderPage(data, currentPage, perPage){
    const pagination = document.getElementById("pagination");
    const totalPages = Math.ceil(data.length / perPage);
    if(totalPages > parseInt(totalPages)){
        totalPages = parseInt(totalPages) + 1
    }
    pagination.innerHTML = "";
    if(totalPages <= 1){
        return;
    }

    // <= btn
    if(currentPage > 1){
        const prevBtn = document.createElement("button");
        prevBtn.textContent = "<<";
        prevBtn.className = "px-3 py-1.5 rounded-lg text-sm border bg-gray-900 border-gray-700 text-gray-300 hover:border-red-600";
        prevBtn.addEventListener("click", () => afficherCards(data, currentPage - 1, perPage));
        pagination.appendChild(prevBtn);
    }
    // pages buttons
    for(let i = 1; i<=totalPages; i++){
        const btn = document.createElement("button");
        btn.textContent = i;
        if(i === currentPage){
            btn.className = "px-3 py-1.5 rounded-lg text-sm border bg-red-600 border-red-600 text-white";
        } else{
            btn.className = "px-3 py-1.5 rounded-lg text-sm border bg-gray-900 border-gray-700 text-gray-300 hover:border-red-600";
        }
        btn.addEventListener("click", () => afficherCards(data, i, perPage));
        pagination.appendChild(btn);

    }

    // => btn
    if(currentPage < totalPages){
        const nextBtn = document.createElement("button");
        nextBtn.textContent = ">>";
        nextBtn.className = "px-3 py-1.5 rounded-lg text-sm border bg-gray-900 border-gray-700 text-gray-300 hover:border-red-600";
        nextBtn.addEventListener("click", () => afficherCards(data, currentPage + 1, perPage));
        pagination.appendChild(nextBtn);
    }
}
