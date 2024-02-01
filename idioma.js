//selectores
const btnEspañol = document.getElementById("iconSp");
const btnEnglish = document.getElementById("iconEn");

const textoEnglish = document.querySelectorAll("h1,p,label,button,option");
const inputs = document.querySelectorAll("input");

//eventos

btnEspañol.addEventListener("click", () => {
    textoEnglish.forEach((element) => {
        traduccionEspañol(element.textContent).then((texto) => {
            element.textContent = texto;
        })
    })
});

btnEnglish.addEventListener("click", () => {
    textoEnglish.forEach((element) => {
        traduccionEnglish(element.textContent).then((texto) => {
            element.textContent = texto;
        })
    })
});



const URLBase = "https://api.mymemory.translated.net/";


async function traduccionEspañol(palabraIngles){
    const URL = `${URLBase}?langpair=en|es&q=${palabraIngles}`;
    const response = await fetch(URL);
    const data = await response.json();
    const traduccion = data.responseData.translatedText;
    return traduccion;
}



async function traduccionEnglish(palabraIngles){
    const URL = `${URLBase}?langpair=en|es&q=${palabraIngles}`;
    const response = await fetch(URL);
    const data = await response.json();
    const traduccion = data.responseData.translatedText;
    return traduccion;
}

async function traducirTodoEnglish() {}